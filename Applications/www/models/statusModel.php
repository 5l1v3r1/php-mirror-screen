<?php

use System\Core\Pdo\Pdo;

class statusModel
{

    /**
     * @return array|mixed
     */
    public static function getStatus(){

        return Pdo::fix()->select("settings")->where(["id"],[0])->run(Pdo::$_Single);

    }


}