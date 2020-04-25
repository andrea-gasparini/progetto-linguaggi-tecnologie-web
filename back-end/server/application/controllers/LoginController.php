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

}
