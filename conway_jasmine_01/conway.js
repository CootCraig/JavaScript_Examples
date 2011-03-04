window.game = new function() {
  var apply_rules = null,
  cell = null,
  count_neighbors = null,
  location = null,
  neighborhood = null,
  organism = null;

  // neighborhood -> tick() -> live cell locations
  apply_rules = function(neighborhood) {
    var live_cell_locations = [];
    _.each(neighborhood.cells_and_neighbors,
          function(cell){
            cell.tick();
            if (cell.alive()) {
              live_cell_locations.push(cell.location.coordinates);
            }
          });
    return live_cell_locations;
  };
  this.cell = cell = new function() {
    var base_proto = null,dead_functions=null,live_functions=null;
    base_proto = coot.create({
      key: function() {
        return _.reduce(this.tuple(),
                        function(key,coord) {
                          if (key.length > 0) {
                            key += ",";
                          }
                          key += coord;
                          return key
                        },
                        "");
      }
    });
    dead_functions = {
      alive: function() {return false;},
      kill: function() {},
      revive: function() { _.extend(this,live_functions); },
      tick: function() {
        if (this.neighbor_count === 3) {
          this.revive();
        }
        this.neighbor_count = 0;
      }
    };
    live_functions = {
      alive: function() {return true;},
      kill: function() { _.extend(this,dead_functions); },
      revive: function() {},
      tick: function() {
        if (!((this.neighbor_count === 2) || (this.neighbor_count === 3))) {
          this.kill();
        }
        this.neighbor_count = 0;
      }
    };
    return function(location,live,neighbor_count) {
      var cell = coot.create(base_proto);
      if (live) {
        _.extend(cell,live_functions)
      } else {
        _.extend(cell,dead_functions)
      }
      cell.location = location;
      cell.neighbor_count = neighbor_count || 0;
      return cell;
    };
  };
  // list of coordinates -> neighborhood
  count_neighbors = function(cell_coordinates) {
    var neighbors = neighborhood();
    _.each(cell_coordinates,
           function(coordinate){
             var loc = location(coordinate);
             neighbors.add_cell(loc);
             _.each(loc.neighbors(),
                    function(neighbor){
                      neighbors.add_neighbor(neighbor);
                    });
           });
    return neighbors;
  };
  this.location = location = (function(){
    var proto = {
      key: function() {
        return _.reduce(this.coordinates,
                        function(key,coord) {
                          return key + (key.length === 0 ? "" : ",") + coord;
                        },
                        "");
      },
      neighbors: function() {
        var dx = 0, dy = 0, neighbors = [];
        for (dx=-1; dx<=1; dx+=1) {
          for (dy=-1; dy<=1; dy+=1) {
            if (!((dx === 0) && (dy === 0))) {
              neighbors.push(location([this.coordinates[0] + dx, this.coordinates[1] + dy]));
            }
          }
        }
        return neighbors;
      }
    };
    return function(coordinates) {
      var location = coot.create(proto);
      location.coordinates = coordinates;
      return location;
    };
  }) ();
  neighborhood = new function() {
    // prototype object saved in closure
    var proto = {
      add_cell: function(location) {
        var key = location.key();
        if (this.cells_and_neighbors.hasOwnProperty(key)) {
          this.cells_and_neighbors[key].revive();
        } else {
          this.cells_and_neighbors[key] = cell(location,true,0);
        }
      },
      add_neighbor: function(location) {
        var key = location.key();
        if (this.cells_and_neighbors.hasOwnProperty(key)) {
          this.cells_and_neighbors[key].neighbor_count += 1;
        } else {
          this.cells_and_neighbors[key] = cell(location,false,1);
        }
      }
    };
    return function() {
      // functions put in prototype
      var neighborhood = coot.create(proto); // local version of object.create()
      // initialize "instance" variables
      neighborhood.cells_and_neighbors = {};
      return neighborhood;
    };
  };
  this.organism = organism = new function() {
    var proto = {
      tick: function() {
        return organism(apply_rules(count_neighbors(this.cell_coordinates)));
      }
    };
    return function(cell_coordinates) {
      var organism = coot.create(proto);
      organism.cell_coordinates = cell_coordinates;
      return organism;
    };
  };
};
