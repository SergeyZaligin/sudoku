

Function.prototype.method = function(name, func) {
  'use__strict';
    if (!this.prototype[name]) {
        this.prototype[name] = func;
        return this;
    }
};

Array.method('fillIncr', function(length, start) {
  'use__strict';
    var start = start || 0,
                    i = 0;

    for (i = 0; i < length; i++) {
        this.push(i + start);
    }

    return this;
});

Element.method('addClass', function(className) {
  'use__strict';
    var classes = this.className.split(' ');
    if (classes.indexOf(className) < 0) {
        classes.push(className);
        this.className = classes.join(' ').trim();
    }
});

Element.method('removeClass', function(className) {
  'use__strict';
    var classes = this.className.split(' '),
    index = classes.indexOf(className);
    if (index >= 0) {
        classes.splice(index, 1);
        this.className = classes.join(' ').trim();
    }
});

var App = {};

App.Sudoku = function(area) {
  'use__strict';
  var that  = this,
      table = document.createElement('table'),
      area  = area || 3,
      expo  = area * area,
      i = 0; 

  table.addClass('sudoku');

  for(; i < expo; i++) {
    var row = table.insertRow(-1);
    for(var j = 0; j < expo; j++) {
      var cell = row.insertCell(-1);
      cell.innerHTML = i + ';' + j;

      switch(i%area){
        case 0:
            cell.addClass('top');
        break;
        case area-1:
             cell.addClass('bottom');
        break;
      }

      switch(j%area){
        case 0:
            cell.addClass('left');
        break;
        case area-1:
             cell.addClass('right');
        break;
      }

    }
  }
  that.table = table;
  that.expo  = expo;
}

App.Sudoku.prototype = {

  fill: function(values){

    var that = this;
    that.values = values;
var i = 0;
    for(; i < that.expo; i++) {
      var row = that.table.rows[i];
      for(var j = 0; j < that.expo; j++) {
        var cell = that.table.rows[i].cells[j];
        cell.innerHTML = values[i][j];
      }
    }
  }

}

App.Generator = function(area) {
  var that = this;
  var area  = area || 3;
  var expo = area * area;
  var base = [].fillIncr(expo, 1);
  var rows = [];
  var i = 0;
  /**
  ** Алгоритм формирования строк
  **/
  for(; i < expo; i++) {
    var row = [];
    var start = (i%area)*area + parseInt(i/area, 10);
    for(var j = 0; j < expo; j++) {
      row.push(base.slice(start, expo).concat(base)[j]);
    }
    rows.push(row);
  }
  that.rows = rows;
  that.expo = expo;
  that.area = area;
}

App.Generator.prototype = {
  invertVertical: function() {
    var that = this;
    that.rows.reverse();
    return that;
  }
}

var tbl = new App.Sudoku();

document.body.appendChild(tbl.table);

var generator = new App.Generator();

tbl.fill(generator.rows);