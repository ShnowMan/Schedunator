(function(ctx){

  const Staff = {};

  Staff.allEmployees = [];

  Staff.numStaff = Staff.allEmployees.length;

  Staff.e = null;

  const employee = function(args){
    this.name = args[0];
    this.ent = args[1];
    this.ext = args[2];
    this.tp = args[3];
    this.isEighteen = args[4];
    this.numBreaks = args [5];
    Staff.allEmployees.push(this);
  };

  Staff.getEmployeeData = function(){
    //var userId = firebase.auth().currentUser.uid; Note: This is for authorization
    return firebase.database().ref('staff/').once('value').then(function(snapshot) {
      return snapshot.val();
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
        if(i == 3){
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
      Staff.e.currentTarget.name.value,
      $('input[name="BflyEnt"]:checked').val(),
      $('input[name="BflyExt"]:checked').val(),
      $('input[name="tidePool"]:checked').val(),
      $('input[name="overEighteen"]').is(':checked')
    ];

    args[5] = (args[4]) ? 2 : 3;

    Employee = new employee(args);
    Staff.writeEmployeeData(Staff.numStaff, args);
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


// $('input[name="BflyEnt"]:checked').val()
// Staff.e.currentTarget.name.value

      // console.log(ele);
// ele.keys.forEach((key, j) => {
// Table.append(`<td class = 'property'> ${key} </td>`);
// })
