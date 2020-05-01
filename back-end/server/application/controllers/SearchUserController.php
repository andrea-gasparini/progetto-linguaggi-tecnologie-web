<?php


class SearchUserController extends \chriskacerguis\RestServer\RestController
{

	public function __construct($config = 'rest')
	{
		parent::__construct($config);
	}

	public function searchUser_post()
	{
		// l'utente dev'essere loggato per cercare.
		$tokenData = validateAuthorizationToken($this->input->get_request_header('Authorization'));
		if($tokenData["status"]) {
			$userId = $tokenData["data"]["userId"];
			$user = $this->UserModel->getUserById($userId); // i dati dell'utente.
			if(count($user) <= 0) // utente non trovato con questo id
				return $this->response(buildServerResponse(false, "Token di accesso non valido. #5"), 200);

			$searchQuery = $this->input->post('query');
			$result = $this->UserModel->searchUser($searchQuery, $userId);
			return $this->response(buildServerResponse(true, "ok", array("searchResult" => $result)));
		}
		return $this->response(buildServerResponse(false, "Errore autorizzazione."), 200);
	}

}
