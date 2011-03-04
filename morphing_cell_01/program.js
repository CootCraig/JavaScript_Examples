jQuery(function() {
  var cell=null,dead_cell=null,extend=null,live_cell=null,log=null,morphin_cell=null,pCreate=null;
  $(".page_title").html("Mighty morphin cell");

  extend = function(dest,src) {
    var key = "";
    for (key in src) {
      if (src.hasOwnProperty(key)) {
        dest[key] = src[key];
      }
    }
    return dest;
  };
  log = function (text) {
    var logp = text + '<br/>';
    $('#log').append(logp);
  };
  pCreate = function(o) { // Crockford told me to!
    var F = function(){};
    F.prototype = o;
    return new F();
  };

  cell = new function() {
    var base_cell_proto=null,dead_cell_functions=null, live_cell_functions=null;
    base_cell_proto = {
      to_s: function() {
        var s = this.name + " ";
        s += this.alive() ? "Alive: " : "Dead: ";
        s += this.neighbor_count + " neighbors";
        return s;
      }
    };
    dead_cell_functions = {
      alive: function() {return false;},
      kill: function() {},
      // live_cell_functions replace dead_cell_functions
      revive: function() { extend(this,live_cell_functions); },
      tick: function() {
        if (this.neighbor_count === 3) {
          this.revive();
        }
        this.neighbor_count = 0;
      }
    };
    live_cell_functions = {
      alive: function() {return true;},
      // dead_cell_functions replace live_cell_functions
      kill: function() { extend(this,dead_cell_functions); },
      revive: function() {},
      tick: function() {
        if (!((this.neighbor_count === 2) || (this.neighbor_count === 3))) {
          this.kill();
        }
        this.neighbor_count = 0;
      }
    };
    return function(live,name,neighbor_count) {
      var cell = pCreate(base_cell_proto);
      if (live) {
        extend(cell,live_cell_functions);
      } else {
        extend(cell,dead_cell_functions);
      }
      cell.name = name;
      cell.neighbor_count = neighbor_count;
      return cell;
    };
  };

  live_cell = cell(true,"Live Cell",1);
  dead_cell = cell(false,"Dead Cell",2);
  morphin_cell = cell(true,"Morphin Cell",3);

  log(live_cell.to_s());
  log(dead_cell.to_s());
  log(morphin_cell.to_s());

  morphin_cell.kill();
  log(morphin_cell.to_s());

  morphin_cell.revive();
  log(morphin_cell.to_s());

});
