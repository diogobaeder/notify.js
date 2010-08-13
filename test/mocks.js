// Mocking the Web Notifications API
function getNotificationsMock(){
    var notificationsMock = {
            _permissionState: 1,
            checkPermission: function(){
                return this._permissionState;
            },
            requestPermission: function(callback){
                this._permissionState = 0;
                if (callback) callback();
            },
            createNotification: function(){
                return getNotificationInstanceMock();
            },
            createHTMLNotification: function(){
                return getNotificationInstanceMock();
            }
        }
    return notificationsMock;
}

function getNotificationInstanceMock(){
    var notificationInstanceMock = {
        listenersForDisplay: [],
        listenersForCancel: [],
        listenersForClose: [],
        show: function(){
            var listeners = this.listenersForDisplay;
            for (var i = -1, len = listeners.length; ++i < len;) {
                listeners[i](this);
            }
        },
        cancel: function(){
            var listeners = this.listenersForClose;
            for (var i = -1, len = listeners.length; ++i < len;) {
                listeners[i](this);
            }
        },
        addEventListener: function(name, listener){
            var upper = 'listenersFor' + name[0].toUpperCase()
                    + name.slice(1),
                stack = this[upper];
            stack.push(listener);
        },
        attachEvent: function(name, listener){
            var upper = 'listenersFor'
                    + name.replace(/^on/, '')[0].toUpperCase()
                    + name.slice(1),
                stack = this[upper];
            stack.push(listener);
        }
    };
    return notificationInstanceMock;
}
