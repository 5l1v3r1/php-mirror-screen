<?php

use System\Core\Model\Model;
use System\Fix\Fix;
use Ddeboer\Imap\Server;

class ajax
{

    public function __construct()
    {
        Model::get("weather");
        Model::get("statusModel");
        Model::get("debugModel");
    }

    public static function dashboard(){

        echo Fix::show();

    }

    public static function province(){

        print json_encode(weather::__Provices());

    }

    public static function district($_Disctrict = null){

        print json_encode(weather::__SelectProvice($_Disctrict));

    }

    public static function hourly($_Station = null){

        print json_encode(weather::__Hourly($_Station));

    }

    public static function daily($_Station = null){

        print json_encode(weather::__Daily($_Station));

    }

    public static function hot($_Station = null){

        print json_encode(weather::__LastData($_Station));

    }

    public static function status($_Codes = null){

        print json_encode(weather::__StatusCode($_Codes));

    }

    public static function getYandex(){

        $server = new Server('imap.yandex.com.tr');
        $connection = $server->authenticate('cengiz@cengiz.com', '123456789');
        $mailbox = $connection->getMailbox('INBOX');
        $messages = $mailbox->getMessages();

        $ext = [];
        foreach ($messages as $message) {
            $ext[] = strip_tags($message->getSubject());
        }

        echo json_encode($ext);

    }

    public static function getSetup(){

        (
            statusModel::getStatus()
        ) ? null
            : debugModel::run("error","");

    }


}