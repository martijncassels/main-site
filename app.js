(function() {
	var app = angular.module('siteApp', []);	
  
  app.controller('SiteCtrl', ['$scope', function($scope) {
	$scope.home = "Thuis";
	$scope.tekst = [{
		titel: "Portfolio",
		tekst: "Hier komt tekst voor portfolio."
	},{
		titel: "Leeg",
		tekst: "Hier komt tekst voor..."
	}];
	
	this.tab = 1;

	this.isSet = function(checkTab) {
		return this.tab === checkTab;
	};

	this.setTab = function(setTab) {
		this.tab = setTab;
	};
	
  }]);
  
	
})();
