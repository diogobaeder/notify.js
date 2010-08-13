(function(){



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
                
            }
        },
        notificationInstanceMock = {
            show: function(){
            },
            cancel: function(){
                
            }
        };
    return notificationsMock;
}

module('initialization');

test('initialization test', function(){
    var notifier = new notifyjs.Notifier(getNotificationsMock());
    equal(notifier.check(), false, 'has no initial permission, but must automatically ask it to the user');
    ok(notifier.check(), 'second time the permission should have been set up');
});



})();
