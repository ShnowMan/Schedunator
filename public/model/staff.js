(function(ctx){
  const Staff = {};
  Staff.allEmployees = [];

  const employee = function(args){
    this.name = args[0];
    this.ent = args[1];
    this.ext = args[2];
    this.tp = args[3];
  }

  Staff.addEmployees = function(event){
    event.preventDefault();
    console.log(event);
  }

  $('#WarCard').on("submit",Staff.addEmployees)

  ctx.Staff = Staff;
})(window)
