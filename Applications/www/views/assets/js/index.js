$(function () {

    let d 					= new Date();
    let y 					= d.getFullYear();
    let h 					= d.getHours();
    let m 					= d.getMinutes();
    let s 					= d.getSeconds();
    let dashboardInteval 	= 6000000;
    let apiServer           = "";
    let weatherApi          = "";
    let newsApi             = "//newsapi.org/v2/top-headlines?country=tr&category=technology&apiKey=6f1129b019df4be8b3222fae110cf37e";
	let voiceType			= "Turkish Female";
	let Message 			= 
		[
			"Akıllı ekrana hoşgeldiniz.",
			"Merhaba, Sizin ev asistanınız olarak hizmet vermekteyim.",
			"Günaydın. Mutlu bir gün olmasını dilerim.",
			"Merhaba. size nasıl yardımcı olabilirim.",
			"İyiyim teşekkürler. Umarım sizde iyisinizdir.?",
			"Bugün çok güzel bir gün olacak. Sana şans diliyorum",
			" açıldı",
			" kapandı",
			"Lütfen miktar türünü sayısal bir değer söyleyiniz.",
			"Daha fazla haber dinlemek için lütfen miktarı arttırın.",
			"Bugün ",
			"Söylenen şehire ait hava durumu bilgisi bulunamadı.",
			" da hava durumu şu şekildedir.",
			"Bugün hava ",
			" olacaktır"
		];
    let mousetimeout;
    let screensaver_active  = true;
    let screenSaverTime     = 60;

    let  screenSaver = () => {

        function show_screensaver(){
            $('.screenSaver').fadeIn();
        }

        function stop_screensaver(){
            $('.screenSaver').fadeOut();
        }

        $(document).mousemove(function(){
            clearTimeout(mousetimeout);

            if (screensaver_active) {
                stop_screensaver();
            }

            mousetimeout = setTimeout(function(){
                show_screensaver();
            }, 1000 * screenSaverTime); // 5 secs
        });

    };

    const aPlayer = new APlayer({
        container: document.getElementById('aplayer'),
        mini: false,
        autoplay: false,
        theme: '#FADFA3',
        loop: true,
        order: 'random',
        preload: 'auto',
        volume: 0.7,
        mutex: true,
        listFolded: true,
        audio: [
            { 
            name: 'Ric Flair Drip (& Metro Boomin)',
            artist: 'Ric Flair',
            url: '/Applications/www/music/auto/disco.mp3',
            cover: '/Applications/www/music/auto/offset.jpg'
            },{
            name: 'Bebe Rexha - Ferrari',
            artist: 'Bebe Rexha',
            url: '/Applications/www/music/auto/Bebe Rexha - Ferrari [Vertical Video].mp3',
                cover: '/Applications/www/music/auto/offset.jpg'
            }
        ]
    });


    $(".togglePlayer").click(function () {
        $(".aPlayer").toggleClass("active");
    });

    $(document).on("click",".tabMenuItem",function(){
        let tabId = $(this).data("id");
        $(".tabHeader > ul > li").removeClass("active");
        $(this).addClass("active");
        $(".tabContent").removeClass("active");
        $(".tabContent[data-id="+tabId+"]").addClass("active");
    });


    function formatDate(date) {
        let year = date.getFullYear().toString();
        let month = (date.getMonth() + 101).toString().substring(1);
        let day = (date.getDate() + 100).toString().substring(1);
        return year + "-" + month + "-" + day;
    }

    function listingRead(){
        showPop("",true);
        console.log('Abort listening..');
        annyang.abort();
        annyang.resume();
    }

    Date.prototype.yyyymmdd = function() {
        let mm = this.getMonth() + 1;
        let dd = this.getDate();
        return [this.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
        ].join('');
    };



    function showPop(className, status) {

        if(status){
            $(".openPup").hide();
            $(".openPup").remove();
        }else{
            $(".openPup").remove();
            $("body").append('<div class="openPup pulse animated"><i class="'+className+'"></i></div>');
        }
    }

    function getMailDashboard(mailCounter ) {
        $.ajax({
            type: "get",
            url: "/ajax/getYandex",
            dataType:"json",
            success: function(data) {
                $(".dashboardMail").html(null);
                let counter = -1;
                let interVal =
                    setInterval(function () {
                        counter += 1;
                        if(counter === data.length){ clearInterval(interVal); return false; }
                        $(".dashboardMail").append('<li><i class="far fa-envelope"></i> '+data[counter]+'</li>');

                        if(counter+1 === parseInt(mailCounter)){ clearInterval(interVal); }
                    },1000);
            }
        });
    }

    getMailDashboard(6);
    setInterval(function () {
        getMailDashboard(6);
    },dashboardInteval);

    function getNewsDashboard(sayi) {
        $.ajax({
            type: "get",
            url: newsApi,
            dataType:"json",
            success: function(data) {
                $(".dashboardNews").html(null);
                let counter = -1;
                let interVal =
                    setInterval(function () {
                        counter += 1;
                        $(".dashboardNews").append('<li><i class="far fa-newspaper"></i> '+data["articles"][counter]["title"]+'</li>');
                        if(counter+1 === parseInt(sayi)){ clearInterval(interVal); }
                    },100);
            }
        });
    }

    getNewsDashboard(7);
    setInterval(function () {
        getNewsDashboard(7);
    },dashboardInteval);

    function getWeatherDashboard(province) {
        $.ajax({
            type: "get",
            url: "/ajax/district/"+province,
            dataType:"json",
            success: function(district) {
                $(".province").html(province);
                $.ajax({
                    type: "get",
                    url: "/ajax/daily/"+district["data"]["sehir"][0]["gunlukTahminIstNo"],
                    dataType:"json",
                    success: function(daily) {
                        $(".weatherCount").html(daily["data"][0]["enYuksekGun1"]);
                        $(".day1").html("Bugün  &nbsp;: <i class='fas fa-arrow-up'></i> " + daily["data"][0]["enYuksekGun1"] +" | <i class='fas fa-arrow-down'></i> "+daily["data"][0]["enDusukGun1"]);
                        $(".day2").html("Yarın  &nbsp;: <i class='fas fa-arrow-up'></i> " + daily["data"][0]["enYuksekGun2"] +" | <i class='fas fa-arrow-down'></i> "+daily["data"][0]["enDusukGun2"]);
                        $.ajax({
                            type: "get",
                            url: "/ajax/status/",
                            dataType:"json",
                            success: function(status) {
                                $(".weatherImg").attr("src","//www.mgm.gov.tr/Images_Sys/hadiseler/"+daily["data"][0]["hadiseGun1"]+".svg");
                                $(".textWeather").html(status[daily["data"][0]["hadiseGun1"]]);
                            }
                        });
                    }
                });
            }
        });
    }


    getWeatherDashboard("Adana");
    setInterval(function () {
        getWeatherDashboard("Adana");
    },dashboardInteval);

    $(".timeYearsFull").html(formatDate(new Date()));

    setInterval(function () {
        $(".timeYearsFull").html(formatDate(new Date()));
    },dashboardInteval);

    setInterval(function () {
        $(".timeFull").html(new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1"));
    },1000);

    if (annyang) {

        annyang.setLanguage('tr');

        let commands = {
            'ece': function() {
                showPop("fas fa-child");
                responsiveVoice.speak(Message[1], voiceType,{
                    onend:function () {
                        listingRead();
                    }
                });
            },
            'günaydın ece': function() {
                showPop("fas fa-child");
                responsiveVoice.speak(Message[2], voiceType,{
                    onend:function () {
                        listingRead();
                    }
                });
            },
            'merhaba ece': function(){
                showPop("fas fa-child");
                responsiveVoice.speak(Message[3], voiceType,{
                    onend:function () {
                        listingRead();
                    }
                });
            },
            'nasılsın ece': function() {
                showPop("fas fa-child");
                responsiveVoice.speak(Message[4], voiceType,{
                    onend:function () {
                        listingRead();
                    }
                });
            },
            'harika ece': function(key) {
                showPop("fas fa-child");
                responsiveVoice.speak(Message[5], voiceType,{
                    onend:function () {
                        listingRead();
                    }
                });
            },
            'ece :command :durum': {
                'regexp': /^ece (.*?) (aç|kapat)$/, 'callback':
                    function (command,durum) {
                        if(durum == "aç"){

                            showPop("fas fa-lightbulb");
                            responsiveVoice.speak(command + Message[6], voiceType,{
                                onend:function () {
                                    listingRead();
                                }
                            });

                        }else if(durum == "kapat"){
                            showPop("far fa-lightbulb");
                            responsiveVoice.speak(command +  Message[6], voiceType,{
                                onend:function () {
                                    listingRead();
                                }
                            });
                        }
                    }
            },
            "şarkı modu": function() {
                showPop("fas fa-music");
                $(".aPlayer").toggleClass("active");
                $(".aPlayer").addClass("aPlayerToggle");
                aPlayer.play();
                listingRead();
            },
            'saat kaç': function() {

                showPop("far fa-clock");
                responsiveVoice.speak(new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1"), voiceType,{onend:function () {
                        listingRead();
                    }});
            },
            'ekran modu':  function(durum) 	 {

                $(".screeOff").toggleClass("screenOn");

            },
            'yetkili modu':  function(mod) 	 {

                    if($(".settingArea").css("display") === "none"){
                        $(".settingArea").removeClass("fadeInUp fadeOutDown animated");
                        $(".masterZone").addClass("blur");
                        $(".settingArea").addClass("fadeInUp animated").fadeIn();
                        listingRead();
                    }else if($(".settingArea").css("display") === "block"){
                        $(".masterZone").removeClass("blur");
                        $(".settingArea").removeClass("fadeInUp").addClass("fadeOutDown").fadeOut();
                        listingRead();
                    }

            },
            'haber oku :count': function(count) 	 {
                if(!Number.isInteger(parseInt(count))){
                    responsiveVoice.speak(Message[8], voiceType);
                    listingRead();
                }else{
                    showPop("far fa-newspaper");
                    $.ajax({
                        type: "get",
                        url: newsApi,
                        dataType:"json",
                        success: function(data) {
                            let conter = -1;
                            let newsSound =
                                setInterval(function () {
                                    conter += 1;
                                    responsiveVoice.speak( data["articles"][conter]["title"], voiceType,
                                        {
                                            onend:function () {

                                                if(conter+1 === parseInt(count)){

                                                    clearInterval(newsSound);
                                                    responsiveVoice.speak(Message[9],voiceType,{onend:function () {
                                                            listingRead();
                                                        }});
                                                }
                                            }
                                        });

                                },8000);
                        }
                    });
                }
            },
            ':province hava durumu':  function(prc) {

                    let province = prc.toLocaleLowerCase().replace("ğ","g").replace("ş","s").replace("İ","i").replace("Ü","ü").replace("L","l").replace("Ç","o").replace("ı","i").replace("I","i");
                    showPop("fas fa-cloud");
                    $.ajax({
                        type: "get",
                        url: "/ajax/district/"+province,
                        dataType:"json",
                        success: function(district)
                        {

                            if(district.data["sehir"].length < 1){
                                responsiveVoice.speak(Message[12],voiceType,{onend:function () {
                                        listingRead();
                                    }});

                            }else{
                                responsiveVoice.speak(Message[11] + province + Message[13], voiceType,{
                                    onend: function () {
                                        $.ajax({
                                            type: "get",
                                            url: "/ajax/daily/"+district["data"]["sehir"][0]["gunlukTahminIstNo"],
                                            dataType:"json",
                                            success: function(daily) {
                                                responsiveVoice.speak("En yüksek hava sicaklığı " + daily["data"][0]["enYuksekGun1"] + " derece.", voiceType, {
                                                    onend: function () {
                                                        responsiveVoice.speak("En düşük hava sicaklığı ise " + daily["data"][0]["enDusukGun1"] + " derecedir.", voiceType, {
                                                            onend: function () {
                                                                $.ajax({
                                                                    type: "get",
                                                                    url: "/ajax/status/",
                                                                    dataType:"json",
                                                                    success: function(status) {
                                                                        responsiveVoice.speak(Message[12]+ status[daily["data"][0]["hadiseGun1"]] + Message[15], voiceType);
                                                                        listingRead();
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    }
                                                });

                                            }
                                        });
                                    }});
                            }

                        }
                    });
            },
            'gelen kutusu': function (mail) {

                        showPop("far fa-envelope");
                        $.ajax({
                            type: "get",
                            url: "/ajax/getYandex",
                            dataType:"json",
                            success: function(data) {
                                let counter = -1;
                                let interVal =
                                    setInterval(function () {
                                        counter += 1;
                                        if(counter === data.length){ clearInterval(interVal);  listingRead(); return false; }
                                        responsiveVoice.speak(counter+1 + " "+ data[counter], voiceType);
                                    },6000);
                            }
                        });
                }
        };



        $(".startScreen").click(function () {

            $(".startScreenArea").addClass("zoomOut animated");
            $(".startScreenArea").remove();

            element = $('body').get(0);
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }

            responsiveVoice.speak(Message[0], voiceType);

            annyang.addCommands(commands);
            annyang.start();
            annyang.addCallback('resultMatch', function(userSaid, commandText, phrases) {
                //console.log(userSaid);
                //console.log(commandText);
                //console.log(phrases);
            });
            screenSaver();
            listingRead();

        });

    }

});

$(window).on('load',  (e) => {
    $(".startScreen").fadeIn();
    $(".startScreenLoader").fadeIn();
});