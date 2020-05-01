<?php

class SignUpController extends \chriskacerguis\RestServer\RestController
{

	public function __construct($config = 'rest')
	{
		parent::__construct($config);
	}

	public function doSignUp_post()
	{
		$REALNAME_MAX_LENGTH = 255;
		$USERNAME_MAX_LENGTH = 25;
		$EMAIL_MAX_LENGTH = 255;
		$PASSWORD_MAX_LENGTH = 30;

		$values = array(
			"signUpRealname" 		=> NULL,
			"signUpUsername"		=> NULL,
			"signUpEmail"			=> NULL,
			"signUpPassword"		=> NULL,
			"signUpConfirmPassword"	=> NULL
		);

		// POST per ogni campo nell'array values
		foreach ($values as $key => $value) $values[$key] = $this->input->post($key);

		$hasError = false;	// true se c'è almeno un errore
		$errors = array();	// array di errori: (signUpRealNameHasError => true, etc.. )

		// Double check required e milength
		foreach ($values as $key => $value)
		{
			if (!$value || strlen($value) <= 0 || strlen(trim($value)) <= 0) {
				$errors[$key . "HasError"] = true;
				$hasError = true; // c'è almeno un errore
			}
			else
				$errors[$key . "HasError"] = false;
		}

		if ($hasError)
			return $this->response(buildServerResponse( // util definita in ../helpers/response_helper.php
				false, "Compila questo campo!", $errors), 200);

		// Check signUpPassword e signUpConfirmPassword match
		if ($values["signUpPassword"] != $values["signUpConfirmPassword"]) {
			$errors["signUpPasswordHasError"] = true;
			$errors["signUpConfirmPasswordHasError"] = true;
			return $this->response(buildServerResponse(
				false, "Le due password devono corrispondere.", $errors), 200);
		}

		// Check password maxlength
		if (strlen($values["signUpPassword"]) > $PASSWORD_MAX_LENGTH ||
		strlen($values["signUpConfirmPassword"]) > $PASSWORD_MAX_LENGTH) {
			$errors["signUpPasswordHasError"] = true;
			$errors["signUpConfirmPasswordHasError"] = true;
			return $this->response(buildServerResponse(
				false, "La password non può contenere più di " . $PASSWORD_MAX_LENGTH . " caratteri.", $errors), 200);
		}

		// Check email valida
		if (!FILTER_VAR($values["signUpEmail"], FILTER_VALIDATE_EMAIL)) {
			$errors["signUpEmailHasError"] = true;
			return $this->response(buildServerResponse(
				false, "L'email inserita non è valida.", $errors), 200);
		}

		// Check email maxlength
		if (strlen($values["signUpEmail"]) > $EMAIL_MAX_LENGTH) {
			$errors["signUpEmailHasError"] = true;
			return $this->response(buildServerResponse(
				false, "L'email non può contenere più di " . $EMAIL_MAX_LENGTH . " caratteri.", $errors), 200);
		}

		// Check realname maxlength
		if (strlen($values["signUpRealname"]) > $REALNAME_MAX_LENGTH) {
			$errors["signUpRealnameHasError"] = true;
			return $this->response(buildServerResponse(
				false, "Massimo " . $REALNAME_MAX_LENGTH . " caratteri.", $errors), 200);
		}

		// Check username maxlength
		if (strlen($values["signUpUsername"]) > $USERNAME_MAX_LENGTH) {
			$errors["signUpUsernameHasError"] = true;
			return $this->response(buildServerResponse(
				false, "Massimo " . $USERNAME_MAX_LENGTH . " caratteri.", $errors), 200);
		}

		return $this->response(buildServerResponse(true, "ok"), 200);
	}
}
