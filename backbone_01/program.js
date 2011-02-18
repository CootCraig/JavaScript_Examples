
if (typeof coot.app === "undefined"){
    coot.app = {};
}
coot.app.content_loader = function(){
  var info_content = null,
  nonsense_content = null,
  that = {};
  // pretend that coot.app.content was built on the server
  // Hard coded that there are 2 main tabs: Info and Nonsense
  // But that Info/Nonsense each have sub tab content
  // sent from the server
  nonsense_content = coot.app.content.nonsense;
  info_content = coot.app.content.info;

  
  return that;
}

$(document).ready(function() {
  $("#head_title").html("Backbone Demo");
  $("#body_title").html("Demo Backbone.js and jQuery.haml.js");

  coot.app.content_loader();
});
