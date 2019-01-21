angular.module('daniloTeste').controller('FormularioController', function($scope, $http) {
	
	$scope.riscos = [{tipo: "A", valor: 0}, {tipo: "B", valor: 10}, {tipo: "C", valor: 20}];

	$scope.salvarPessoa = function(){
		var pessoa = JSON.stringify({cpf: $scope.cpf, nomeCompleto: $scope.nomeCompleto});
		$http.post("http://localhost:8080/pessoas/salvar", pessoa).
	    success(function(data, status) {
	    	var taxa = JSON.stringify({cpf: data.cpf, limiteCredito: $scope.credito, tipoRisco: $scope.defineTaxa($scope.risco)});
	    	$http.post("http://localhost:8081/taxas/salvar", taxa).
			success(function(data, status) {
				alert('Informações salvas com sucesso');	  
			});
	    });
	}

	$scope.calcularTaxa = function(){
		if(($scope.risco != 0 && $scope.risco != null) && ($scope.credito != 0 && $scope.credito != null)){
			$http.get("http://localhost:8082/calculos?credito=" + $scope.credito + "&taxa=" + $scope.risco).
			success(function(data, status){
				if($scope.risco != 0){
					alert('Seu crédito acaba de ser calculado com acréscimo de ' + $scope.risco + '%');
					$scope.credito = data;
				}
			});
		}
	}
	
	$scope.defineTaxa = function(risco){
		switch (risco) {
		case "0":
			return "A";
		case "10":
			return "B";
		case "20":
			return "C";
		default:
			break;
		}
	}
	
	$scope.buscaPessoa = function(){
		$http.get("http://localhost:8080/pessoas/cpf/" + $scope.cpf).
		success(function(data, status){
			if(data != null && data != ''){
				alert('Você já possui cadastro, vamos carregar seus dados pessoais e seus créditos recentes');
				$scope.nomeCompleto = data.nomeCompleto;
				$http.get("http://localhost:8081/taxas/cpf/" + $scope.cpf).
				success(function(dataTaxa, statusTaxa){
					if(dataTaxa != null && dataTaxa != ''){
						$('#table').bootstrapTable({
					        data: dataTaxa
					    });
					}
				});
			}
		});
	}
});
