var Notifier = function(notifications){
    this._notifications = notifications;
};

Notifier.prototype = {
    check: function(){
        return false;
    }
};
