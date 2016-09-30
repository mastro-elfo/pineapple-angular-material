;(function(window){
	'use strict';
	
	angular.module('pineapple', ['ngSanitize', 'ngMaterial'])
		.controller('Pineapple', function($scope, $http, $sce){
			$scope.trustSrc = function(src) {
				return $sce.trustAsResourceUrl(src);
			}
			
			var self = this;
			
			self.data = {
				default: '',
				pages: []
			};
			
			self.select = function(id){
				angular.forEach(self.data.pages, function(page){
					page.selected = (page.id == id);
					if(page.selected) {
						console.info('Page selected: '+page.id);
						page.url = page._url;
					}
				});
			};
			
			self.getSelected = function(){
				var selected = null;
				angular.forEach(self.data.pages, function(page){
					if(page.selected) {
						selected = page;
					}
				});
				return selected;
			};
			
			$http.get('config/pages.json')
				.then(function(json){
					console.info('Loaded config');
					self.data = json.data;
					self.select(self.data.default);
				})
				.catch(function(response){
					console.error('Error: '+response);
				});
		})
		
		.controller('Menu', function(){
			var self = this;
			self.isOpen = false;
			self.open = function(){
				self.isOpen = true;
			};
			self.close = function(){
				self.isOpen = false;
			};
			self.toggle = function(){
				self.isOpen?
					self.close():
					self.open();
			};
		})
	;
})(window);