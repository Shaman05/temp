<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Welcome extends CI_Controller {

	public function index()
	{
	    $d = array();
	    $d['title'] = 'Fetool - 前端助手';
	    $d['action'] = 'none';

	    $this->load->view('template/header.html', $d);
		$this->load->view('welcome.html');
		$this->load->view('template/footer.html');
	}
}