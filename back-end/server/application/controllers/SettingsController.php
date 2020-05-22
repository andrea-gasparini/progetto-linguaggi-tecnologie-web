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
			$confirmNewEmail = $this->input->post('confirmNewEmail');
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
		}
		return $this->response(buildServerResponse(false, "Errore autenticazione."), 200);
	}

	public function changePassword_post() {
		/*
		 * parametri post da passare: oldPassword, newPassword, confirmNewPassword.
		 *
		 */
		$token = validateAuthorizationToken($this->input->get_request_header('Authorization'));
		if($token["status"]) {
			$oldPassword = $this->input->post('oldPassword');
			$newPassword = $this->input->post('newPassword');
			$confirmNewPassword = $this->input->post('confirmNewPassword');
			$userId = $token["data"]["userId"];

			$user = $this->UserModel->getUserById($userId);
			if(count($user) <= 0)
				return $this->response(buildServerResponse(false, "Utente inesistente."), 200);

			if(!password_verify($oldPassword, $user[0]->password))
				return $this->response(buildServerResponse(false, "La vecchia password è errata.", array("oldPasswordHasError" => true)), 200);

			if(strlen($newPassword) < 8)
				return $this->response(buildServerResponse(false, "La nuova password deve contenere almeno 8 caratteri.", array("newPasswordHasError" => true, "confirmNewPasswordHasError" => true)), 200);

			if($newPassword != $confirmNewPassword)
				return $this->response(buildServerResponse(false, "Le due nuove password non coincidono.", array("newPasswordHasError" => true, "confirmNewPasswordHasError" => true)));

			$userInfo = array("id" => $user[0]->id);
			$data = array("password" => password_hash($newPassword, PASSWORD_DEFAULT));
			if($this->UserModel->updateUserSettingsData($userInfo, $data))
				return $this->response(buildServerResponse(true, "Hai cambiato la password con succeso!"), 200);
		}
		return $this->response(buildServerResponse(false, "Errore autenticazione."), 200);
	}

	public function changeProfilePicture_post()
	{
		$config['upload_path'] = './uploads/profilePictures/';
		$config['allowed_types'] = 'gif|jpg|jpeg|png';
		$config['encrypt_name'] = true; // codifica il nome del file caricato.
		$this->load->library('upload', $config);

		$token = validateAuthorizationToken($this->input->get_request_header('Authorization'));
		if ($token["status"]) {
			$userId = $token["data"]["userId"];

			$user = $this->UserModel->getUserById($userId);
			if (count($user) <= 0)
				return $this->response(buildServerResponse(false, "Utente inesistente."), 200);


			if(!$this->upload->do_upload("file")) // fa l'upload del file
				return $this->response(buildServerResponse(false, $this->upload->display_errors()), 200);

			$uploadedData = $this->upload->data(); // prendo le info del file uploadato
			$userInfo = array("id" => $userId);
			$userData = array("profile_picture" => $uploadedData["file_name"]);
			if($this->UserModel->updateUserSettingsData($userInfo, $userData))
				return $this->response(buildServerResponse(true, "Immagine caricata", array("imageName" => $uploadedData["file_name"])), 200);
			else
				return $this->response(buildServerResponse(false, "Errore durante l'aggiornamento dell'immagine di profilo."), 200);
		}
		return $this->response(buildServerResponse(false, "Errore autenticazione."), 200);
	}

}

