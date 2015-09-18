(function() {
	var fietsroutes = angular.module('controllers', []);	
  
  fietsroutes.controller('RoutesController', ['$scope','$http', function($scope,$http) {
	$scope.adressen = [];
	$scope.routes = {};
    $scope.procent = 0;
    $scope.locatie = 0;
    $scope.order = {
		0: {soort: "start",naam: "",locatie: ""},
		1: {soort: "voorgerecht",naam: "",locatie: ""},
		2: {soort: "tussengerecht",naam: "",locatie: ""},
		3: {soort: "hoofdgerecht",naam: "",locatie: ""},
		4: {soort: "nagerecht",naam: "",locatie: ""}
		};
	$http.get('./adressen.json').success(function(data){
		$scope.adressen = data;
	}).error(function(){
		alert('Error!\nKan Adressen JSON data niet ophalen');
	});
	
	/*$http.jsonp('http://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key=AIzaSyB4MUQwJdQj-X8GKiO13_BlplurgMImamY').
	  success(function(routes, status) {
		// this callback will be called asynchronously
		// when the response is available
		console.log('success ');
	  }).
	  error(function(status) {
		// called asynchronously if an error occurs
		// or server returns response with an error status.
		console.log('error! ' + status);
	  });*/

	
	$scope.checkReserveringKnop = function (procent) { // minimaal 1 gang en een startadres en dan pas knop weergeven om te bevestigen
		return procent >= 20 && $scope.order[1]['naam'] !== "";
	}
	$scope.reserveren = function() { // order bevestigen || nog afmaken
		alert('Bevestigd!');
	}
	$scope.checkGang = function(gang) {
		return gang !== "";
	};
	
  }]);

  fietsroutes.controller('TabController', ['$scope', function($scope) {
    this.tab = 1;

    this.isSet = function(checkTab) {
      return this.tab === checkTab;
    };

    this.setTab = function(setTab) {
      this.tab = setTab;
    };
    
    this.selecteerGang = function(geselecteerd,adres) {
		$scope.order[geselecteerd]['naam'] = adres.naam;
		$scope.order[geselecteerd]['locatie'] = adres.locatie;
		$scope.$parent.procent = 0;
		for (var i in $scope.order){
		  var gang = $scope.order[i];
		  if (gang['naam'] !== "") {
			  $scope.$parent.procent += 20;
		  }
		  i++;
	  }
	};
	
  }]);

  fietsroutes.controller('GalleryController', function(){
    this.current = 0;

    this.setCurrent = function(imageNumber){
      this.current = imageNumber || 0;
    };
  });
  
  fietsroutes.controller('GangenController', ['$scope', function($scope){
    
    $scope.adresToevoegen = function(adres,gang) {
		$scope.order[gang]['naam'] = adres.naam;
		$scope.order[gang]['locatie'] = adres.locatie;
		$scope.$parent.procent = 0;
		for (var i in $scope.order){
		  var gang = $scope.order[i];
		  if (gang['naam'] !== "") {
			  $scope.$parent.procent += 20;
		  }
		  i++;
	  }
	};

  }]); 

  fietsroutes.controller('ReactieController', function(){

    this.reactie = {};

    this.reactieToevoegen = function(adres){
		this.reactie.aangemaakt = Date.now();
		adres.reacties.push(this.reactie);
		this.reactie = {};
    };
  }); 
 

})();
