<?php

class GroupsModel extends CI_Model {

	public function getGroupById($id) {
		$this->db->select("*");
		$this->db->where("id", $id);
		$query = $this->db->get("groups");
		return $query->result();
	}

	public function isGroupMember($userId, $groupId) {
		$this->db->select("*");
		$this->db->where(array("user_id" => $userId, "group_id" => $groupId));
		$this->db->limit(1);
		$query = $this->db->get("groupsMemberships");
		return $query->num_rows() > 0;
	}

}
