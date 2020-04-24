<?php

function buildServerResponse($status, $message, $data = array()) {
	return array("status" => $status, "message" => $message, "data" => $data);
}
