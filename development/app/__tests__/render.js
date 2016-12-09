var page = require('webpage').create();

page.open('http://couch-ref.com', function() {
   page.viewportSize = { width: 375, height: 627 };
   window.setTimeout(function () {
      page.render('couch-ref.png');
      phantom.exit();
   }, 800);
});
