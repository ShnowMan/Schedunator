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
    Staff.allEmployees.push(this);
  };

  Staff.writeEmployeeData = function(employeeID, args) {
    firebase.database().ref('staff/' + employeeID).set({
      name: args[0],
      ent: args[1],
      ext: args[2],
      tp: args[3]
    });
  }

  Staff.addEmployees = function(event){
    event.preventDefault();
    Staff.e = event;
    const args = [
      Staff.e.currentTarget.name.value,
      $('input[name="BflyEnt"]:checked').val(),
      $('input[name="BflyExt"]:checked').val(),
      $('input[name="tidePool"]:checked').val()
    ];

    Employee = new employee(args);
    Staff.numStaff ++;
    Staff.writeEmployeeData(Staff.numStaff, args);
    console.log(Staff.allEmployees);
  };

  $('#WarCard').on("submit",Staff.addEmployees)


  ctx.Staff = Staff;
})(window)


// $('input[name="BflyEnt"]:checked').val()
// Staff.e.currentTarget.name.value
