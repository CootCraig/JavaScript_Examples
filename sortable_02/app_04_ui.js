(function() {
  var append_task_to_list = null,
  edit_task = null,
  end_edit = null,
  load = null,
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
      append_task_to_list(task);
    });
    show_tasks();
  };
  ui.load = load;

  update_priorities = function() {
    jQuery(sortable_02.task_list_id + " > li").each(function(i){
      var task = jQuery(this).data("task");
      task.priority = i + 1;
    });
    show_tasks();
  };
  jQuery(sortable_02.task_list_id).sortable({
    handle: sortable_02.task_li_button_move_class,
    update: update_priorities
  });

  jQuery(sortable_02.add_button_id).click(function(){
    var li = null,
    task = null;
    task = sortable_02.task_data.add_task("New task.");
    append_task_to_list(task);
    li = $(sortable_02.task_list_id + " > li:last")
    edit_task(li);
    show_tasks();
  });

  edit_task = function(li) {
    $(sortable_02.add_button_id).attr("disabled","disabled");
    $(sortable_02.task_list_id + " button").attr("disabled","disabled");
    li.children(sortable_02.task_li_button_1_class).text("Save");
    li.children(sortable_02.task_li_button_2_class).text("Revert");
    li.children("button").removeAttr("disabled");
    li.children(sortable_02.task_li_textarea_class).removeAttr("readonly").focus();
  };
  end_edit = function(li) {
    li.children(sortable_02.task_li_button_1_class).text("Edit");
    li.children(sortable_02.task_li_button_2_class).text("Delete");
    li.children(sortable_02.task_li_textarea_class).attr("readonly","readonly");
    $(sortable_02.add_button_id).removeAttr("disabled");
    $(sortable_02.task_list_id + " button").removeAttr("disabled");
  }

  append_task_to_list = function(task) {
    var li = null;
    li = jQuery(task_li_template({text: task.text}));
    li.data("task",task);
    li.appendTo(jQuery(sortable_02.task_list_id));
  };

  jQuery(sortable_02.task_li_button_1_class).live("click",function(){
    var button = null,
    li = null,
    task = null;
    button = jQuery(this);
    li = button.parent();
    task = li.data("task");
    if (button.text() === "Edit") {
      edit_task(li);
    } else { // Save
      task.text = li.children(sortable_02.task_li_textarea_class).attr("value");
      end_edit(li);
      show_tasks();
    }
  });
  jQuery(sortable_02.task_li_button_2_class).live("click",function(){
    var button = null,
    li = null,
    task = null;
    button = jQuery(this);
    li = button.parent();
    task = li.data("task");
    if (button.text() === "Delete") {
      li.remove();
      sortable_02.task_data.delete_task(task.id);
      show_tasks();
    } else { // Revert
      li.children(sortable_02.task_li_textarea_class).attr("value",task.text);
      end_edit(li);
      show_tasks();
    }
  });

  _.extend(sortable_02,{ui: ui});
}) ();
