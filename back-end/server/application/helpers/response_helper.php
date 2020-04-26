<?php

function buildServerResponse($status, $message, $data = array()) {
	return array("status" => $status, "message" => $message, "data" => $data);
}

function setUserDataToSendInRedux($user) {
	return array(
		"userId" => $user->id
	);
}
