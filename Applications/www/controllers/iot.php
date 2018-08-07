<?php
/*
 * Author  : Fix Framework | Cengiz Akcan
 * Web     : fixframework.com
 * Mail    : info@fixframework.com
 * Docs    : docs.fixframework.com
 * Version : Beta
 * Github  : github.com/FixFramework
 * Creator : room in dashboard
 * */

use System\Fix\Fix;
use System\Core\Curl\Curl;
use System\Core\View\View;
use System\Core\Ip\Ip;
use System\Core\Model\Model;

class iot
{

	public function __construct(){

        header('Access-Control-Allow-Origin: *');

    }

    public static function dashboard(){

        View::render("index");


    }


}
