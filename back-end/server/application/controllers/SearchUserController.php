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
		$token = $this->input->get_request_header('Authorization'); // Authorization header dalla richiesta post
		if(strlen($token) >= 6 && substr($token, 0, 6) == "Bearer") {
			$token = count(explode("Bearer ", $token)) > 0 ? explode("Bearer ", $token)[1] : ""; // il token ora è qualcosa della forma jwt oppure è vuoto.

			if (strlen($token) <= 0) // token non valido in questo caso
				return $this->response(buildServerResponse(false, "Token di accesso non valido. #0"), 200);

			$tokenData = AUTHORIZATION::validateToken($token); // questa funzione chiama la decode di jwt che ritorna false nel caso in cui il token non sia valido, altrimenti ritorna il payload del token.
			if (!$tokenData) // se il token non è stato decodificato correttamente
				return $this->response(buildServerResponse(false, "Token di accesso non valido. #1"), 200);

			$userId = $tokenData->userId;
			if(!FILTER_VAR($userId, FILTER_VALIDATE_INT)) // se l'userId nel token non è un intero c'è un problema.
				return $this->response(buildServerResponse(false, "Token di accesso non valido. #3"), 200);

			$user = $this->UserModel->getUserById($userId); // i dati dell'utente.
			if(count($user) <= 0) // utente non trovato con questo id
				return $this->response(buildServerResponse(false, "Token di accesso non valido. #5"), 200);

			$searchQuery = $this->input->post('query');
			$result = $this->UserModel->searchUser($searchQuery, $userId);
			return $this->response(buildServerResponse(true, "ok", array("searchResult" => $result)));
		}
	}

}
