var notifyjs = notifyjs || {};

(function(n){



notifyjs.Notifier = function(notifications){
    this._notifications = notifications;
    Arrays.push(this);
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
        Arrays.push(this, notification);
        return notification;
    },
    
    shift: function(){
        var notification = Arrays.shift(this);
        notification.cancel();
        return notification;
    },
    
    pop: function(){
        var notification = Arrays.pop(this);
        notification.cancel();
        return notification;
    }
};

// Auxiliary functions
var Arrays = {
    push: function(context) {
        var objects = Array.prototype.slice.call(arguments, 1);
        Array.prototype.push.apply(context, objects);
    },
    pop: function(context){
        return Array.prototype.pop.apply(context);
    },
    shift: function(context){
        return Array.prototype.shift.apply(context);
    }
};
function pushToArray(container) {
    var objects = Array.prototype.slice.call(arguments, 1);
    Array.prototype.push.apply(container, objects);
}



})(notifyjs);
