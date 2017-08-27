/******** CONSTANTS **********/
var _colors = {
    "Orange": "#FF9728",
    "Green": "#3BE889",
    "Blue": "#439DFF",
    "Red": "#E84E42",
    "Purple": "#B458FF"
}
var _favoritePlace = "place-forhl"
var _favoritePlaceName = "Forest Hills"
var _favoriteDirection = "Northbound"

// here's the possibilities:
/*

route_id = Green-B
route_id = Green-C
route_id = Green-D
route_id = Green-E

route_id = Blue

route_id = Orange


route_id = Red



*/

var PlacesArray = [
	{
		'placeName'	:'Forest Hills', 
		'place'		:'place-forhl',
		'direction'	:'Northbound', 
		'route_id' 	: 'Orange',
		'color'		: _colors.Orange
	},
	{
		'placeName'	:'State Street',
		'place'		:'place-state',
		'direction'	:'Southbound',
		'route_id' 	: 'Orange',
		'color'		: _colors.Blue
	},
	{
		'placeName'	:'Downtown Crossing',
		'place'		:'place-dwnxg',
		'direction'	:'Southbound',
		'route_id' 	: 'Orange',
		'color'		: _colors.Red
	}
];


var secureHttpGetLink = "https://igordepaula.com/secure_fetch.php?url=";
/*****************************/

var app = angular.module("igor.commute", []);

app.config(function(){ console.info("igor.commute has been successfully configured.") })
app.run(function($rootScope){  
    console.info("igor.commute is now running.") 
})

app.controller("showETAController", function($scope, $rootScope,MBTAService){
    
    function init(){
        
		$rootScope.Stations = new Array(PlacesArray.length);
		
		$scope.loading = false;
		
		for(var ii =0; ii < PlacesArray.length; ii++){
			
			$rootScope.Stations[ii] = {}
			
			$rootScope.Stations[ii].place = PlacesArray[ii].place
			$rootScope.Stations[ii].placeName = PlacesArray[ii].placeName
			$rootScope.Stations[ii].direction = PlacesArray[ii].direction
			$rootScope.Stations[ii].route_id = PlacesArray[ii].route_id
			$rootScope.Stations[ii].color = PlacesArray[ii].color
			
	        loadETA( $rootScope.Stations[ii].place, 
	                 $rootScope.Stations[ii].direction, 
	                 $rootScope.Stations[ii].route_id,
					 ii);
			
		}
		
        
        
        console.info("showETAController initialized.");
    }
    
	$scope.init = init;
    
    $scope.seconds2Minutes = function(s){ return Math.floor(s/60); }
    
    
    function loadETA(place, direction, route, index, mode_name="Subway"){
		
		$rootScope.Stations[index].loading = true;
        MBTAService.getETAs(place).then(
            function(r){
                
                for(var i = 0; i < r.data.mode.length;i++ )
                {
                    if( r.data.mode[i].mode_name == mode_name )
                    { 
                        for(var j = 0; j < r.data.mode[i].route.length; j++) 
                        {  
                            if(r.data.mode[i].route[j].route_id == route)
                            {
                                for(var k = 0; k < r.data.mode[i].route[j].direction.length; k++)
                                {
                                    if( r.data.mode[i].route[j].direction[k].direction_name == direction)
                                    {
                                        // finally found what I was looking for!
                                        $rootScope.Stations[index].trip = r.data.mode[i].route[j].direction[k].trip; 
                                    }
                                }
                            }
                            
                        } 
                    }
                }
                // done loading:
				$rootScope.Stations[index].loading = false;
            },
            function(r){
                console.error("[MBTAService.getETAs] failed! 0>--<0")
				console.error(r.data)
            }
        )
    }
    
    //initialize controller! \(0_0)/
    init();
})

app.controller("pickETAController", function($scope, MBTAService){
    
    function init(){
        console.info("pickETAController initialized.");
    }
    
    //initialize controller! \(0_0)/
    init();
    
});


app.service("MBTAService", function($http){
    
    
    this.getETAs = function(place){ 
		var url = "http://realtime.mbta.com/developer/api/v2/predictionsbystop?api_key=wX9NwuHnZU2ToO7GmGR9uw&format=json&stop="+place;
        return $http.get(secureHttpGetLink + escape(url))
    }
    
    this.getLine = function(stopID){
		var url = "http://realtime.mbta.com/developer/api/v2/stopsbyroute?api_key=wX9NwuHnZU2ToO7GmGR9uw&route="+stopID+"&format=json"
        return $http.get(secureHttpGetLink + escape(url));
    }
    
})
