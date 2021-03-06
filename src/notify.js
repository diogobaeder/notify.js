var notifyjs = notifyjs || {};

(function(n, win){



notifyjs.Notifier = function(options, notificationsAPI){
    options = options || {};
    this.settings = {
            delay: 2000
        };
    this.icons = {
            ok: 'ok.png',
            info: 'info.png',
            warning: 'warning.png'
        };
    Objects.extend(this.settings, options);
    Objects.extend(this.icons, options.icons);
    
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
        var notification, url;
        
        if (arguments.length === 1) {
            url = icon;
            notification = this._notifications.createHTMLNotification(url);
            notification.type = 'html';
        } else {
            notification = this._notifications.createNotification(icon, title, body);
            notification.type = 'simple';
        }
        
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
    },
    
    // Notification shortcuts - use if you want predefined icons
    info: function(title, body){
        return this.create(this.icons.info, title, body);
    },
    
    ok: function(title, body){
        return this.create(this.icons.ok, title, body);
    },
    
    warning: function(title, body){
        return this.create(this.icons.warning, title, body);
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
    },
    Objects = {
        extend: function(target, subject){
            if (!subject) return;
            for (var prop in subject) {
                if (subject.hasOwnProperty(prop)) {
                    target[prop] = subject[prop];
                }
            }
        }
    };



})(notifyjs, window);
