(function() {
  var proto = {},
  task_data = {},
  tasks = [];

  tasks = [
    "Write the great American novel.",
    "Win Nobel Peace Prize.",
    "Patent perpetual motion machine."
  ];

  proto.add_task = function(text) {
    var task = {text: text};
    task.id = this.next_task_id();
    task.priority = this.next_priority();
    this[task.id] = task;
    return task;
  };
  proto.delete_task = function(id) {
    if (this.hasOwnProperty(id)) {
      delete this[id];
      this.sorted_tasks(); // priorities reset, ignore returned array
    }
  };
  proto.next_value = function(property) {
    var max_task = null;
    tasks = _.values(this);
    if (tasks.length === 0) {
      return 1;
    } else {
      max_task = _.max(tasks,function(task){ return task[property]; });
      return max_task[property] + 1
    }
  };
  proto.next_task_id = function() { return this.next_value("id"); };
  proto.next_priority = function() { return this.next_value("priority"); };

  // return an array of tasks ordered by priority
  // priority is set to 1..n
  proto.sorted_tasks = function() {
    var sorted = (_(this).chain()
                  .values()
                  .sortBy(function(task){ return task.priority; })
                  .value()
                 );
    _.each(sorted,function(task,i){ task.priority = i + 1; });
    return sorted;
  };

  task_data = coot.create(proto);
  _.each(tasks,function(task){ task_data.add_task(task); });

  _.extend(sortable_02, {task_data: task_data});
}) ();
