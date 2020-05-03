<?php

class ChatModel extends CI_Model {

	public function createGroupChat($groupId) { $this->db->insert("chats", array("group_id" => $groupId)); }


}
