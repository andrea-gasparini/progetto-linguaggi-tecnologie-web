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


	public function getUserById($id) {
		$this->db->select("*");
		$this->db->where(array("id" => $id));
		$this->db->limit(1);
		$query = $this->db->get("users");
		return $query->result();
	}


	public function searchUser($username) {
		$this->db->select("username"); // SELECT username FROM users WHERE username LIKE '%username%' OR email LIKE '%username%' LIMIT 50.
		$this->db->like("username", $username);
		$this->db->or_like("email", $username);
		$this->db->limit(50); // limitato a 50 per motivi di efficienza (se ci sono molti utenti registrati).
		$query = $this->db->get("users");
		return $query->result();
	}

}
