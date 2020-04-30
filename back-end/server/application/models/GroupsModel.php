<?php

class GroupsModel extends CI_Model {

	public function getGroupById($id) {
		$this->db->select("*");
		$this->db->where("id", $id);
		$query = $this->db->get("groups");
		return $query->result();
	}

}
