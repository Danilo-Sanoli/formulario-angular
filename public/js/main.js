angular.module('daniloTeste', ['ngAnimate', 'ngRoute', 'ngResource'])
	.config(function($routeProvider, $locationProvider) {

		$locationProvider.html5Mode(true);

		$routeProvider.when('/cadastro', {
			templateUrl: 'partials/principal.html',
			controller: 'FormularioController'
		});


		$routeProvider.otherwise({redirectTo: '/cadastro'});

	});
