<?php

class GroupsModel extends CI_Model {

	public function getUsers($groupId) {
		$this->db->select("u.id, u.realname, u.profile_picture");
		$this->db->where("gm.group_id", $groupId);
		$this->db->where("u.id", "gm.user_id", FALSE);
		$query = $this->db->get("groupsMemberships gm, users u");
		return $query->result();
	}

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

	public function getAllDataGroup($groupId) {
		$this->db->select("g.id, g.description, g.group_title, u.profile_picture as ownerPicture, u.realname as owner");
		$this->db->where("g.id", $groupId);
		$this->db->where("u.id", "g.group_owner", FALSE);
		$query = $this->db->get("groups g, users u");
		return $query->result();
	}

	public function deleteGroup($groupId) {
		$this->db->where("id", $groupId);
		if($this->db->delete("groups"))
			return true;
		return false;
	}

	public function createGroup($groupName, $groupDesc, $groupOwner) {
		$data = array(
			"group_title" => $groupName,
			"description" => $groupDesc,
			"group_owner" => $groupOwner,
			"created_at" => "now()",
		);

		$this->db->insert("groups", $data);
		return $this->db->insert_id("groups_id_seq");
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

	public function addPostToGroup($dataPost) {
		if($this->db->insert("posts", $dataPost))
			return $this->db->insert_id("posts_id_seq");
		return false;
	}

	public function getPostFromGroup($postId, $groupId) {
		$this->db->select("*");
		$this->db->where(array("id" => $postId, "group_id" => $groupId));
		$query = $this->db->get("posts");
		return $query->result();
	}

	public function addComment($data) {
		$this->db->insert("comments", $data);
		return $this->db->insert_id("comments_id_seq");
	}

	public function loadPosts($groupId, $offset) {
		$this->db->select("p.*, u.username, u.realname, u.profile_picture");
		$this->db->where("group_id", $groupId);
		$this->db->where("p.user_id", "u.id", FALSE);
		$this->db->order_by("p.created_at", "desc");
		$this->db->limit(15, $offset);
		$query = $this->db->get("posts p, users u");
		return $query->result();
	}

	public function getFirstComments($postId) {
		$this->db->select("c.id as commentId, c.comment_text as commentText, c.created_at as createdAt, u.realname, u.username, u.profile_picture as picture");
		$this->db->where("c.post_id", $postId);
		$this->db->where("c.user_id", "u.id", FALSE);
		$this->db->limit(3);
		$this->db->order_by("c.created_at", "DESC");
		$query = $this->db->get("comments c, users u");
		return $query->result();
	}

	public function getCommentsByOffset($postId, $offset) {
		$this->db->select("c.id as commentId, c.comment_text as commentText, c.created_at as createdAt, u.realname, u.username, u.profile_picture as picture");
		$this->db->where("c.post_id", $postId);
		$this->db->where("c.user_id", "u.id", FALSE);
		$this->db->limit(3, $offset);
		$this->db->order_by("createdAt", "DESC");
		$query = $this->db->get("comments c, users u");
		return $query->result();
	}

	public function getNumberOfLeftComments($postId) {
		$this->db->select("id");
		$this->db->where("c.post_id", $postId);
		$query = $this->db->get("comments c");
		return $query->num_rows();
	}

	public function getChatId($groupId) {
		$this->db->select("*");
		$this->db->where("group_id", $groupId);
		$query = $this->db->get("chats");
		return $query->result();
	}

	public function addChatMessage($data) {
		$this->db->insert("chats_messages", $data);
		return $this->db->insert_id("chats_messages_id_seq");
	}

	public function getChatMessages($chatId, $offset, $userId) {
		$this->db->select("cm.id, cm.user_id, cm.chat_id, cm.message, cm.created_at as date, u.username, u.profile_picture as picture");
		$this->db->select("CASE WHEN cm.user_id = ".$userId." THEN TRUE ELSE FALSE END as isMine", FALSE);
		$this->db->where("chat_id", $chatId);
		$this->db->where("u.id", "cm.user_id", FALSE);
		$this->db->order_by("cm.created_at", "DESC");
		$this->db->limit(30, $offset);
		$query = $this->db->get("chats_messages cm, users u");
		return $query->result();
	}

}
