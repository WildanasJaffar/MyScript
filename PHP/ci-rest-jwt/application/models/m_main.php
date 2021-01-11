<?php if (!defined('BASEPATH')) exit('No direct script allowed');

class M_main extends CI_Model
{

	function get_user($q)
	{
		return $this->db->get_where('users', $q);
	}

	function logs($log_msg)
	{
		$data = array("success" => false, "message" => "");
		if (empty($log_msg)) {
			$data["message"] = "Log Message tidak terdefinisi";
			return $data;
		}

		$this->db->set("log_msg", $log_msg);
		$this->db->set("log_date", date('Y-m-d h:i:s'));
		$this->db->insert("logs");

		$data["success"] = true;
		return $data;
	}
}
