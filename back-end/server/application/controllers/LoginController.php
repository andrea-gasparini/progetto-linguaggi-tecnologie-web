<?php

class LoginController extends \chriskacerguis\RestServer\RestController
{

	public function __construct($config = 'rest')
	{
		parent::__construct($config);
	}

	public function doLogin_post() {

		$username = $this->input->post('username');
		$password = $this->input->post('password');
		if(!$username && !$password || (strlen($username) <= 0 || strlen(trim($username)) <= 0) && strlen($password) <= 0) // username && password sono vuoti o non inviati.
			return $this->response(buildServerResponse(false, "Compila tutti i campi per poter eseguire l'accesso.",
				array("usernameHasError" => true, "passwordHasError" => true)), 200);

		if((!$username || strlen($username) <= 0 || strlen(trim($username)) <= 0) && strlen($password) > 0) // l'username NON è completo mentre la password sì
			return $this->response(buildServerResponse(false, "Compila il campo username per poter eseguire l'accesso.",
				array("usernameHasError" => true, "passwordHasError" => false)), 200);

		if(strlen($username) > 0 && strlen($password)  <= 0) // (not secondo check)
			return $this->response(buildServerResponse(false, "Compila il campo password per poter eseguire l'accesso.",
				array("usernameHasError" => false, "passwordHasError" => true)), 200);


		// check che l'email sia valida.
		if(!FILTER_VAR($username, FILTER_VALIDATE_EMAIL))
			return $this->response(buildServerResponse(false, "L'email inserita non è valida.",
				array("usernameHasError" => true, "passwordHasError" => false)), 200);

		// check se l'utente esiste nel database.
		$user = $this->UserModel->getUserByEmail($username);
		if(count($user) <= 0) // non esiste l'utente.
			return $this->response(buildServerResponse(false, "Nessun utente registrato con questo indirizzo email.",
				array("usernameHasError" => true, "passwordHasError" => false)), 200);

		//print_r(password_hash("test1234", PASSWORD_DEFAULT)); // stampa la password test1234 hashata.

		// check della password.
		$userPassword = $user[0]->password;
		if(!password_verify($password, $userPassword)) // la password inserita non è verificata
			return $this->response(buildServerResponse(false, "I dati inseriti non sono corretti.",
				array("usernameHasError" => true, "passwordHasError" => true)), 200);

		$token = AUTHORIZATION::generateToken(array("userId" => $user[0]->id)); // genera il jwt per questo utente con dentro il valore dell'userid.
		return $this->response(buildServerResponse(true, "ok", array("token" => $token)), 200);
	}

	public function validateToken_post() {
		$token = $this->input->get_request_header('Authorization'); // Authorization header dalla richiesta post
		if(strlen($token) >= 6 && substr($token, 0, 6) == "Bearer") {
			$token = count(explode("Bearer ", $token)) > 0 ? explode("Bearer ", $token)[1] : ""; // il token ora è qualcosa della forma jwt oppure è vuoto.

			if(strlen($token) <= 0) // token non valido in questo caso
				return $this->response(buildServerResponse(false, "Token di accesso non valido. #0"), 200);

			$tokenData = AUTHORIZATION::validateToken($token); // questa funzione chiama la decode di jwt che ritorna false nel caso in cui il token non sia valido, altrimenti ritorna il payload del token.
			if(!$tokenData) // se il token non è stato decodificato correttamente
				return $this->response(buildServerResponse(false, "Token di accesso non valido. #1"), 200);

			$userId = $tokenData->userId;
			if(!FILTER_VAR($userId, FILTER_VALIDATE_INT)) // se l'userId nel token non è un intero c'è un problema.
				return $this->response(buildServerResponse(false, "Token di accesso non valido. #3"), 200);

			$user = $this->UserModel->getUserById($userId); // i dati dell'utente.
			if(count($user) <= 0) // utente non trovato con questo id
				return $this->response(buildServerResponse(false, "Token di accesso non valido. #5"), 200);

			$data = setUserDataToSendInRedux($user[0]);
			$token = AUTHORIZATION::generateToken($data); // refresho il token anche col timestamp
			return $this->response(buildServerResponse(true, "ok", array("token" => $token)), 200);
		}
		return $this->response(buildServerResponse(false, "Token di accesso non valido. #n"), 200);
	}

}
