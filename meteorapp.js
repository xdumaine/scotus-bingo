Boards = new Mongo.Collection("boards");
Cells = new Mongo.Collection("cells");

cellTexts = [
  "\"TO BE SURE\"",
  "\"THE STATE OF OUR UNION IS STRONG\"",
  "PARTY-LINE STANDING OVATION",
  "\"BEST NATION ON EARTH\"",
  "OBAMA DISSES A SUPREME COURT RULING, CAMERA CUTS TO SCOTUS",
  "\"WE WILL DISTROY ISIL\"",
  "\"LET ME BE CLEAR\"",
  "\"CRUMBLING INFRASTRUCTURE\"",
  "\"LONG-TERM UNEMPLOYED\"",
  "\"5 PERCENT GDP GROWTH\"",
  "\"GOD BLESS AMERICA\"",
  "JOE BIDEN WINKS",
  "JOHN BOEHNER ROLLS HIS EYES",
  "\"LONGEST RUN OF JOB GROWTH\"",
  "\"IT'S ON US\"",
  "\"WE ARE A NATION OF IMMIGRANTS\"",
  "\"HISTORIC DEAL WITH CUBA\"",
  "\"MILLENIALS\"",
  "\"DEMOCRACY\"",
  "OBAMA CHUCKLES AT HIS OWN JOKE",
  "TAKING CREDIT FOR LOW GAS PRICES",
  "\"GENDER GAP IN TECHNOLOGY\"",
  "RUTH BADER GINSBURG FALLS ASLEEP",
  "\"A MILITARY THAT CAN MEET THE CHALLENGES OF THE 21st CENTURY\""
];

if (Meteor.isClient) {
  
  Template.board.helpers({
    cells: function(){
      return Boards.findOne({}).cells;
    }
  });
  
  Template.cell.created = function () {
    this.pressed = new ReactiveVar(this.data.pressed);
  };
  
  Template.cell.helpers({
    pressed: function () {
      return Template.instance().pressed.get();
    }
  });
  
  Template.cell.events({
    'click': function (event, template) {
      console.log('clicked', template.pressed);
      template.pressed.set(!template.pressed.get());
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    var defaultBoard = {
      _id: '1',
      cells: cellTexts.map(function(c, i){ return { _id: i, text: c, pressed: false}; })
    }
    
    defaultBoard.cells.splice(12, 0, { _id: 12, text: 'VOX SOTU 2015', pressed: true});
    
    Boards.remove({ _id: defaultBoard._id });
    Boards.insert(defaultBoard);
  });
}
