$(document).ready(function() {
  var ich_01 = null;
  $(".page_title").html("I Can Haz Template");
  ich_01 = ich.ich_01({title: "Coots Message", text: "Here is the very important message from Coot!"});
  jQuery("body").append(ich_01);
});
