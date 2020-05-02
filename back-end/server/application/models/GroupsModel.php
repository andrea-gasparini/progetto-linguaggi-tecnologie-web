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

	public function getUserInvitation($userId) {
		$this->db->select("g.id, g.group_title, max(i.invited_at) as lastInvitationTime, array_to_json(array_agg(u.username)) as users, count(u.username) as usersCountInvitation");
		$this->db->where(array("i.to_id" => $userId));
		$this->db->where("g.id", "i.group_id", FALSE);
		$this->db->where("u.id", "i.from_id", FALSE);
		$this->db->group_by("g.id");
		$this->db->order_by("lastinvitationtime", "DESC");
		$query = $this->db->get("invitations i, groups g, users u");
		return $query->result();
	}


}
