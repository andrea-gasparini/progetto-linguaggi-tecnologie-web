<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;

class Test extends RestController {
	
	function __construct()
    {
        // Construct the parent class
        parent::__construct();
    }
	

	
	public function test_post() {
		return $this->response(array("http" => "ok"), 200);
	}
	
}