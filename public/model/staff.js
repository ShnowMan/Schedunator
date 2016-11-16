(function(ctx){

  const Staff = {};

  Staff.allEmployees = [];

  Staff.numStaff = Staff.allEmployees.length;

  Staff.e = null;

  const employee = function(args){
    this.empID = args[0];
    this.name = args[1];
    this.ent = args[2];
    this.ext = args[3];
    this.tp = args[4];
    this.isEighteen = args[5];
    this.numBreaks = args [6];
    Staff.allEmployees.push(this);
  };

  Staff.getEmployeeData = function(){
    //var userId = firebase.auth().currentUser.uid; Note: This is for authorization
    return firebase.database().ref('staff/').once('value').then(function(snapshot) {
      return snapshot.val();
      //console.log(snapshot.val());
    })
  };

  Staff.writeEmployeeData = function(args) {
    firebase.database().ref('staff/' + args[0]).set({
      empID: args[0],
      name: args[1],
      ent: args[2],
      ext: args[3],
      tp: args[4],
      isEighteen: args[5],
      numBreaks: args[6]
    });
  }

  Staff.displayTable = function(){
    const $Table = $('#skills-table');

    console.log(Staff.allEmployees);
    $('tbody').empty();
    Staff.allEmployees.forEach((ele, index) => {

      // Adds Row
      $Table.append(`<tr id='employee-${index}' class='employee'> </tr>`);
      let $TableChild = $(`#employee-${index}`);

      // Adds Employee
      $TableChild.append(`<td id='${ele.name}' class='name'>${ele.name}</td>`)

      // Adds Keys
      for (var i = 0; i < Object.keys(ele).length; i++) {
        if(i == 4){
          continue;
        }
        else{
          $TableChild.append(`<td class = 'property'> ${ele[Object.keys(ele)[i]]} </td>`);
        }
      }
    })
  };

  Staff.addEmployees = function(event){
    event.preventDefault();
    Staff.e = event;
    let args = [
      Staff.numStaff,
      Staff.e.currentTarget.name.value,
      $('input[name="BflyEnt"]:checked').val(),
      $('input[name="BflyExt"]:checked').val(),
      $('input[name="tidePool"]:checked').val(),
      $('input[name="overEighteen"]').is(':checked')
    ];

    args[6] = (args[5]) ? 2 : 3;

    Employee = new employee(args);
    Staff.writeEmployeeData(args);
    Staff.numStaff ++;

    Staff.allEmployees = [];

    Staff.getEmployeeData().then(function(people){
      people.forEach((e) => Staff.allEmployees.push(e))
      Staff.numStaff = Staff.allEmployees.length;
      Staff.displayTable();
    });
  };

  Staff.getEmployeeData().then(function(people){
    people.forEach((e) => Staff.allEmployees.push(e))
    Staff.numStaff = Staff.allEmployees.length;
    Staff.displayTable();
  });

  $('#WarCard').on("submit", Staff.addEmployees);

  ctx.Staff = Staff;
})(window)
