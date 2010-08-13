var notifyjs = notifyjs || {};

(function(n, win){



notifyjs.Notifier = function(notificationsAPI){
    this._notifications = notificationsAPI || win.webkitNotifications || win.notifications;
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
        this._setupNotificationEvents(notification);
        notification.show();
        Arrays.push(this, notification);
        return notification;
    },
    
    _setupNotificationEvents: function(notification){
        Events.add(notification, 'display', function(event){
            notification.visible = true;
        });
        Events.add(notification, 'close', function(event){
            notification.visible = false;
        });
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
    },
    
    flush: function(){
        for (var i = -1, len = this.length; ++i < len;) {
            this.pop();
        }
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
},
Events = {
    add: (function(doc){
        return doc.addEventListener ? function(element, name, listener) {
                element.addEventListener(name, listener);
            } : function(element, name, listener) {
                element.attachEvent('on' + name, listener);
            };
    })(document)
};



})(notifyjs, window);
