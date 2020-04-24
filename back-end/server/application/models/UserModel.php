<?php

// tutte le query relative ad un utente.

class UserModel extends CI_Model
{

	public function getUserByEmail($email) {
		$this->db->select("*");
		$this->db->where(array("email" => $email));
		$this->db->limit(1); // esiste al più un utente con questo username.
		$query = $this->db->get("users");
		return $query->result();
	}


}
