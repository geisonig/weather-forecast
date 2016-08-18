angular.module('weatherApp', []).controller('WeatherController', WeatherController);

function WeatherController($scope, $http, $log) {

	$scope.forecastWeather = function(isValid) {
		if (isValid) {
    var url = 'http://api.openweathermap.org/data/2.5/forecast';
    //Chamada passando os parâmetros, como nome da cidade, idioma, sistema métrico e key do openweathermap
    $http.jsonp(url, { params : {
    	APPID : '6256b0c1a1a628d667af1c34e93319f8',
        q : $scope.city,
        units : 'metric',
        lang : 'pt',
        callback: 'JSON_CALLBACK'
      }}).
      success(function(data, status, headers, config) {
      	//Pega os dados da previsão mais próxima e da previsão após 24 horas, além de marcar success true para mostrar os dados e mostrar o nome da cidade e país
      	$scope.cityName = data.city.name;
      	$scope.country = data.city.country;
      	$scope.weatherNow = data.list[0];
      	$scope.weatherTomorrow = data.list[8];
      	$scope.success = true;
      }).
      error(function(data, status, headers, config) {
      	//Log dos erros
        $log.error('Não foi possível obter os dados de ' + url);

      });
      } else {
      	$scope.success = false;
      }
	
	}
}

