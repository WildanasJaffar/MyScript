<?php

defined('BASEPATH') or exit('No direct script access allowed');

require_once 'PHPGangsta/GoogleAuthenticator.php';

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
        $log = $this->M_main->logs($this->user_data->username . " melihat user");
        $this->set_response($data, REST_Controller::HTTP_OK);
    }

    public function index_post()
    {
        $ga = new PHPGangsta_GoogleAuthenticator();
        $secret = $ga->createSecret();
        $qrCodeUrl = $ga->getQRCodeGoogleUrl('Vue Apps', $secret); // gen qrcode for secret

        $data = array(
            'username'          => $this->post('username'),
            'password'          => sha1(trim($this->post('password'))),
            'secret'            => $secret,
            'url_qrcode'        => $qrCodeUrl,
            'user_fullname'     => $this->post('user_fullname'),
            'user_funfact'      => $this->post('user_funfact'),
            'created_by'        => $this->post('update_by'),
            'created_date'      => date('Y-m-d'),
            'updated_by'        => $this->post('update_by'),
            'updated_date'      => date('Y-m-d')
        );
        $create = $this->db->insert('users', $data);

        if ($create) {
            $this->set_response($data, REST_Controller::HTTP_OK);
        } else {
            $this->set_response($data, REST_Controller::HTTP_BAD_REQUEST);
        }
    }

    public function index_put()
    {
        $id = $this->put('id');
        $data = array(
            'id'                => $this->put('id'),
            'username'          => $this->put('username'),
            'user_fullname'     => $this->put('user_fullname'),
            'user_funfact'      => $this->put('user_funfact'),
            'updated_by'        => $this->put('update_by'),
            'updated_date'      => date('Y-m-d')
        );
        $this->db->where('id', $id);
        $update = $this->db->update('users', $data);

        if ($update) {
            $this->set_response($data, REST_Controller::HTTP_OK);
        } else {
            $this->set_response($data, REST_Controller::HTTP_BAD_REQUEST);
        }
    }

    public function delete_get()
    {
        $id = (int)$this->get('id');
        $this->db->where('id', $id);
        $delete = $this->db->delete('users');
        $data = array("message" => "", "id" => $this->get());

        if ($delete) {
            $this->set_response($data, REST_Controller::HTTP_OK);
        } else {
            $this->set_response($data, REST_Controller::HTTP_BAD_REQUEST);
        }
    }
}
