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


	public function invitationAlreadyExists($fromId, $toId, $groupId) {
		$this->db->select("*");
		$this->db->where(array("from_id" => $fromId, "to_id" => $toId, "group_id" => $groupId));
		$this->db->limit(1);
		$query = $this->db->get("invitations");
		return $query->num_rows() > 0;
	}


	public function addInvitation($data, $exists) {
		if($exists) {
			// update timestamp
			$this->db->set('invited_at', 'NOW()');
			$this->db->where(array("from_id" => $data["from_id"], "to_id" => $data["to_id"], "group_id" => $data["group_id"]));
			return $this->db->update('invitations');
		} else {
			// insert invitation
			return $this->db->insert('invitations', $data);
		}
	}


}
