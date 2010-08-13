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
                return getNotificationInstanceMock();
            }
        }
    return notificationsMock;
}

function getNotificationInstanceMock(){
    var notificationInstanceMock = {
        show: function(){
        },
        cancel: function(){
            
        }
    };
    return notificationInstanceMock;
}

module('initialization');

test('should grant permission upon verification', function(){
    var notifier = new notifyjs.Notifier(getNotificationsMock());
    
    expect(3);
    
    equal(notifier.check(), false, 'has no initial permission, but must automatically ask it to the user');
    ok(notifier.check(), 'second time the permission should have been set up');
    ok(notifier.check(), 'third time the permission is still granted');
});

module('message creation');

test('should create a simple message', function(){
    var notifier = new notifyjs.Notifier(getNotificationsMock());
    
    expect(5);
    
    equal(notifier.length, 0, 'notifier should start with 0 notifications in the stack');
    
    notifier.create('foo.jpg', 'bar', 'baz');
    equal(notifier.length, 1, 'notifier should have one notification in the stack');
    equal(typeof notifier[0], 'object', 'first notification in the stack should be an object');
    
    notifier.create('foo.jpg', 'bar', 'baz');
    equal(notifier.length, 2, 'notifier should have two notifications in the stack');
    equal(typeof notifier[1], 'object', 'second notification in the stack should be an object');
});

module('message removing');

test('should remove the messages from specified positions', function(){
    var notifier = new notifyjs.Notifier(getNotificationsMock());
    
    notifier.create('foo.jpg', 'bar', 'baz');
    notifier.create('foo.jpg', 'bar', 'baz');
    notifier.create('foo.jpg', 'bar', 'baz');
    equal(notifier.length, 3, 'notifier should have 3 notifications in the stack');
    
    var first = notifier.shift();
    equal(typeof first, 'object', 'detached notification should be an object');
    equal(notifier.length, 2, 'notifier should now have 2 notifications');
});



})();
