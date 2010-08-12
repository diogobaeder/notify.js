var notifyjs = notifyjs || {};

(function(n){



notifyjs.Notifier = function(notifications){
    this._notifications = notifications;
};

notifyjs.Notifier.prototype = {
    check: function(){
        return false;
    }
};



})(notifyjs);
