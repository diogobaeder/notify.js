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
    
    expect(3);
    
    equal(notifier.check(), false, 'has no initial permission, but must automatically ask it to the user');
    ok(notifier.check(), 'second time the permission should have been set up');
    ok(notifier.check(), 'third time the permission is still granted');
});

module('message creation');

test('creating a simple message', function(){
    var notifier = new notifyjs.Notifier(getNotificationsMock());
    
    equal(notifier.length, 0, 'notifier should start with 0 notifications in the stack');
    notifier.create('foo.jpg', 'bar', 'baz');
    equal(notifier.length, 1, 'notifier should have one notification in the stack');
});



})();
