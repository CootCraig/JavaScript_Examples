(function() {
  var load = null,
  show_tasks = null,
  task_li_template = null,
  ui={},
  update_priorities = null;

  task_li_template = _.template($(sortable_02.task_li_template_id).text());

  show_tasks = function(){
    jQuery("#log").text("");
    _.each(sortable_02.task_data.sorted_tasks(),function(task){
      coot.log("priority=" + task.priority + " id=" + task.id + " [" + task.text + "]");
    });
  };

  load = function() {
    $(sortable_02.task_list_id).html("");
    _.each(sortable_02.task_data.sorted_tasks(),function(task,i){
      var li = jQuery(
        task_li_template(
          {
            text: task.text,
            tabindex: (i * 2) + 10
          }
        ));
      li.data("task",task);
      li.appendTo(jQuery(sortable_02.task_list_id));
    });
    show_tasks();
  };
  ui.load = load;

  update_priorities = function() {
    jQuery(sortable_02.task_list_id + " > li").each(function(i){
      var li = jQuery(this),
      task = li.data("task");
      task.priority = i + 1;
    });
    show_tasks();
  };
  jQuery(sortable_02.task_list_id).sortable({
    handle: sortable_02.task_li_button_move_class,
    update: update_priorities
  });

  _.extend(sortable_02,{ui: ui});
}) ();
