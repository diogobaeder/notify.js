var notifyjs = notifyjs || {};

(function(n){



notifyjs.Notifier = function(notifications){
    this._notifications = notifications;
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
        Array.prototype.push.call(this, notification);
        return notification;
    }
};



})(notifyjs);
