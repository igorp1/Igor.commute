<?php
if($_SERVER["HTTPS"] == null){
  header( 'Location: https://igordepaula.com/projects/igor.commute/' ) ;
}
?>
<html ng-app="igor.commute">

    <head>
        <title>-- igor.commute --</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" href="styles.css">
        <link href="https://fonts.googleapis.com/css?family=Space+Mono" rel="stylesheet">
		
		<!-- https please -->
		
		
		<!-- iOS ready setup... because I have an iPhone -->
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		<meta name="apple-mobile-web-app-title" content="igor.commute">
		
		<link rel="apple-touch-icon" sizes="152x152" href="_res/apple-icon-152x152.jpeg">
		<link rel="apple-touch-icon" sizes="180x180" href="_res/apple-icon-180x180.jpeg">
		<link rel="apple-touch-icon" sizes="167x167" href="_res/apple-icon-167x167.jpeg">
		
		<link rel="apple-touch-startup-image" href="_res/apple-touch-startup-image.png">
		
    </head>

    <body style="background-color:black">
        <div ng-controller="showETAController">
			
            <div class="app-header">
                <img src="https://www.emojibase.com/resources/img/emojis/apple/x1f689.png.pagespeed.ic.qFS5hyE2k4.png">
                <span ng-click="init()">igor.commute</span>
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/83/Emergency_Light.gif" class="alert" style="display:none">
            </div>
			
			<div class="eta-display-loading" > </div> 
			
			<ul class=eta-display-container>
				
				<li ng-repeat="x in Stations" style="background-color:{{x.color}}; top:{{ 6.5 + $index*25 }}vh" class="eta-display">
					
					<!-- Display the ETAs -->
					<ul>
						<li ng-show="x.trip == undefined && !x.loading" style="font-size:2em;margin-top: .4em;margin-bottom: .35em">No trains @</li>
						<li ng-show="x.loading" style="font-size:2em; margin-top: .4em;margin-bottom: .35em">Loading...</li>
						<li ng-repeat="t in x.trip | limitTo:'4'" ng-hide"seconds2Minutes(t.pre_away) == 0">
							{{ seconds2Minutes(t.pre_away) }}
							<span ng-hide="$last"> >> </span> 
						</li>
					</ul>
				
					<span ng-show="x.trip.length > 0" ng-cloak>minutes away from</span>
					<h2 class="station">{{x.placeName}} ({{ x.route_id }})</h2> 
					<h2 class="direction">{{x.direction}}</h2>
				</li>
				
				<br><br><br><br><br><br><br>
			</ul>
		   
        </div>
    
    
    
    
    </body>

</html>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.1/angular.min.js"></script>
<script type="text/javascript" src="app.js"></script>
<!--
Notes:

 - When I first get into the app, I want to see the ETA to my favorite station (forest hills - orange line)
 - There are basically 2 main control areas. The top, which displays ETA and the bottom which lets you choose different stops.
    
 - Here's the basic mockup: https://goo.gl/gdGkIf


-->