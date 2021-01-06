<?php

defined('BASEPATH') or exit('No direct script access allowed');
use \Firebase\JWT\JWT;

class Auth extends BD_Controller
{
    private $data;
    function __construct()
    {
        // Construct the parent class
        parent::__construct();
        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['users_get']['limit'] = 500; // 500 requests per hour per user/key
        $this->methods['users_post']['limit'] = 100; // 100 requests per hour per user/key
        $this->methods['users_delete']['limit'] = 50; // 50 requests per hour per user/key
        $this->load->model('M_main');

        $this->data = array("message" => "");
    }

    public function login_post()
    {
        $this->data["message"] = "Invalid Login";
        $u = trim($this->post('username')); //Username Posted
        $p = sha1(trim($this->post('password'))); //Pasword Posted
        $q = array('username' => $u); //For where query condition
        $kunci = $this->config->item('thekey');
        $val = $this->M_main->get_user($q)->row(); //Model to get single data row from database base on username

        if ($this->M_main->get_user($q)->num_rows() == 0) {
            $this->response($this->data, REST_Controller::HTTP_NOT_FOUND);
        }

        $match = $val->password;   //Get password for user from database
        if ($p == $match) {  //Condition if password matched
            $log = $this->M_main->logs("$u telah login");

            $date = new DateTime();
            $token['id'] = $val->id;  //From here
            $token['username'] = $u;
            $token['iat'] = $date->getTimestamp();
            $token['exp'] = $date->getTimestamp() + 60 * 60 * 5; //To here is to generate token

            $this->data['token'] = JWT::encode($token, $kunci); //This is the output token
            $this->data["message"] = "";
            $this->set_response($this->data, REST_Controller::HTTP_OK); //This is the respon if success
        } else {
            $this->set_response($this->data, REST_Controller::HTTP_NOT_FOUND); //This is the respon if failed
        }
    }

    public function logout_post()
    {
        $u = trim($this->post('username')); //Username Posted
        $log = $this->M_main->logs("$u telah logout");
        $this->set_response($this->data, REST_Controller::HTTP_OK); //This is the respon if success
    }
}
