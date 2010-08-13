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
    }
};



})(notifyjs);
