<?php


class GroupsController extends \chriskacerguis\RestServer\RestController
{

	public function __construct($config = 'rest')
	{
		parent::__construct($config);
	}


	public function createGroup_post() {
		$tokenData = validateAuthorizationToken($this->input->get_request_header("Authorization"));

		if ($tokenData["status"]) {
			$groupName = $this->input->post("groupName");
			$groupDesc = $this->input->post("groupDesc");
			$ownerId = $tokenData["data"]["userId"];

			$errors = array(
				"groupNameHasError" => false,
				"groupDescHasError" => false
			);

			// Check minlength titolo
			if (strlen($groupName) < 1) {
				$errors["groupNameHasError"] = true;
				return $this->response(buildServerResponse(
					false, "Il nome del gruppo non può essere vuoto.", $errors), 200);
			}

			// Check maxlength titolo
			if (strlen($groupName) > 255) {
				$errors["groupNameHasError"] = true;
				return $this->response(buildServerResponse(
					false, "Il nome del gruppo non può contenere più di 255 caratteri.", $errors), 200);
			}

			// Check maxlength descrizione
			if (strlen($groupDesc) > 255) {
				$errors["groupDescHasError"] = true;
				return $this->response(buildServerResponse(
					false, "La descrizione del gruppo non può contenere più di 255 caratteri.", $errors), 200);
			}

			// Insert group in db
			$groupId = $this->GroupsModel->createGroup($groupName, $groupDesc, $ownerId);

			// Add creator as admin
			$this->UserModel->addMembership(array("user_id" => $ownerId, "group_id" => $groupId, "is_admin" => "1"));

			// Create group chat
			$this->ChatModel->createGroupChat($groupId);

			return $this->response(buildServerResponse(true, "ok"), 200);
		}

		return $this->response(buildServerResponse(false, "Errore autorizzazione token."), 200);
	}


	public function sendInvitations_post() {
		$tokenData = validateAuthorizationToken($this->input->get_request_header('Authorization'));
		if($tokenData["status"]) {
			$userId = $tokenData["data"]["userId"];
			$groupId = $this->input->post('groupId');

			if(!FILTER_VAR($groupId, FILTER_VALIDATE_INT)) // è un intero l'id del gruppo
				return $this->response(buildServerResponse(false, "L'identificatore del gruppo non è valido."), 200);

			$groupInfo = $this->GroupsModel->getGroupById($groupId);
			if(count($groupInfo) <= 0)
				return $this->response(buildServerResponse(false, "Questo gruppo non esiste."), 200); // il gruppo non esiste.

			if(!$this->GroupsModel->isGroupMember($userId, $groupId))
				return $this->response(buildServerResponse(false, "Non puoi invitare utenti in un gruppo di cui non fai parte."), 200);

			$users = json_decode($this->input->post('users'));

			if(count($users) <= 0)
				return $this->response(buildServerResponse(false, "Seleziona degli utenti da invitare."), 200);

			foreach($users as $key => $value) {
				if(!FILTER_VAR($value->id, FILTER_VALIDATE_INT)) // intero non valido.
					continue;

				$getUser = $this->UserModel->getUserById($value->id);
				if(count($getUser) <= 0)
					continue; // utente non esiste.

				if($userId == $value->id)
					continue; // mi auto invito e non va bene.

				// controlliamo che l'utente che stiamo invitando non sia già nel gruppo
				if($this->GroupsModel->isGroupMember($value->id, $groupId))
					continue;

				$invitationAlreadyExists = $this->GroupsModel->invitationAlreadyExists($userId, $value->id, $groupId);
				$data = array("from_id" => $userId, "to_id" => $value->id, "group_id" => $groupId, "invited_at" => "now()");
				$this->GroupsModel->addInvitation($data, $invitationAlreadyExists);
			}


			return $this->response(buildServerResponse(true, "ok"));

		}
		return $this->response(buildServerResponse(false, "Errore autorizzazione token."), 200);
	}


	public function getUserInvitations_post() {
		$tokenData = validateAuthorizationToken($this->input->get_request_header('Authorization'));
		if($tokenData["status"]) {
			$userId = $tokenData["data"]["userId"];
			$user = $this->UserModel->getUserById($userId);
			if(count($user) <= 0)
				return $this->response(buildServerResponse(false, "Utente non autenticato."), 200);

			$userInvitations = $this->GroupsModel->getUserInvitation($userId);
			return $this->response(buildServerResponse(true, "ok", array("invitations" => $userInvitations)), 200);
		}

		return $this->response(buildServerResponse(false, "Errore autorizzazione token."), 200);
	}


	public function resetUserCountInvitations_post() {
		$tokenData = validateAuthorizationToken($this->input->get_request_header('Authorization'));
		if($tokenData["status"]) {
			$userId = $tokenData["data"]["userId"];
			$user = $this->UserModel->getUserById($userId);
			if(count($user) <= 0)
				return $this->response(buildServerResponse(false, "Utente non autenticato."), 200);

			if($this->UserModel->resetCountNotification($userId))
				return $this->response(buildServerResponse(true, "ok"), 200);
		}

		return $this->response(buildServerResponse(false, "Errore autorizzazione token."), 200);
	}

	public function deleteGroup_post() {
		$tokenData = validateAuthorizationToken($this->input->get_request_header('Authorization'));
		if($tokenData["status"]) {
			$userId = $tokenData["data"]["userId"];
			$user = $this->UserModel->getUserById($userId);
			if (count($user) <= 0)
				return $this->response(buildServerResponse(false, "Utente non autenticato."), 200);

			$groupId = $this->input->post('groupId');

			if(!FILTER_VAR($groupId, FILTER_VALIDATE_INT)) // parametro groupId: è un intero?
				return $this->response(buildServerResponse(false, "Id gruppo non valido."), 200);
			$group = $this->GroupsModel->getGroupById($groupId);

			if(count($group) <= 0) // controllo che il gruppo esista
				return $this->response(buildServerResponse(false, "Id gruppo non valido."), 200);

			if($group[0]->group_owner != $userId) // sono il proprietario del gruppo?
				return $this->response(buildServerResponse(false, "Solo il proprietario può eliminare il gruppo"), 200);

			if($this->GroupsModel->deleteGroup($groupId))
				return $this->response(buildServerResponse(true, "ok"));
		}

		return $this->response(buildServerResponse(false, "Errore autorizzazione token."), 200);
	}


	public function replyInvitation_post() {
		$tokenData = validateAuthorizationToken($this->input->get_request_header('Authorization'));
		if($tokenData["status"]) {
			$userId = $tokenData["data"]["userId"];
			$user = $this->UserModel->getUserById($userId);
			if(count($user) <= 0)
				return $this->response(buildServerResponse(false, "Utente non autenticato."), 200);

			$typeReply = $this->input->post('type');
			if($typeReply != 1 && $typeReply != 0)
				return $this->response(buildServerResponse(false, "Invito non valido."), 200);

			$groupId = $this->input->post("groupId");
			if(!FILTER_VAR($groupId, FILTER_VALIDATE_INT))
				return $this->response(buildServerResponse(false, "Invito non valido."), 200);

			$group = $this->GroupsModel->getGroupById($groupId);
			if(count($group) <= 0)
				return $this->response(buildServerResponse(false, "L'invito al gruppo non è più valido poiché il gruppo non esiste."), 200);

			if(!$this->UserModel->existsInvitation($userId, $groupId)) // se non esiste un invito per questo utente per questo gruppo allora non va avanti
				return $this->response(buildServerResponse(false, "Invito non valido."), 200);

			// se il type è 1 allora accetto l'invito, se è 0 no.
			if($typeReply == 0) {
				if($this->UserModel->deleteNotificationGroupForUser($userId, $groupId))
					return $this->response(buildServerResponse(true, "ok"), 200);
				else
					return $this->response(buildServerResponse(false, "Errore durante l'eliminazione degli inviti."), 200);
			} else {

				// l'utente ha accettato e quindi dobbiamo aggiungerlo al gruppo.
				$membership = array("user_id" => $userId, "group_id" => $groupId, "is_admin" => "0");
				$groupData = $this->GroupsModel->getAllDataGroup($group[0]->id);
				if($this->UserModel->addMembership($membership)) {
					if($this->UserModel->deleteNotificationGroupForUser($userId, $groupId))
						return $this->response(buildServerResponse(true, "ok", array("group" => $groupData[0])),  200);
				}
			}
		}
		return $this->response(buildServerResponse(false, "Errore autorizzazione token."), 200);
	}


	public function createPost_post() {
		$tokenData = validateAuthorizationToken($this->input->get_request_header('Authorization'));
		if($tokenData["status"]) {
			$userId = $tokenData["data"]["userId"];
			$user = $this->UserModel->getUserById($userId);
			if(count($user) <= 0)
				return $this->response(buildServerResponse(false, "Utente non autenticato."), 200);

			$groupId = $this->input->post('groupId');
			$postText = $this->input->post('postText');
			if(!$this->GroupsModel->isGroupMember($userId, $groupId))
				return $this->response(buildServerResponse(false, "Non puoi creare un post in un gruppo al quale non appartieni."), 200);

			if(stlren($postText) <= 0 || strlen(trim($postText)) <= 0)
				return $this->response(buildServerResponse(false, "Inserisci almeno un carattere al tuo post."), 200);



		}
		return $this->response(buildServerResponse(false, "Errore autorizzazione token."), 200);
	}

}
