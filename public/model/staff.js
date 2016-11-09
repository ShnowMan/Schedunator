(function(ctx){

  const Staff = {};
  Staff.numStaff = 0;

  Staff.allEmployees = [];

  Staff.e = null;

  const employee = function(args){
    this.name = args[0];
    this.ent = args[1].toUpperCase();
    this.ext = args[2].toUpperCase();
    this.tp = args[3].toUpperCase();
    this.isEighteen = args[4];
    this.numBreaks = args [5];
    Staff.allEmployees.push(this);
  };

  Staff.getEmployeeData = function(){
    //var userId = firebase.auth().currentUser.uid; Note: This is for authorization
    return firebase.database().ref('staff/').once('value').then(function(snapshot) {
      var username = snapshot.val();
      //console.log(snapshot.val());
    });
  }

  Staff.writeEmployeeData = function(employeeID, args) {
    firebase.database().ref('staff/' + employeeID).set({
      name: args[0],
      ent: args[1],
      ext: args[2],
      tp: args[3],
      isEighteen: args[4],
      numBreaks: args[5]
    });
    Staff.getEmployeeData();
  }

  Staff.addEmployees = function(event){
    event.preventDefault();
    Staff.e = event;
    let args = [
      Staff.e.currentTarget.name.value,
      $('input[name="BflyEnt"]:checked').val(),
      $('input[name="BflyExt"]:checked').val(),
      $('input[name="tidePool"]:checked').val(),
      $('input[name="overEighteen"]').is(':checked')
    ];

    args[5] = (args[4])? 2 : 3;

    Employee = new employee(args);
    Staff.numStaff ++;
    Staff.writeEmployeeData(Staff.numStaff, args);
  };

  $('#WarCard').on("submit",Staff.addEmployees)

  Staff.getEmployeeData();

  ctx.Staff = Staff;
})(window)


// $('input[name="BflyEnt"]:checked').val()
// Staff.e.currentTarget.name.value
