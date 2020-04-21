<?php

class TestModel extends CI_Model {

	public function getUsers() {
		$query = $this->db->get("users"); // tutte le query vengono eseguite con la funzione get("tabella"); vediti la documentazione per le varie ->select, ->where, ->like etc
		return $query->result();
	}

}
