var initEyeRideWebRTC = function () {
    var _janusUrl = 'wss://stream.eyeridefms.com:8989/janus';
    var _eyeRideUrl = 'https://eyeridefms.com';
    // var _eyeRideUrl = 'http://localhost:58893';
    // var _eyeRideUrl = 'https://fms-stage.eyerideonline.com';

    var _createJanusMountPointId = function (id) {
        var result;
    
        if (id.indexOf(':') > -1) {
            var tokens = id.split(':');
            result = parseInt(tokens[0].toString() + (tokens[1].length > 1 ? tokens[1] : '0' + tokens[1]));
        }
        else {
            result = parseInt(id.toString() + '00');
        }
    
        return result;
    };

    var _authenticate = function (clientId, username, password) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            
            xhr.open('POST', _eyeRideUrl + '/oauth/token');
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            xhr.send('client_id=' + clientId
                + '&username=' + encodeURIComponent(username)
                + '&password=' + encodeURIComponent(password)
                + '&grant_type=password'
            );
        });
    };

    var _getVideoLiveStreamInfo = function (accessToken, sourceId) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            
            xhr.open('GET', _eyeRideUrl + '/api/video/' + encodeURIComponent(sourceId) + '/live');
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
            
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            xhr.send();
        });
    };

    var _getLiveRecordPorts = function (cameraId) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();

            xhr.open('POST', 'https://stream.eyeridefms.com:9000/get-ports');
            xhr.setRequestHeader('Content-type', 'application/json');
            
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        // console.log(xhr.response);
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            xhr.send(JSON.stringify({ camid: cameraId }));
        });
    };

    var _startLiveRecord = function (accessToken, sourceId, startTime, camsPorts) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            
            var url = _eyeRideUrl + '/api/video/'
                + encodeURIComponent(sourceId)
                + '/liverecords/start';
            
            xhr.open('POST', url);

            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        console.log(xhr.response);
                        resolve(xhr.response);
                    } else {
                        reject(xhr.response);
                    }
                }
            };
            var data = JSON.stringify({
                startTime: startTime,
                camsports: camsPorts
            });
            xhr.send(data);
            /*xhr.send(JSON.stringify({
                startTime: startTime,
                camsports: camsPorts
            }));*/
        });
    };

    var _stopLiveRecord = function (accessToken, sourceId, pid) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            
            var url = _eyeRideUrl + '/api/video/'
                + encodeURIComponent(sourceId)
                + '/liverecords/stop';
            
            xhr.open('POST', url);

            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200 || xhr.status === 204) {
                        resolve(xhr.response);
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            xhr.send(JSON.stringify({ pid: pid }));
        });
    };
    
    var _getCurrentLiveRecord = function (accessToken, sourceId, startTime) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            
            var url = _eyeRideUrl + '/api/video/'
                + encodeURIComponent(sourceId)
                + '/liverecords/current';
            
            xhr.open('GET', url);

            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        console.log(xhr.response);
                        resolve(xhr.response);
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            xhr.send(JSON.stringify({ startTime: startTime }));
        });
    };

    var _checkLiveRecordStream = function (accessToken, sourceId) {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            
            var url = _eyeRideUrl + '/api/video/'
                + encodeURIComponent(sourceId)
                + '/liverecords/check';
            
            xhr.open('GET', url);

            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        var checkResult = xhr.responseText
                            ? JSON.parse(xhr.responseText)
                            : xhr.responseText;

                        if (!checkResult) {
                            reject();
                        }
                        else if (checkResult.pid === -1) {
                            reject();
                        }
                        else {
                            resolve(checkResult);
                        }
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            xhr.send();

            /*
            return $apiHttp.httpCall({
                method: 'GET',
                url: $apiHttp.combineUrl(
                    $rootScope.host,
                    'api/video/' + sourceId + '/liverecords/check'
                )
            });
            */

            /*
            //Check stream(GStreamer)
            VideoApiHttpService
                .checkStream($scope.selectedLiveRecord.cameraId)
                .then(function(checkResult) {
                    if (!checkResult) {
                        reject();
                    }
                    //
                    else if (checkResult.pid === -1) {
                        reject();
                    }
                    else {
                        resolve(checkResult);
                    }
                })
                .catch(function() {
                    reject();
                });
            */
        });
    };

    var _createStreamId = function (sourceId) {
        var camId = sourceId;
        var i = 0;
        var index = camId.indexOf(':');

        if (index > -1) {
            i = camId[index + 1];
            camId = camId.substr(0, index);
        }

        return camId * 100 + i;
    };

    var _recreateLiveRecordSession = function (accessToken, streamId, camera, ports, streamProxy) {
        return new Promise(function (resolve) {
            _checkLiveRecordStream(accessToken, camera.id)
                .then(function (checkResponse) {
                    _stopLiveRecord(accessToken, camera.id, checkResponse.pid)
                        .then(function () {
                            streamProxy
                                .destroyIfExists(streamId)
                                .then(function() {
                                    // Start new Janus session
                                    streamProxy
                                        .createNewSession(streamId,
                                            camera.hasAudio,
                                            ports[0],
                                            ports[1]
                                        );

                                    resolve();
                                });
                        });
                })
                .catch(function() {
                    streamProxy
                        .destroyIfExists(streamId)
                        .then(function () {
                            // Start new Janus session
                            streamProxy
                                .createNewSession(streamId,
                                    camera.hasAudio,
                                    ports[0],
                                    ports[1]
                                );
                        });

                });
        });
    };
    
    var _janusInitFactory = function () {
        var initializing = false;
        var initialized = false;
        var initializedSuccess = false;
        var initializers = [];
    
        return new Promise(function (resolve, reject) {
            if (initialized) {
                if (initializedSuccess) {
                    console.debug('eyeride-webrtc janus initialized: success');
                    resolve();
                }
                else {
                    reject();
                }
            }

            else {
                initializers.push(function (result) {
                    if (result) {
                        resolve();
                    }
                    else {
                        reject();
                    }
                });

                if (!initializing) {
                    initializing = true;

                    Janus.init({
                        debug: 'all',
                        callback: function () {
                            initializing = false;
                            initialized = true;
                            initializedSuccess = Janus.isWebrtcSupported();

                            if (!initializedSuccess) {
                                alert('No WebRTC support!');
                            }

                            initializers.forEach(function (it) {
                                it(initializedSuccess);
                            });
                        }
                    });
                }
            }
        });
    };

    var _createLiveVideoProxy = function (accessToken, callbacks) {
        var createProxyObject = function (janus, streaming) {
            return {
                getJanus: function () {
                    return janus;
                },

                getStreaming: function () {
                    return streaming;
                },

                registerCamera: function (camera) {
                    streaming.send({
                        message: {
                            request: 'info',
                            id: _createJanusMountPointId(camera.id)
                        },

                        success: function (result) {
                            if (!result || !result.info) {
                                _getVideoLiveStreamInfo(accessToken, camera.id)
                                    .then(function (liveStreamInfo) {
                                        streaming.send({
                                            message: {
                                                request: 'create',
                                                type: 'rtsp',
                                                id: _createJanusMountPointId(camera.id),
                                                description: camera.name + '(' + camera.type + ')',
                                                audio: camera.hasAudio > 0 ? true : false,
                                                video: true,
                                                url: liveStreamInfo.url,
                                                rtsp_user: liveStreamInfo.username,
                                                rtsp_pwd: liveStreamInfo.password,
                                                videofmtp: 'profile-level-id=42E01F\;packetization-mode=1'
                                            },

                                            success: function (result) {
                                                console.log('Janus "CREATE" request result: ', result);

                                                if (callbacks.onCameraRegistered) {
                                                    callbacks.onCameraRegistered();
                                                }
                                            }
                                        });
                                    });
                            }

                            else {
                                console.log('Camera already streaming');
                                if (callbacks.onCameraRegistered) {
                                    callbacks.onCameraRegistered();
                                }
                            }
                        }
                    });
                },

                startStream: function (streamId) {
                    streaming.send({
                        message: {
                            request: 'watch',
                            id: _createJanusMountPointId(streamId)
                        }
                    });
                },

                stopStream: function () {
                    streaming.send({
                        message: { request: 'stop' }
                    });

                    streaming.hangup();
                    streaming.detach();
                    janus.destroy();
                }
            };
        };

        return new Promise(function (resolve, reject) {
            var initialized = false;
            var streamingHandler = null;
            
            var janus = new Janus({
                server: _janusUrl,

                success: function () {
                    var opaqueId = 'streaming-' + Janus.randomString(12);
                    janus.attach({
                        plugin: 'janus.plugin.streaming',
                        opaqueId: opaqueId,

                        success: function (streaming) {
                            streamingHandler = streaming;

                            resolve(createProxyObject(janus, streaming));
                            initialized = true;
                        },

                        error: function (error) {
                            if (!initialized) {
                                reject(error);
                            }

                            else {
                                if (callbacks.onStreamError) {
                                    callbacks.onStreamError(error);
                                }
                            }
                        },

                        onmessage: function (msg, jsep) {
                            if (jsep !== undefined && jsep !== null) {
                                streamingHandler.createAnswer({
                                    jsep: jsep,
                                    media: { audioSend: false, videoSend: false },	// We want recvonly audio/video
                                    success: function (jsep) {
                                        streamingHandler.send({
                                            message: { request: 'start' },
                                            jsep: jsep
                                        });
                                    },
                                    error: function (error) {
                                        if (callbacks.onStreamError) {
                                            callbacks.onStreamError(error);
                                        }
                                    }
                                });
                            }

                            else {
                                if (callbacks.onStreamMessage) {
                                    callbacks.onStreamMessage(msg, jsep);
                                }
                            }
                        },

                        onremotestream: function (stream) {
                            if (callbacks.onStream) {
                                callbacks.onStream(stream);
                            }
                        },

                        oncleanup: function () {
                            if (callbacks.onStreamCleanUp) {
                                callbacks.onStreamCleanUp();
                            }
                        }
                    });
                },

                error: function () {
                    reject();
                }
            });
        });
    };
  
    
    var _createLiveRecordProxy = function (callbacks) {
        var createProxyObject = function (janus, streaming) {
            return {
                getJanus: function () {
                    return janus;
                },

                getStreaming: function () {
                    return streaming;
                },

                checkIfExists: function (streamId) {
                    return new Promise(function (resolve) {
                        streaming.send({
                            message: { request: 'info', id: parseInt(streamId) },
                            success: function (streamInfo) {
                                if (streamInfo.info) {
                                    resolve(true);
                                }
                                else {
                                    resolve(false);
                                }
                            }
                        });
                    });

                },

                destroyIfExists: function (streamId) {
                    return new Promise(function(resolve) {
                        streaming.send({
                            message: { request: 'info', id: parseInt(streamId) },

                            // Destroy current session if exists
                            success: function (streamInfo) {
                                if (streamInfo.info) {                        
                                    streaming.send({ message: { request: 'stop' } });
                        
                                    streaming.send({
                                        message: {
                                            request: 'destroy',
                                            id: parseInt(streamId)
                                        },
                                        success: function (result) {
                                            console.log('Session destroyed ', result);
                                            resolve(true);
                                        }
                                    });
                                }
                                else {
                                    resolve(true);
                                }
                            }
                        });
                    });
                },

                createNewSession: function (streamId, hasAudio, port0, port1) {
                    streaming.send({
                        message: { request: 'list' },
                        success: function (result) {
                        }
                    });
                    
                    var message = {
                        request: 'create',
                        type: 'rtp',
                        id: parseInt(streamId),
                        description: 'Record', //camera.name + '(' + camera.type + ')',
                        audio: hasAudio > 0,
                        video: true,
                        videofmtp: '96 profile-level-id=42E01F\;packetization-mode=1',
                        videopt: 96,
                        videortpmap: 'H264/90000',
                        videoport: port0
                    };
                    
                    if (hasAudio > 0) {
                        message['audiofmtp'] = '0';
                        message['audiopt'] = 0;
                        message['audiortpmap'] = 'PCMU/8000';
                        message['audioport'] = port1;
                    }
                    
                    streaming.send({
                        message: message,

                        success: function (result) {
                            if (callbacks.onNewSessionCreated) {
                                callbacks.onNewSessionCreated(result);
                            }

                            streaming.send({
                                message: {
                                    request: 'list'
                                },

                                success: function (result) {
                                    console.log(result);
                                }
                            });
                        }
                    });
                },

                startStream: function (streamId) {
                    streaming.send({
                        message: {
                            request: 'watch',
                            id: parseInt(streamId)
                        }
                    });
                },

                stopStream: function () {
                    streaming.send({
                        message: {
                             request: 'stop'
                        }
                    });

                    streaming.hangup();
                    streaming.detach();
                    janus.destroy();
                },

                pauseStreaming: function () {
                    streaming.send({
                        message: {
                            request: 'pause'
                        }
                    });
                }, 
                
                stopStreaming: function () {
                    streaming.send({
                        message: {
                            request: 'stop'
                        }
                    });
                },

                resumeStreaming: function () {
                    streaming.send({ message: { request: 'start' } });
                },

                destroyRemoteSession: function (streamId) {
                    streaming.send({ message: { request: 'stop' } });

                    streaming.send({
                        message: { request: 'destroy', id: parseInt(streamId) },
                        success: function (result) {
                            console.log('Session destroyed ', result);
                            return true;
                        }
                    });
                },

                switchMountpoint: function (newStreamId) {
                    streaming.send({
                        message: { request: 'switch', id: newStreamId }
                    });
                },

                destroySession: function (streamId) {
                    streaming.send({ message: { request: 'stop' } });
                    streaming.hangup();
                    streaming.detach();

                    streaming.send({
                        message: { request: 'destroy', id: parseInt(streamId) },
                        success: function (result) {
                            console.log('Session destroyed ', result);
                            janus.destroy();
                            return true;
                        }
                    });
                    
                    streaming.send({
                        message: { request: 'list' },
                        success: function (result) {
                            // console.log('Janus sessions list:', result);
                        }
                    });
                }
            };
        };

        return new Promise(function (resolve, reject) {
            var initialized = false;
            var streamingHandler = null;

            var janus = new Janus({
                server: _janusUrl,

                success: function () {
                    var opaqueId = 'streaming-' + Janus.randomString(12);
                    janus.attach({
                        plugin: 'janus.plugin.streaming',
                        opaqueId: opaqueId,

                        success: function (streaming) {
                            streamingHandler = streaming;

                            resolve(createProxyObject(janus, streaming));
                            initialized = true;
                        },

                        error: function (error) {
                            if (!initialized) {
                                reject(error);
                            }

                            else {
                                if (callbacks.onStreamError) {
                                    callbacks.onStreamError(error);
                                }
                            }
                        },

                        onmessage: function (msg, jsep) {
                            if (jsep !== undefined && jsep !== null) {
                                streamingHandler.createAnswer({
                                    jsep: jsep,
                                    media: { audioSend: false, videoSend: false },	// We want recvonly audio/video
                                    success: function (jsep) {
                                        streamingHandler.send({
                                            message: { request: 'start' },
                                            jsep: jsep
                                        });
                                    },
                                    error: function (error) {
                                        if (callbacks.onStreamError) {
                                            callbacks.onStreamError(error);
                                        }
                                    }
                                });
                            }

                            else {
                                if (callbacks.onStreamMessage) {
                                    callbacks.onStreamMessage(msg, jsep);
                                }
                            }
                        },

                        onremotestream: function (stream) {
                            if (callbacks.onStream) {
                                callbacks.onStream(stream);
                            }
                        },

                        oncleanup: function () {
                            if (callbacks.onStreamCleanUp) {
                                callbacks.onStreamCleanUp();
                            }
                        }
                    });
                },

                error: function () {
                    reject();
                }
            });
        });
    };

    return new Promise(function (resolve) {
        resolve({
            init: _janusInitFactory,
            authenticate: _authenticate,
            createLiveVideoProxy: _createLiveVideoProxy,
            createLiveRecordProxy: _createLiveRecordProxy,
            getLiveRecordPorts: _getLiveRecordPorts,
            startLiveRecord: _startLiveRecord,
            stopLiveRecord: _stopLiveRecord,
            getCurrentLiveRecord: _getCurrentLiveRecord,
            checkLiveRecordStream: _checkLiveRecordStream,
            createStreamId: _createStreamId,
            recreateLiveRecordSession: _recreateLiveRecordSession
        });
    });
};