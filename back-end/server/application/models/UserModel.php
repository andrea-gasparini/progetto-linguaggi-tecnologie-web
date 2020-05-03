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

	public function checkEmailAvailable($email) {
		$this->db->select("*");
		$this->db->where(array("email" => $email));
		$query = $this->db->get("users");
		return $query->num_rows() > 0;
	}

	public function updateUserSettingsData($userInfo, $data) {
		$this->db->where($userInfo);
		$this->db->limit(1);
		$this->db->update("users", $data);
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


	public function getInvitationsCountToRead($userId) {
		$this->db->select("group_id");
		$this->db->where(array("to_id" => $userId, "is_read" => "f"));
		$this->db->group_by("group_id");
		$query = $this->db->get("invitations");
		return $query->num_rows();
	}


	public function getUserGroups($userId) {
		$this->db->select("groups.id, groups.created_at, groups.group_title");
		$this->db->join("groups", "groups.id = groupsMemberships.group_id");
		$this->db->where(array("groupsMemberships.user_id" => $userId));
		$query = $this->db->get("groupsMemberships");
		return $query->result();
	}


	public function resetCountNotification($userId) {
		$this->db->set("is_read", "1");
		$this->db->where(array("to_id" => $userId, "is_read" => "0"));
		return $this->db->update("invitations");
	}

	public function deleteNotificationGroupForUser($userId, $groupId) {
		$this->db->where(array("to_id" => $userId, "group_id" => $groupId));
		return $this->db->delete("invitations");
	}

	public function existsInvitation($userId, $groupId) {
		$this->db->select("*");
		$this->db->where(array("to_id" => $userId, "group_id" => $groupId));
		$query = $this->db->get("invitations");
		return $query->num_rows() > 0;
	}

	public function addMembership($data) {
		return $this->db->insert("groupsMemberships", $data);
	}

}
