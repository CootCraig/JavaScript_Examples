// Written by craig@coot.net @CootCraig
jQuery(document).ready(function() {
  var builder = null,
  content_select = null,
  current_opt = 0;
  opts = [],
  update_content = null;

  opts[0] = [{value: 1, label: "one"},
             {value: 2, label: "two"},
             {value: 3, label: "three"}];
  opts[1] = [{value: "a", label: "Letter A"},
             {value: "b", label: "Letter B"},
             {value: "c", label: "Letter C"}];

  // Returns an object to be used to set the options in a select tag
  // arg css_selector is used to pick the particular select tag.
  content_select = function(css_selector) {
    var jqSelectElement = null,
    $ = jQuery,
    build = null,
    change_func = null,
    that = {};
    jqSelectElement = $(css_selector);
    build = function(label_value_array){
      var attributes = {},
      i = 0,
      label = "",
      len = label_value_array.length,
      value = "";
      jqSelectElement.html("");
      for (i=0; i<len; i+=1){
        value = label_value_array[i].value;
        label = label_value_array[i].label || value;
        attributes = {"value" : value, "class" : "content_select_option"};
        jqSelectElement.haml(["%option",attributes,label]);
        if (i === 0) {
          jqSelectElement.val(value);
        }
      }
      update_content();
    };
    that.build = build;

    update_content = function() {
      var current_val = jqSelectElement.val();
      jqSelectElement.children().each(function(){
        if (this.value == current_val) {
          $("#selected_option").html(this.text);
        }
      });
    };

    jqSelectElement.change(update_content);

    return that;
  };
  builder = content_select("#select_content");

  $("#switch_options").click(function(evt){
    current_opt = (current_opt + 1) % opts.length;
    builder.build(opts[current_opt]);
  });
  // page_content
  $("#head_title").html("jquery_haml_01");
  $("#body_title").html("jQuery HAML Example - jquery_haml_01/");
  builder.build(opts[current_opt]);
});
