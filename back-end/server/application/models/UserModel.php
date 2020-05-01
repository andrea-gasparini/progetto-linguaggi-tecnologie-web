<?php

// tutte le query relative ad un utente.

class UserModel extends CI_Model
{
	public function usernameIsAvaiable($username) {
		$this->db->select("*");
		$this->db->where(array("username" => $username));
		$query = $this->db->get("users");
		return $query->num_rows() == 0;
	}


	public function createUser($realname, $username, $email, $password) {
		$data = array(
			"realname" => $realname,
			"username" => $username,
			"email" => $email,
			"password" => $password,
			"created_at" => "now()"
		);
		$this->db->insert("users", $data);
		return $this->db->insert_id("users_id_seq");
	}


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


	public function searchUser($username, $userId) {
		$this->db->select("id, username"); // seleziona id, username
		$this->db->group_start(); // (
		$this->db->like("username", $username);
		$this->db->or_like("email", $username);
		$this->db->group_end(); // )
		$this->db->where("id !=", $userId); // userId differente dal mio.
		$this->db->limit(50); // limitato a 50 per motivi di efficienza (se ci sono molti utenti registrati).
		$query = $this->db->get("users");
		// SELECT id, username FROM users WHERE (username LIKE "%username%" OR email LIKE "%username%") AND id != userId
		return $query->result();
	}

}
