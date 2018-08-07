<?php

use Curl\Curl;

class weather
{

    const REFERRER  = "https://www.mgm.gov.tr";
    const PROVICES  = "https://servis.mgm.gov.tr/api/merkezler/iller";
    const DISTRICT  = "https://servis.mgm.gov.tr/api/merkezler/ililcesi";
    const PROVICE   = "https://servis.mgm.gov.tr/api/merkezler";
    const DAILY     = "https://servis.mgm.gov.tr/api/tahminler/gunluk";
    const HOURLY    = "https://servis.mgm.gov.tr/api/tahminler/saatlik";
    const LASTDATA  = "https://servis.mgm.gov.tr/api/sondurumlar";

	public static function Curl(){
		
		return new Curl();
		
	}
	
    public static function __Provices(){

       $_Weather = self::Curl();
        $_Weather->setReferrer(self::REFERRER);
        $_Weather->get(self::PROVICES);

        if ($_Weather->error) :

            return [

                "status" => "passive"
            ];

        else:

            return [

                "status"     => "active",
                "data"      => $_Weather->response
            ];

        endif;


    }

    public static function __SelectDistrict($_Provices = "Ankara"){

        $_Weather =self::Curl();
            $_Weather->setReferrer(self::REFERRER);
            $_Weather->get(self::DISTRICT,[
                "il" => $_Provices
            ]);

        if ($_Weather->error) :

            return [

                "status"     => "passive",
                "mesaj"     => "Parametre < il > ",
            ];

        else:

            return [

                "status"     => "active",
                "mesaj"     => "Parametre < il > ",
                "data"      => $_Weather->response
            ];

        endif;

    }

    public static function __SelectProvice($_Provices = "Ankara"){

        $_Weather =self::Curl();
            $_Weather->setReferrer(self::REFERRER);
            $_Weather->get(self::PROVICE,[
                "il" => $_Provices
            ]);

        if ($_Weather->error) :

            return [

                "status"     => "passive",
                "mesaj"     => "Parametre < il > "
            ];

        else:

            return [

                "status"         => "active",
                "mesaj"         => "Parametre < il > ",
                "data"          => [
                    "sehir"     => $_Weather->response,
                    "ilceleri"  => self::__SelectDistrict($_Provices),
                ]
            ];

        endif;

    }

    public static function __Daily($_StationId = 90101){

        $_Weather =self::Curl();
            $_Weather->setReferrer(self::REFERRER);
            $_Weather->get(self::DAILY,[
                "istno" => $_StationId
            ]);

        if ($_Weather->error) :

            return [

                "status"     => "passive",
                "mesaj"     => "Parametre < gunlukTahminIstNo > "
            ];

        else:

            return [

                "status"     => "active",
                "mesaj"     => "Parametre < gunlukTahminIstNo > ",
                "data"      => $_Weather->response
            ];

        endif;

    }
    public static function __Hourly($_StationId = 90101){

        $_Weather =self::Curl();
            $_Weather->setReferrer(self::REFERRER);
            $_Weather->get(self::HOURLY,[
                "istno" => $_StationId
            ]);

        if ($_Weather->error) :

            return [

                "status"     => "passive",
                "mesaj"     => "Parametre < sondurumIstNo > "
            ];

        else:

            return [

                "status"     => "active",
                "mesaj"     => "Parametre < sondurumIstNo > ",
                "data"      => $_Weather->response
            ];

        endif;

    }

    public static function __LastData($_StationId = 90101){

        $_Weather =self::Curl();
            $_Weather->setReferrer(self::REFERRER);
            $_Weather->get(self::LASTDATA,[
                "merkezid" => $_StationId
            ]);

        if ($_Weather->error) :

            return [

                "status"     => "passive",
                "mesaj"     => "Parametre < merkezId > "
            ];

        else:

            return [

                "status"     => "active",
                "mesaj"     => "Parametre < merkezId > ",
                "data"      => $_Weather->response
            ];

        endif;

    }

    public static function __StatusCode($_StatusCode = ""){

        return [
             "A"   => "Açık",
             "AB"  => "Az Bulutlu",
             "PB"  => "Parçalı Bulutlu",
             "CB"  => "Çok Bulutlu",
             "HY"  => "Hafif Yağmurlu",
             "Y"   => "Yağmurlu",
             "KY"  => "Kuvvetli Yağmurlu",
             "KKY" => "Karla Karışık Yağmurlu",
             "HKY" => "Hafif Kar Yağışlı",
             "K"   => "Kar Yağışlı",
             "YKY" => "Yoğun Kar Yağışlı",
             "HSY" => "Hafif Sağanak Yağışlı",
             "SY"  => "Sağanak Yağışlı",
             "KSY" => "Kuvvetli Sağanak Yağışlı",
             "MSY" => "Mevzi Sağanak Yağışlı",
             "DY"  => "Dolu",
             "GSY" => "Gökgürültülü Sağanak Yağışlı",
             "KGY" => "Kuvvetli Gökgürültülü Sağanak Yağışlı",
             "SIS" => "Sisli",
             "PUS" => "Puslu",
             "DMN" => "Dumanlı",
             "KF"  => "Toz veya Kum Fırtınası",
             "R"   => "Rüzgarlı",
             "GKR" => "Güneyli Kuvvetli Rüzgar",
             "KKR" => "Kuzeyli Kuvvetli Rüzgar",
             "SCK" => "Sıcak",
             "SGK" => "Soğuk",
             "HHY" => "Yağışlı"
            ];

    }

}