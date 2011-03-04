new function() {
  var coordinates_match = null;
  coordinates_match = function(cs1,cs2) {
    var unmatch_count = 0;
    if (cs1.length !== cs2.length) {
      return false;
    }
    _.each(cs1,function(c1) {
      if (!_.any(cs2,function(c2){
        if ((c1[0] === c2[0]) && (c1[1] === c2[1])) {
          return true;
        } else {
          return false;
        }
      })) {
        unmatch_count += 1;
      }
    });
    return (unmatch_count === 0);
  };
  describe("coordinates_match function works",function(){
    it("coordinates_match: Different lengths do not match.",function(){
      var a1 = [[1,1],[2,2],[3,3]],
      a2 = [[1,1],[2,2]];
      expect(coordinates_match(a1,a2)).toBeFalsy();
      expect(coordinates_match(a2,a1)).toBeFalsy();
      a1 = [[1,1],[2,2],[3,3]],
      a2 = [[2,2],[3,3]];
      expect(coordinates_match(a1,a2)).toBeFalsy();
      expect(coordinates_match(a2,a1)).toBeFalsy();
    });
    it("coordinates_match: One array duplicated matches",function(){
      var a1 = [[1,1],[2,2],[3,3]];
      expect(coordinates_match(a1,a1)).toBeTruthy();
      a1 = [[2,2],[3,3]];
      expect(coordinates_match(a1,a1)).toBeTruthy();
    });
    it("coordinates_match: Identical arrays match.",function(){
      var a1 = [[1,1],[2,2],[3,3]],
      a2 = [[1,1],[2,2],[3,3]];
      expect(coordinates_match(a1,a2)).toBeTruthy();
      expect(coordinates_match(a2,a1)).toBeTruthy();
      a1 = [[-2,-1],[-5,2],[100,-1]];
      a2 = [[-2,-1],[-5,2],[100,-1]];
      expect(coordinates_match(a1,a2)).toBeTruthy();
      expect(coordinates_match(a2,a1)).toBeTruthy();
    });
    it("Same length. differences. match fails.", function(){
      var a1=null,a2=null;
      a1 = [[-23,55],[2,2],[0,99]];
      a2 = [[-23,55],[2,2],[1,99]];
      expect(coordinates_match(a1,a2)).toBeFalsy();
      expect(coordinates_match(a2,a1)).toBeFalsy();
      a1 = [[-23,55],[2,2],[0,99]];
      a2 = [[-21,55],[2,2],[0,99]];
      expect(coordinates_match(a1,a2)).toBeFalsy();
      expect(coordinates_match(a2,a1)).toBeFalsy();
      a1 = [[-23,55],[2,2],[0,99]];
      a2 = [[-23,55],[2,2],[0,55]];
      expect(coordinates_match(a1,a2)).toBeFalsy();
      expect(coordinates_match(a2,a1)).toBeFalsy();
    });
    it("Same values, different order matches.",function(){
      var a1=null,a2=null;
      a1 = [[1,-1],[-1,99],[0,0]];
      a2 = [[0,0],[1,-1],[-1,99]];
      expect(coordinates_match(a1,a2)).toBeTruthy();
      expect(coordinates_match(a2,a1)).toBeTruthy();
    });
  });
  describe("Game results",function(){
    var game = [], games = [], cells1 = [], cells2 = [];


    //-------------------- block still life position 1
    game = [];
    cells1 = [
      [1,1],[2,1],[1,2],[2,2]
    ];
    game.push(cells1);
    game.push(cells1);
    games.push(game);

    //-------------------- boat still life position 2
    game = [];
    cells1 = [
      [-1,-3],[-1,-2],[0,-3],[0,-1],[1,-2]
    ];
    game.push(cells1);
    game.push(cells1);
    games.push(game);

    //-------------------- blinker position 1
    game = [];
    cells1 = [
      [1,-3],[2,-3],[3,-3]
    ];
    game.push(cells1);
    cells2 = [
      [2,-4],[2,-3],[2,-2]
    ];
    game.push(cells2);

    game.push(cells1);
    game.push(cells2);

    games.push(game);

    //--------------------  blinker position 2
    game = [];
    cells1 = [
      [3,2],[4,2],[5,2]
    ];
    game.push(cells1);
    cells2 = [
      [4,1],[4,2],[4,3]
    ];
    game.push(cells2);

    game.push(cells1);
    game.push(cells2);

    games.push(game);

    it("Block still life position 1 is static", function(){
      var game_index = 0, i=0, org=null, test_sequence = games[game_index];
      var org = window.game.organism(test_sequence[0]);
      expect(coordinates_match(test_sequence[0],org.cell_coordinates)).toBeTruthy();
      for (i=1; i<test_sequence.length; i+=1) {
        org = org.tick();
        expect(coordinates_match(test_sequence[i],org.cell_coordinates)).toBeTruthy();
      }
    });
    it("Boat still life position 1 is static", function(){
      var game_index = 1, i=0, org=null, test_sequence = games[game_index];
      var org = window.game.organism(test_sequence[0]);
      expect(coordinates_match(test_sequence[0],org.cell_coordinates)).toBeTruthy();
      for (i=1; i<test_sequence.length; i+=1) {
        org = org.tick();
        expect(coordinates_match(test_sequence[i],org.cell_coordinates)).toBeTruthy();
      }
    });
    it("Blinker position 1 blinks", function(){
      var game_index = 2, i=0, org=null, test_sequence = games[game_index];
      var org = window.game.organism(test_sequence[0]);
      expect(coordinates_match(test_sequence[0],org.cell_coordinates)).toBeTruthy();
      for (i=1; i<test_sequence.length; i+=1) {
        org = org.tick();
        expect(coordinates_match(test_sequence[i],org.cell_coordinates)).toBeTruthy();
      }
    });
    it("Blinker position 2 blinks", function(){
      var game_index = 3, i=0, org=null, test_sequence = games[game_index];
      var org = window.game.organism(test_sequence[0]);
      expect(coordinates_match(test_sequence[0],org.cell_coordinates)).toBeTruthy();
      for (i=1; i<test_sequence.length; i+=1) {
        org = org.tick();
        expect(coordinates_match(test_sequence[i],org.cell_coordinates)).toBeTruthy();
      }
    });

  });
};
