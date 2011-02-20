$(document).ready(function() {
  var h, // html output by _.template
  tpl, // a template pulled from the html body
  uld; // context object for _.template

  $(".page_title").html("_Template 01");
  
  uld = {
    header: "List from template using loop",
    li: [
      "One",
      "Two",
      "Three"
    ]
  };

  tpl = $("#t1").html();
  h = _.template(tpl,{header: "See me Roar!"});
  $("body").append(h);

  tpl = $("#t2").html();
  h = _.template(tpl,uld);
  $("body").append(h);
});
