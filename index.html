<!DOCTYPE html>

<html>
    <head>
        <meta charset="utf-8">
        <title>Recording Stream Demo</title>

        <script src="webrtc-adapter.min.js"></script>
        <script src="janus.js"></script>
        <script src="eyeride-webrtc.js"></script>
        <script src="apiLib.js"></script>
    </head>
    <body>
        <div id="pendingContainer" style="position: fixed; top: 0;bottom: 0; left: 0;right: 0; z-index: 100001; display: block; background: white;">
            <label style="position: absolute; top: 50%; left: 50%; margin-top: -50px; margin-left: -50px;">LOADING...</label>
        </div>
        <div id="loginErrorContainer" style="position: fixed; top: 0;bottom: 0; left: 0;right: 0; z-index: 100001; display: none; background: white;">
            <Label style="position: absolute; top: 50%; left: 50%; margin-top: -50px; margin-left: -50px;">CANCELLED</Label>
        </div>
        <div id="loginContainer" class="auth_container" style="position: fixed; top: 0;bottom: 0; left: 0;right: 0; z-index: 100000; display: block; background: white;">
            <div style="position: absolute; top: 50%; left: 50%; margin-top: -50px; margin-left: -50px; width: fit-content; height: fit-content;">
                <form id="loginForm" method="POST" action="#">
                    <div class="form-group">
                        <input required="" id="username" name="username" autofocus="" id="username" type="text" class="form-control" placeholder="Username" maxlength="100">
                    </div>
                    <div class="form-group" style="margin-bottom: 10px;">
                        <input required="" id="password" name="password" type="password" class="form-control" placeholder="Password" maxlength="100" autocomplete="off">
                    </div>
                    <!-- <div class="text-right forgot-password">
                        <a href="/Account/ForgotPassword" ng-disabled="pending">Forgot password?</a>
                    </div> -->
                    <div class="sign-in-btn form-group" style="margin-top: 8px;">
                        <!-- <button type="submit" id="loginButton" class="form-control sign-in dib">Sign In</button> -->
                        <input type="submit" id="loginButton" class="form-control sign-in dib">
                    </div>
                </form>
            </div>
        </div>
        <div class="videoBlock">
            <video id="recordingStreamVideo" width="640" height="480" autoplay controls muted></video>
        </div>
        <div class="controlsBlock">
            <select id="vehiclesList" class="list">
                <option>No vehicles</option>
            </select>
            <select id="camerasList">
                <option>No cameras</option>
            </select>
            <button id="playButton">play</button>
        </div>
        <script>
            // var clientId = '00000000-0000-0000-0000-000000000000';
            var clientId = '55dbdec8-4b4a-4a04-a5ad-b1010bd6f4b7'; // This is fms id

            var username = '';
            var password = '';

            var eyeRideWebRTC;
            var streamProxy;

            var _apiLib;

            var testVehicleId = '3577';

            var _vehicles =[];
            var _cameras;

            var camera = {
                id: '7490',
                type: 'NVS',
                name: 'Test NVS Camera'
            };
            var cameras;

            var selectedLiveRecord = {
                cameraId: camera.id,
                startTime: '20200421T120000Z' // UTC time.
            };

            var videoElement = document.getElementById('recordingStreamVideo');
            var vehiclesListElement = document.getElementById('vehiclesList');
            var camerasListElement = document.getElementById('camerasList');
            var loginFormElement = document.getElementById('loginForm');
            var pendingContainerElement = document.getElementById('pendingContainer');
            var loginContainerElement = document.getElementById('loginContainer');
            var loginErrorContainerElement = document.getElementById('loginErrorContainer');

            
            function showErrorMessage(message) {
                loginErrorContainerElement.firstElementChild.textContent = message;
                loginErrorContainerElement.style.display = 'block';
            }

            /*videoElement.oncanplay = function (event) {
                console.log("canplay ", event);
            };
            videoElement.onemptied = function (event) {
                console.log("emptied ", event);
            };
            videoElement.onerror = function (event) {
                console.log("error ", event);
            };
            videoElement.onwaiting = function (event) {
                console.log("waiting ", event);
            };
            videoElement.onloadstart = function (event) {
                console.log("loadstart ", event);
            };
            videoElement.onloadeddata = function (event) {
                console.log("loadeddata ", event);
            };
            videoElement.onstalled = function (event) {
                console.log("stalled! ", event);
            };*/
            /*videoElement.onprogress = function (event) {
                console.log("progress ", event);
            };*/

            var streamHandler = {
                onStreamError: function () {
                },

                onStreamMessage: function (msg) {
                    console.log('Stream Message ', msg);
                    
                    if (msg.error_code) {
                        console.log('Stream error: ' + msg.error);
                    
                        if (msg.error_code === 458) {
                            streamProxy.switchMountpoint(selectedLiveRecord.streamId);
                            streamProxy.startStream(selectedLiveRecord.streamId);
                        }

                        if (msg.error_code === 455) {
                            console.log("Sorry, no such stream.");
                            showErrorMessage("Sorry, no such stream.");
                        }
                    }
                },

                onStream: function (stream) {
                    // debugger;
                    console.log("onStream fire!");
                    //videoElement.src = '';
                    Janus.attachMediaStream(videoElement, stream);
                    videoElement.play();
                    /*var playPromise = videoElement.play();

                    if (playPromise !== undefined) {
                        playPromise.then(some => {
                            console.log("-> playPromise done!");
                        })
                        .catch(error => {
                            //videoElement.play();
                            console.log("-> playPromise error! ", error);
                        });
                    } else {
                        console.log("-> play promise undefined");
                    }*/
                },

                onStreamCleanUp: function () {
                    console.log('Stream cleanUp');
                },

                /*onNewSessionCreated: function (streamInfo) {
                    console.log('Remote session created ');

                    // Save ports
                    selectedLiveRecord.camsports = [
                        streamInfo.stream.video_port ? streamInfo.stream.video_port.toString() : '',
                        streamInfo.stream.audio_port ? streamInfo.stream.audio_port.toString() : ''
                    ];

					var camPorts = camera.hasAudio
						? selectedLiveRecord.camsports
                        : [ selectedLiveRecord.camsports[0] ];
                    
                    // Start stream from selected camera through the Janus server
                    eyeRideWebRTC.startLiveRecord(
                        accessToken,
                        selectedLiveRecord.cameraId,
                        selectedLiveRecord.startTime,
                        camPorts
                    )
                    .then(function (response) {
                        console.log('Started streaming from the camera: ', response);

                        selectedLiveRecord.pid = response.pid; //Save pid
                        streamProxy.startStream(selectedLiveRecord.streamId);
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
                },*/

                onCameraRegistered: function (result) {
                    console.log("onCameraRegistered ", result);
                    streamProxy.startStream(camera.id);
                },

                onExisingSessionDetected: function (streamInfo) {
                    console.log("ExisingSessionDetected");
                }
            };

            // The actual stream initialization.
            initEyeRideWebRTC().then(function (eyeRide) {
                eyeRideWebRTC = eyeRide;
                
                eyeRideWebRTC.init().then(function () {
                    console.debug('Initialized');
                    pendingContainerElement.style.display = "none";

                });

                document.getElementById("playButton").onclick = function (event) {
                    console.log("play clicked");
                    eyeRideWebRTC.createLiveVideoProxy(accessToken ,streamHandler)
                            .then(function (proxy) {
                                console.log("live Proxy created! ");
                                streamProxy = proxy;
                                proxy.registerCamera(camera);

                                /*selectedLiveRecord.streamId =
                                    eyeRideWebRTC.createStreamId(selectedLiveRecord.cameraId);*/

                                /*eyeRideWebRTC
                                    .getLiveRecordPorts(selectedLiveRecord.cameraId)
                                    .then(function (newPorts) {
                                        if (!newPorts) {
                                            console.log('Error getting ports!');
                                            return;
                                        }

                                        console.log('Received ports: ', newPorts);
                                        eyeRideWebRTC.checkLiveRecordStream(
                                            accessToken,
                                            selectedLiveRecord.cameraId
                                        )
                                        .then(function(res) {
                                            streamProxy.checkIfExists(selectedLiveRecord.streamId)
                                                .then(function (exists) {
                                                    if (!exists) {
                                                        // Start streaming from camera
                                                        streamProxy.createNewSession(
                                                            selectedLiveRecord.streamId,
                                                            camera.hasAudio,
                                                            newPorts[0],
                                                            newPorts[1]
                                                        );
                                                    }
                                                    else {
                                                        console.log('Recreating session');
                                                        
                                                        eyeRideWebRTC.recreateLiveRecordSession(
                                                            accessToken,
                                                            selectedLiveRecord.streamId,
                                                            camera,
                                                            newPorts,
                                                            streamProxy
                                                        )
                                                        .catch(function (err) {
                                                            console.log(err);
                                                        });
                                                    }
                                                });
                                            })
                                        .catch(function() {
                                            console.log("WRONG WITH PROXY!");
                                            streamProxy
                                                .destroyIfExists(selectedLiveRecord.streamId)
                                                .then(function () {
                                                    streamProxy.createNewSession(
                                                        selectedLiveRecord.streamId,
                                                        camera.hasAudio,
                                                        newPorts[0],
                                                        newPorts[1]
                                                    );
                                                })
                                                .catch(function (err) {
                                                    console.log(err);
                                                });
                                        });
                                    })
                                    .catch(function() {
                                        console.log('Error getting ports!');
                                    });*/
                            })
                            .catch(function (error) {
                                console.log("Proxy error ", error);
                            });
                };

                loginFormElement.onsubmit = function (event) {
                    //event.stopPropagation();
                    event.preventDefault();
                    console.log('on submit clicked');
                    if (event.target.reportValidity()) {
                        username = event.target['username'].value;
                        password = event.target['password'].value;
                        pendingContainerElement.style.display = "block";

                        eyeRideWebRTC.authenticate(clientId, username, password)
                        .then(function (x) {
                            accessToken = x.access_token;
                            console.debug('Authenticated');
                            loginContainerElement.style.display = "none";
                            initApiLib(accessToken);
                        })
                        .catch (err => {
                            console.log("Login error!", err);
                            loginErrorContainerElement.style.display = "block";
                            pendingContainerElement.style.display = "none";
                        })
                        .finally (() => {
                            event.target['username'].value = '';
                            event.target['password'].value = '';
                            //pendingContainerElement.style.display = "none";
                        });
                    }
                }

                function initApiLib (accessToken) {
                    _apiLib = ApiLib(accessToken);
                    console.log('apiLib rdy');
                    _apiLib.getVehicles().then(vehicles => {
                        var vehiclesIds=[];
                        console.log("vehicles ", vehicles);
                        //_vehicles = vehicles;
                        vehicles.forEach(vehicle => {
                            /*var option = document.createElement('option');
                            option.text = vehicle.vehicleShortName;
                            option.value = vehicle.vehicleId;
                            vehiclesListElement.add(option);*/
                            vehiclesIds.push(vehicle.vehicleId);
                        });
                        console.log("veh ids ", vehiclesIds);
                        _apiLib.getCamerasByVehiclesIds(vehiclesIds).then(cameras => {
                            console.log("got cameras! ", cameras);
                            _cameras = cameras;
                            vehicles.forEach(vehicle => {
                                if (_cameras[vehicle.vehicleId]) {
                                    var option = document.createElement('option');
                                    option.text = vehicle.vehicleShortName;
                                    option.value = vehicle.vehicleId;
                                    _vehicles.push(vehicle);
                                    vehiclesListElement.add(option);
                                }
                            });
                            vehiclesListElement.onchange = function (event) {
                                var vehicleId = event.srcElement.value;
                                camerasListElement.length = 0;
                                var vehicleCameras = _cameras[vehicleId]
                                vehicleCameras.forEach (function (vehicleCamera, id) {
                                    var camOption = document.createElement('option');
                                    camOption.text = vehicleCamera.name;
                                    camOption.value = id;
                                    camerasListElement.add(camOption);
                                });
                                camerasListElement.dispatchEvent(new Event("change"));
                            }
                            camerasListElement.onchange = function (event) {
                                camera = _cameras[vehiclesListElement.value][event.srcElement.value];
                                console.log("camera set as ", camera);
                                selectedLiveRecord = {
                                    cameraId: camera.id,
                                    startTime: getStartTime() // UTC time.
                                };
                            };
                            pendingContainerElement.style.display = "none";
                        });

                    });
                }

                loginErrorContainerElement.onclick = function (event) {
                    event.target.style.display = 'none';
                };


                function getStartTime() {
                    var date = new Date(Date.now() - 60000);
                    var yyyy = date.getUTCFullYear();
                    var MM = addZero(date.getUTCMonth() + 1);
                    var dd = addZero(date.getUTCDate());
                    var hh = addZero(date.getUTCHours());
                    var mm = addZero(date.getUTCMinutes());
                    var ss = addZero(date.getUTCSeconds());
                    var fullTime = yyyy.toString() + MM + dd + 'T' + hh + mm + ss + 'Z';
                    console.log("start time =", fullTime);
                    return fullTime;
                }

                function addZero (num) {
                    return (num >= 0 && num < 10) ? "0" + num : num;
                }

                console.log("play event added");
            });
        </script>
    </body>
</html>