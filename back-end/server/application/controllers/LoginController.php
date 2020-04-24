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
		if(!$username && !$password || (strlen($username) <= 0 || strlen(trim($username)) <= 0) && strlen($password) <= 0) // controllo se username && password sono vuoti o non inviati.
			return $this->response(buildServerResponse(false, "Compila tutti i campi per poter eseguire l'accesso.",
				array("usernameHasError" => true, "passwordHasError" => true)), 200);

		if((!$username || strlen($username) <= 0 || strlen(trim($username)) <= 0) && strlen($password) > 0) // controllo se l'username NON è completo mentre la password sì
			return $this->response(buildServerResponse(false, "Compila il campo username per poter eseguire l'accesso.",
				array("usernameHasError" => true, "passwordHasError" => false)), 200);

		if(strlen($username) > 0 && strlen($password)  <= 0) // (not secondo check)
			return $this->response(buildServerResponse(false, "Compila il campo password per poter eseguire l'accesso.",
				array("useranmeHasError" => false, "passwordHasError" => true)), 200);


		// controlliamo che la mail sia valida lato server.
		if(!FILTER_VAR($username, FILTER_VALIDATE_EMAIL))
			return $this->response(buildServerResponse(false, "L'email da te inserita non è valida.",
				array("usernameHasError" => true, "passwordHasError" => false)), 200);

		// dobbiamo controllare se l'email (cioè username) è registrata nel nostro database.
		$user = $this->UserModel->getUserByEmail($username);
		if(count($user) <= 0) // non esiste l'utente.
			return $this->response(buildServerResponse(false, "Nessun utente registrato con questo indirizzo email.",
				array("usernameHasError" => true, "passwordHasError" => false)), 200);


		return $this->response(array("status" => "success", "input" => $this->input->post()), 200);
	}

}