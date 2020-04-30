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

			if(!$this->GroupsModel->isMember($userId, $groupId))
				return $this->response(buildServerResponse(false, "Non puoi invitare utenti in un gruppo di cui non fai parte."), 200);

			return $this->response(buildServerResponse(true, "ok"));

		}
		return $this->response(buildServerResponse(false, "Errore autorizzazione token."), 200);
	}

}
