<?php

class SignUpController extends \chriskacerguis\RestServer\RestController
{

	public function __construct($config = 'rest')
	{
		parent::__construct($config);
	}

	public function doSignUp_post()
	{
		$realname = $this->input->post("signUpRealname");
		$username = $this->input->post("signUpUsername");
		$email = $this->input->post("signUpEmail");
		$password = $this->input->post("signUpPassword");
		$cpassword = $this->input->post("signUpConfirmPassword");

		$hasError = false; // true se c'è almeno un errore
		$error = array(
			"signUpRealnameHasError" => false,
			"signUpUsernameHasError" => false,
			"signUpEmailHasError" => false,
			"signUpPasswordHasError" => false,
			"signUpConfirmPasswordHasError" => false
		);

		foreach ($error as $key => $value)
			if (!$value || strlen($value) <= 0 || strlen(trim($value))) {
				$error[$key] = true; //
				$hasError = true; // c'è almeno un errore
			}

		if ($hasError)
			return $this->response(buildServerResponse( // util definita in ../helpers/response_helper.php
				false, "Compila questo campo per poterti registrare.", $errors), 200);

		return $this->response(buildServerResponse(false, "wtf"), 200);
	}
}
