(function(){
	angular.module('nameApp')
		.controller('mapCtrl', ['$http', 'leafletData', '$interval','$rootScope','$scope', '$window', '$routeParams', '$timeout', '$localStorage', 'apiUrl', 'baseFunc', 'dataService', function($http, leafletData, $interval, $rootScope, $scope, $window, $routeParams, $timeout, $localStorage, apiUrl, baseFunc, dataService){

			angular.extend($scope, {
				libreville: {
					lat: 0.504503980130774,
					lng: 9.408579986073635,
					zoom: 15
				},
				controls: {
					scale:{},
					search: {}
				},
				layers: {
					baselayers: {
						osm: {
							name: 'Layers:',
							url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
							type: 'xyz',
							layerOptions: {
								mapid: 'lf-map'
							},
							layerParams: {
								showOnSelector: false
							}
						}
					},
					overlays: {},
				}
			});

			for (layer in apiUrl.layersGeoJSON) {
				var layerConfig = apiUrl.layersGeoJSON[layer];
				loadLayers(layerConfig, layer);
			};

			function loadLayers(layerConfig, layerName) {
				dataService.getData(layerConfig.url + '.geojson')
					.then(function (response) {
						angular.extend($scope.layers.overlays, {
							[layerName]: {
								name: layerConfig.name,
								type: 'geoJSONShape',
								data: response.data,
								visible: true,
								marker: {},
								layerOptions: {
									style: {
										radius: 5,
										color: layerConfig.color,
										fillColor: layerConfig.bgc,
										weight: 1.0,
										opacity: 0.8,
										fillOpacity: 0.4,
									},
								}
							}
						});

					}, function (error) {
						throw dataService.catchError(error, 'Ajax call error massege!');
					});
			};

			leafletData.getLayers().then(function(baselayers) {
				angular.extend($scope.controls, {
					search: {
						propertyName: 'BuildingID',
						marker: false,
						layer: baselayers.overlays.drop,
						moveToLocation: function (latlng, title, map) {
							//map.fitBounds( latlng.layer.getBounds() );
							var zoom = map.getBoundsZoom(latlng.layer.getBounds());
							map.setView(latlng, zoom); // access the zoom
						}
					}
				});
			});

	}]);
}());