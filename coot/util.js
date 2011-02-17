coot = {};
coot.log = function (text) {
  var logp = text + '<br/>';
  $('#log').append(logp);
};
coot.create = function(o) { // Crockford told me to!
  var F = function(){};
  F.prototype = o;
  return new F();
};
