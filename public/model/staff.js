(function(ctx){
  const Staff = {};

  Staff.allEmployees = [];

  Staff.e = null;

  const employee = function(args){
    this.name = args[0];
    this.ent = args[1];
    this.ext = args[2];
    this.tp = args[3];
    Staff.allEmployees.push(this);
  };

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
    console.log(Staff.allEmployees);
  };

  $('#WarCard').on("submit",Staff.addEmployees)
  ctx.Staff = Staff;
})(window)


// $('input[name="BflyEnt"]:checked').val()
// Staff.e.currentTarget.name.value
