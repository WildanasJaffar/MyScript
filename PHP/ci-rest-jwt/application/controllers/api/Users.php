<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Users extends BD_Controller
{
    function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->auth();
        $this->load->model('M_main');
    }

    public function index_get()
    {
        $id = $this->get('id');
        $where = array();
        if (!empty($id)) {
            $where['id'] = $id;
        }

        $data = $this->M_main->get_user($where)->result_array();
        $this->set_response($data, REST_Controller::HTTP_OK); //This is the respon if success
    }
}
