<?php

class TestModel extends CI_Model {

	public function getUsers() {
		$query = $this->db->get("users");
		return $query->result();
	}

}
