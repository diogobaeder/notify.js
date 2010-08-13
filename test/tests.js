(function(){



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
    
    expect(7);
    
    equal(notifier.length, 0, 'notifier should start with 0 notifications in the stack');
    
    notifier.create('foo.jpg', 'bar', 'baz');
    equal(notifier.length, 1, 'notifier should have one notification in the stack');
    equal(typeof notifier[0], 'object', 'first notification in the stack should be an object');
    ok(notifier[0].visible, 'first notification should be visible');
    
    notifier.create('foo.jpg', 'bar', 'baz');
    equal(notifier.length, 2, 'notifier should have two notifications in the stack');
    equal(typeof notifier[1], 'object', 'second notification in the stack should be an object');
    ok(notifier[1].visible, 'second notification should be visible');
});



module('message removing');

test('should remove the messages from specified positions', function(){
    var notifier = new notifyjs.Notifier(getNotificationsMock());
    
    expect(7);
    
    notifier.create('foo.jpg', 'bar', 'baz');
    notifier.create('foo.jpg', 'bar', 'baz');
    notifier.create('foo.jpg', 'bar', 'baz');
    equal(notifier.length, 3, 'notifier should have 3 notifications in the stack');
    
    var first = notifier.shift();
    equal(typeof first, 'object', 'detached notification should be an object');
    ok(!first.visible, 'detached notification should not be visible');
    equal(notifier.length, 2, 'notifier should now have 2 notifications');
    
    var last = notifier.pop();
    equal(typeof last, 'object', 'detached notification should be an object');
    ok(!last.visible, 'detached notification should not be visible');
    equal(notifier.length, 1, 'notifier should now have 1 notifications');
});

test('should flush the entire stack', function(){
    var notifier = new notifyjs.Notifier(getNotificationsMock());
    
    expect(2);
    
    notifier.create('foo.jpg', 'bar', 'baz');
    notifier.create('foo.jpg', 'bar', 'baz');
    notifier.create('foo.jpg', 'bar', 'baz');
    equal(notifier.length, 3, 'notifier should have 3 notifications in the stack');
    
    notifier.flush();
    equal(notifier.length, 0, 'notifier should have no elements after flushing');
});



module('different notification types');

test('should show an HTML notification', function(){
    var notifier = new notifyjs.Notifier(getNotificationsMock());
    
    notifier.create('foo.jpg', 'bar', 'baz');
    equal(notifier[0].type, 'simple', 'notification should be simple type');
    
    notifier.create('foo');
    equal(notifier[1].type, 'html', 'notification should be HTML type');
});



})();
