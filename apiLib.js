var ApiLib = function (token) {

	var apiHost = "https://eyeridefms.com";
	var apiCameras = "";
	var apiVehicles = "";

	var apiGetCamerasByVehicleId = "/api/video/";
	var apiGetCamerasByVehiclesIds = "/api/video/sources";
	var apiGetAllVehicles = "/api/vehicles/assigned_short";

	var _authToken = token;

	var getCamerasByVehicleId = function (vehicleId) {
		var url = apiHost + apiGetCamerasByVehicleId + vehicleId + "/sources";
		var options = {
			headers : {
				Authorization: 'Bearer ' + _authToken
			}
		};
		return fetch(url, options)
  			.then(response => response.json());
  			//.then(result => console.log(result));
	}

	var getCamerasByVehiclesIds = function (vehiclesIds) {
		var url = apiHost + apiGetCamerasByVehiclesIds;
		var options = {
			method : 'POST',
			headers : {
				Authorization: 'Bearer ' + _authToken,
				'Content-Type': 'application/json'
			},
			body : JSON.stringify(vehiclesIds)
		};
		return fetch(url, options)
  			.then(response => response.json());
  			//.then(result => console.log(result));
	}

	var getVehicles = function () {
		var url = apiHost + apiGetAllVehicles;
		var options = {
			headers : {
				Authorization: 'Bearer ' + _authToken
			}
		};
		return fetch(url, options)
  			.then(response => response.json());
  			//.then(result => console.log(result));
	}

	return {
		getCamerasByVehicleId : getCamerasByVehicleId,
		getCamerasByVehiclesIds : getCamerasByVehiclesIds,
		getVehicles : getVehicles
	}
};