<?php


class SettingsController extends \chriskacerguis\RestServer\RestController {

	public function __construct($config = 'rest')
	{
		parent::__construct($config);
	}

	public function changeEmail_post() {
		/*
		 * parametri per la richiesta post: newEmail e confirmNewEmail
		 * bisogna passare, ovviamente, il token nell'header authorization.
		 */
		$token = validateAuthorizationToken($this->input->get_request_header('Authorization'));
		if($token["status"]) {
			$newEmail = $this->input->post('newEmail');
			$confirmNewEmail = $this->input->post('newEmail');
			$userId = $token["data"]["userId"];

			$user = $this->UserModel->getUserById($userId);
			if(count($user) <= 0)
				return $this->response(buildServerResponse(false, "Utente inesistente."), 200);

			if($user[0]->email == $newEmail)
				return $this->response(buildServerResponse(false, "Inserisci un indirizzo email differente dal precedente.", array("newEmailHasError" => true, "confirmNewEmailHasError" => true)), 200);

			// lunghezza email
			if(strlen($newEmail) <= 0 || strlen(trim($newEmail)) <= 0 || strlen($confirmNewEmail) <= 0 || strlen(trim($confirmNewEmail)) <= 0)
				return $this->response(buildServerResponse(false, "Inserisci un indirizzo email valido.", array("newEmailHasError" => strlen($newEmail) <= 0 || strlen(trim($newEmail)) <= 0, "confirmNewEmailHasError" => strlen($confirmNewEmail) <= 0 || strlen(trim($confirmNewEmail)) <= 0)), 200);

			// email differenti
			if($newEmail != $confirmNewEmail)
				return $this->response(buildServerResponse(false, "Le due email non corrispondono.", array("newEmailHasError" => true, "confirmNewEmailHasError" =>  true)), 200);

			// controllo validità email
			if(!FILTER_VAR($newEmail, FILTER_VALIDATE_EMAIL) || !FILTER_VAR($confirmNewEmail, FILTER_VALIDATE_EMAIL))
				return $this->response(buildServerResponse(false, "Inserisci un indirizzo email valido.", array("newEmailHasError" => !FILTER_VAR($newEmail, FILTER_VALIDATE_EMAIL), "confirmNewEmailHasError" => !FILTER_VAR($confirmNewEmail, FILTER_VALIDATE_EMAIL))), 200);

			// va controllato se la nuova email è già in uso.
			$emailUsed = $this->UserModel->checkEmailAvailable($newEmail);
			if($emailUsed)
				return $this->response(buildServerResponse(false, "Questo indirizzo email è già in uso.", array("newEmailHasError" => true, "confirmNewEmailHasError" => true)), 200);

			$data = array("email" => $newEmail);
			$userInfo = array("id" => $userId);

			if($this->UserModel->updateUserSettingsData($userInfo, $data))
				return $this->response(buildServerResponse(true, "Indirizzo email modificato con successo."));
			else
				return $this->response(buildServerResponse(false, "Errore inaspettato."), 200);

		}
	}

	public function changePassword_post() {

	}

	public function changeProfilePicture_post() {

	}

}

