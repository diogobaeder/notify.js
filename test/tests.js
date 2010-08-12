(function(){



// Mocking the Web Notifications API
var notificationsMock = {
        _hasPermission: false,
        checkPermission: function(){
            return parseInt(!this._hasPermission);
        },
        requestPermission: function(callback){
            this._hasPermission = true;
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

module('initialization');

test('initialization test', function(){
    var notifier = new notifyjs.Notifier(notificationsMock);
    equal(notifier.check(), false, 'has no initial permission');
});



})();
