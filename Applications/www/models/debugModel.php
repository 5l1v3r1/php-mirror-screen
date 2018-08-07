<?php

class debugModel
{

    /**
     * @param array ...$params
     */
    public static function run(...$params){

        return exit(
            die(
                [
                    "status"    => $params[0],
                    "message"   => $params[1],
                    "extra"     => (isset($params[2]) ? $params[2] : null),
                    "time"      => date("Y-m-d H:i:s")
                ]
            )
        );

    }

}