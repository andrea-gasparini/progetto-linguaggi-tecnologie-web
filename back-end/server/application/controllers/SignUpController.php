<?php

class SignUpController extends \chriskacerguis\RestServer\RestController
{

	public function __construct($config = 'rest')
	{
		parent::__construct($config);
	}

	public function doSignUp_post()
	{
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

		return $this->response(buildServerResponse(false, "wtf"), 200);
	}
}
