var notifyjs = notifyjs || {};

(function(n){



notifyjs.Notifier = function(notifications){
    this._notifications = notifications;
    pushToArray(this);
};

notifyjs.Notifier.prototype = {
    check: function(){
        var permissionDenied = 1;
        if (this._notifications.checkPermission() == permissionDenied) {
            this._notifications.requestPermission();
            return false;
        }
        return true;
    },
    
    create: function(icon, title, body){
        var notification = this._notifications.createNotification(icon, title, body);
        pushToArray(this, notification);
        return notification;
    }
};

// Auxiliary functions
function pushToArray(container) {
    var objects = Array.prototype.slice.call(arguments, 1);
    Array.prototype.push.apply(container, objects);
}



})(notifyjs);
