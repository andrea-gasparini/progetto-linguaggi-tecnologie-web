<?php


class GroupsController extends \chriskacerguis\RestServer\RestController
{

	public function __construct($config = 'rest')
	{
		parent::__construct($config);
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

				$invitationAlreadyExists = $this->GroupsModel->invitationAlreadyExists($userId, $value->id, $groupId);
				$data = array("from_id" => $userId, "to_id" => $value->id, "group_id" => $groupId, "invited_at" => "now()");
				$this->GroupsModel->addInvitation($data, $invitationAlreadyExists);
			}


			return $this->response(buildServerResponse(true, "ok"));

		}
		return $this->response(buildServerResponse(false, "Errore autorizzazione token."), 200);
	}

}
