Cells = new Mongo.Collection("cells");

DefaultCells = [
  { pressed: false, text: "\"TO BE SURE\"" }, 
  { pressed: false, text: "\"THE STATE OF OUR UNION IS STRONG\"" }, 
  { pressed: false, text: "PARTY-LINE STANDING OVATION" }, 
  { pressed: false, text: "\"BEST NATION ON EARTH\"" }, 
  { pressed: false, text: "OBAMA DISSES A SUPREME COURT RULING, CAMERA CUTS TO SCOTUS" }, 
  { pressed: false, text: "\"WE WILL DISTROY ISIL\"" }, 
  { pressed: false, text: "\"LET ME BE CLEAR\"" }, 
  { pressed: false, text: "\"CRUMBLING INFRASTRUCTURE\"" }, 
  { pressed: false, text: "\"LONG-TERM UNEMPLOYED\"" }, 
  { pressed: false, text: "\"5 PERCENT GDP GROWTH\"" }, 
  { pressed: false, text: "\"GOD BLESS AMERICA\"" }, 
  { pressed: false, text: "JOE BIDEN WINKS" }, 
  { pressed: true,  text: "VOX SOTU 2015" },  
  { pressed: false, text: "JOHN BOEHNER ROLLS HIS EYES" }, 
  { pressed: false, text: "\"LONGEST RUN OF JOB GROWTH\"" }, 
  { pressed: false, text: "\"IT'S ON US\"" }, 
  { pressed: false, text: "\"WE ARE A NATION OF IMMIGRANTS\"" }, 
  { pressed: false, text: "\"HISTORIC DEAL WITH CUBA\"" }, 
  { pressed: false, text: "\"MILLENIALS\"" }, 
  { pressed: false, text: "\"DEMOCRACY\"" }, 
  { pressed: false, text: "OBAMA CHUCKLES AT HIS OWN JOKE" }, 
  { pressed: false, text: "TAKING CREDIT FOR LOW GAS PRICES" }, 
  { pressed: false, text: "\"GENDER GAP IN TECHNOLOGY\"" }, 
  { pressed: false, text: "RUTH BADER GINSBURG FALLS ASLEEP" }, 
  { pressed: false, text: "\"A MILITARY THAT CAN MEET THE CHALLENGES OF THE 21st CENTURY\"" }
];

if (Meteor.isClient) {
  
  Template.board.helpers({
    cells: function(){
      return Cells.find({}, { sort: { sortOrder: 1 }});
    }
  });
  
  Template.cell.helpers({
  });
  
  Template.cell.events({
    'click': function (event, template) {
      console.log(this);
      Cells.update({ _id: this._id}, { $set: { pressed: !this.pressed } })
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if(Cells.find().count() === 0){
      DefaultCells.forEach(
        function(cell, index){ 
          cell._id = index.toString();
          cell.sortOrder = index;
          Cells.insert(cell); 
        }
      );  
    }
  });
}