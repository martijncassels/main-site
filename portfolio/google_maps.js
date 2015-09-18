(function() {
	var googlemaps = angular.module('google-maps', []);
    
    googlemaps.controller('Map', ['$scope', function ($scope) {
    
    var MY_MAPTYPE_ID = 'fietsroute_stijl';
    
    var mapOptions = {
        zoom: 13,
        center: new google.maps.LatLng(51.3934791, 4.3332072),
        mapTypeControlOptions: {
			mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
			},
		mapTypeId: MY_MAPTYPE_ID
		}
    
    var featureOpts = [
    {
      stylers: [
        { visibility: 'simplified' },
        { gamma: 0.5 },
        { weight: 0.5 }
      ]
    },
    {
	  featureType: 'road.local',
      elementType: 'geometry.fill',
      stylers: [
        { color: '#0af503' },
		{ weight: 1 },
		{ lightness: 50 }
      ]
    }
	];

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    
    var styledMapOptions = {
    name: 'Fietsroute Stijl'
	};

	var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

	$scope.map.mapTypes.set(MY_MAPTYPE_ID, customMapType);
    
    var directionsDisplay = new google.maps.DirectionsRenderer({draggable: true});

	var directionsService = new google.maps.DirectionsService();
	
	directionsDisplay.setMap($scope.map);
	
	directionsDisplay.setPanel(document.getElementById('routeBeschrijving'));
	
	google.maps.event.addListener(directionsDisplay, 'directions_changed');

    $scope.markers = [];
    
    var infoWindow = new google.maps.InfoWindow();
    
    var creeerMarker = function (locatie){
        
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(locatie.lat, locatie.long),
            title: locatie.naam
        });
        marker.content = '<div class="infoWindowContent">' + locatie.omschrijving + '</div>';
        
        google.maps.event.addListener(marker, 'click', function(){
            //infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            infoWindow.setContent('<h2 class="text-center">' + marker.title + '</h2><div class="row"><div class="col-md-6"><img class="img-thumbnail img-responsive" style="width:80%" src="' + locatie.fotos[0] + '"</img></div><div class="col-md-6">' + marker.content + '</div></div><div class="clearfix"></div>');
            infoWindow.open($scope.map, marker);
            $scope.map.setZoom(14);
        });
        
        $scope.markers.push(marker);
        
    }
    
    $scope.$parent.calcRoute = function (order) {
	  infoWindow.close();
	  var start = order[0].locatie;
	  var end = order[0].locatie;
	  var waypts = [];
	  for (var i in order){
		  var gang = order[i];
		  if (gang.naam !== "") {
			  waypts.push({location:gang.locatie,stopover:true});
		  }
		  i++;
	  }
	  var request = {
		  origin:start,
		  destination:end,
		  waypoints: waypts,
		  optimizeWaypoints: true,
		  travelMode: google.maps.TravelMode.BICYCLING
	  };
	  directionsService.route(request, function(response, status) {
		  //console.log(status);
		if (status == google.maps.DirectionsStatus.OK) {
		  directionsDisplay.setDirections(response);
		}
	  });
	}
    setTimeout(function () {
    for (i = 0; i < $scope.adressen.length; i++){ // Maakt markers aan vanuit $scope.adressen met vertraging; adressen worden verkregen door $http.get
        creeerMarker($scope.adressen[i]);
        $scope.$digest();
    }
	},1000);
    $scope.openInfoWindow = function(e, selectedMarker,i){
		$scope.$parent.locatie = i;
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }
    $scope.zetLocatie = function(i) {
		$scope.$parent.locatie = i;
	}
	$scope.closeInfowindow = function(e, selectedMarker, i) {
		e.preventDefault();
		infoWindow.close();
	}
}]);

})();
