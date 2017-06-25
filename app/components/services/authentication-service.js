(function(){
	angular
		.module('nameApp')
			.factory('AuthenticationService', ['$rootScope', '$http', '$localStorage', 'apiUrl', function($rootScope, $http, $localStorage, apiUrl){
				this.Login = function(user, callback) {

					var roles = {
						admin: [{
							name: 'admin',
							password: '1'
						}],
						user: [{
							name: 'user',
							password: '1'
						}]
					};
					for(role in roles) {
						var item = roles[role];
						for(var i=0; i< item.length; i++) {
							if (user.username === item[i].name && user.password === item[i].password) {
								callback(true);
								return;
							} else {
								callback(false);
							}
						}
					}
				};
				this.Logout = function(){					
					$rootScope.appConfig.user = false;
				};
				var service = {
					Login: this.Login,
					Logout: this.Logout
				};
				return service;
		}])
}());