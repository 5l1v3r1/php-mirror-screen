<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no">
	<title> IOT HOME AUTOMATE </title>

    <link rel="stylesheet" href="/Applications/www/views/assets/css/style.css">
    <link rel="stylesheet" href="/Applications/www/views/assets/css/animate.min.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.10/css/all.css" integrity="sha384-+d0P83n9kaQMCwj8F4RJB66tzIwOKmrdb46+porD/OvrJ+37WqIM7UoBtwHO6Nlg" crossorigin="anonymous">
    <link rel="stylesheet" href="/Applications/www/views/assets/plugins/aplayer/APlayer.min.css">
	<meta http-equiv="cache-control" content="max-age=0" />
	<meta http-equiv="cache-control" content="no-cache" />
	<meta http-equiv="expires" content="0" />
	<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
	<meta http-equiv="pragma" content="no-cache" />

</head>
<body id="screeAll">

	<div class="masterZone">
	
	    <div class="timeZoneArea">
			<div class="province">XXXXX</div>
			<div class="timeYearsFull">0000 00 00</div>
			<div class="timeFull">00:00:00</div>
		</div>

		<div class="weatherArea">
			<div><img class="weatherImg" src="https://www.mgm.gov.tr/Images_Sys/hadiseler/PB.svg" alt=""> </div>
			<div><label class="weatherCount">XX</label> <span>°C</span> </div>
			<div class="textWeather">XXXXXXXXXX</div>
			<div class="day1">XXXXXXX</div>
			<div class="day2">XXXXXXX</div>
		</div>

		<div class="newsArea">
		   <ul class="dashboardNews">
		   </ul>
		</div>
		<div class="mailArea">
		   <ul class="dashboardMail">
		   </ul>
		</div>

		<div class="specialArea">
			<div>Cengiz AKCAN</div>
			<div>cengiz@zekicetasarim.com</div>
		</div>
	
	</div>

    <div class="settingArea">
        <div class="header">YÖNETİCİ PANELİ</div>
		
		<div class="tabHeader">
			<ul>
				<li class="active tabMenuItem" data-id="1" >GENEL AYARLAR</li>
				<li  class="tabMenuItem" data-id="2">SENSÖR AYARLARI</li>
			</ul>
		</div>
		
		<div  data-id="1"  class="tabContent active">
		
			<div class="formArea">
			
				<div class="formEelement">
					<div class="label">ASİSTAN ADI</div>
					<div class="input">
						<input type="text" name="botname" value="cadı">
					</div>
				</div>
				
				<div class="formEelement">
					<div class="label">KULLANICI</div>
					<div class="input">
						<input type="text" name="fullname" value="Cengiz AKCAN">
					</div>
				</div>
				<div class="formEelement">
					<div class="label">E-POSTA</div>
					<div class="input">
						<input type="text" name="email" value="cengiz@fotografsec.com" >
					</div>
				</div>
				<div class="formEelement">
					<div class="label">YAŞADIĞINIZ İL</div>
					<div class="input">
						<select name="province">
							<option value="Adana">ADANA</option>
							<option value="Mersin">MERSİN</option>
						</select>
					</div>
				</div>
				
			</div>
		
		</div>
		<div  data-id="2"  class="tabContent">İçerik 2</div>
		
    </div>

    <div class="screeOff"></div>

    <div class="startScreenArea">
        <i class="startScreenLoader fab fa-superpowers fa-spin"></i>
        <button class="startScreen">BAŞLAT</button>
    </div>

    <div class="aPlayer">
        <div class="togglePlayer"><i class="fas fa-music"></i></div>
        <div id="aplayer"></div>
    </div>

    <div class="searchBrowser">
        <form class="browserForm" action="" method="post" onsubmit="return false;">
            <input class="url" type="url" name="guestURL" autofocus placeholder="https://yandex.com.tr/">
            <button class="go"><i class="fas fa-chevron-circle-right"></i></button>
        </form>
        <button class="ext"><i class="fas fa-times-circle"></i></button>

        <iframe src="javascript:;"  frameborder="0"></iframe>
    </div>

    <div class="screenSaver">
        <canvas id='world'></canvas>
    </div>

    <script>if (typeof module === 'object') {window.module = module; module = undefined;}</script>
    <script     src='/Applications/www/views/assets/js/jquery.min.js'></script>
    <script     src='/Applications/www/views/assets/js/responsivevoice.js'></script>
    <script     src='/Applications/www/views/assets/js/annyang.min.js'></script>
    <script     src="/Applications/www/views/assets/plugins/aplayer/APlayer.min.js"></script>
    <script     src='/Applications/www/views/assets/js/screenfull.js'></script>
    <script     src='/Applications/www/views/assets/plugins/screensaver/screensaver.js'></script>
    <script>    var IP = "127.0.0.1" </script>
    <script     src="/Applications/www/views/assets/js/index.js"></script>
    <script>if (window.module) module = window.module;</script>

</body>
</html>
