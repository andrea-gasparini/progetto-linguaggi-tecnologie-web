<?php

function buildServerResponse($status, $message, $data = array()) {
	return array("status" => $status, "message" => $message, "data" => $data);
}

function setUserDataToSendInRedux($user) {
	return array(
		"userId" => $user->id
	);
}

function validateAuthorizationToken($token) {
	$token = $token; // Authorization header dalla richiesta post
	if(strlen($token) >= 6 && substr($token, 0, 6) == "Bearer") {
		$token = count(explode("Bearer ", $token)) > 0 ? explode("Bearer ", $token)[1] : ""; // il token ora è qualcosa della forma jwt oppure è vuoto.

		if (strlen($token) <= 0) // token non valido in questo caso
			return buildServerResponse(false, "Token di accesso non valido. #0");

		$tokenData = AUTHORIZATION::validateToken($token); // questa funzione chiama la decode di jwt che ritorna false nel caso in cui il token non sia valido, altrimenti ritorna il payload del token.
		if (!$tokenData) // se il token non è stato decodificato correttamente
			return buildServerResponse(false, "Token di accesso non valido. #1");

		$userId = $tokenData->userId;
		if (!FILTER_VAR($userId, FILTER_VALIDATE_INT)) // se l'userId nel token non è un intero c'è un problema.
			return buildServerResponse(false, "Token di accesso non valido. #2");

		return buildServerResponse(true, "ok", array("userId" => $tokenData->userId));
	}

	return buildServerResponse(false, "Token di accesso non valido. #3");;
}


function loadDataUser($userId, $username) {
	$ci = & get_instance();
	$userGroups = $ci->UserModel->getUserGroups($userId);
	$userNotificationsCount = $ci->UserModel->getInvitationsCountToRead($userId);
	return array("userGroups" => $userGroups, "userNotifications" => $userNotificationsCount, "viewer" => array("username" => $username, "id" => $userId));
}
