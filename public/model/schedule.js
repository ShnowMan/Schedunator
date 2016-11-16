(function(ctx){

  const hours = [
    '10:00 10:30','10:30 11:00',
    '11:00 11:30','12:30 12:00',
    '12:00 12:30','1:30 1:00',
    '1:00 1:30','1:30 2:00',
    '2:00 2:30','2:30 3:00',
    '3:00 3:30','3:30 4:00',
    '4:00 4:30','4:30 5:00',
    '5:00 5:30','5:30 6:00'];

    hours.forEach((halfhour) => {
      $('.table-time').append
      (`<tr><td>${halfhour}</td></tr>`).html()
    });

  let Schedule = {};

  Schedule.allEmployees = [];

  Schedule.randomEmployees = [];

  Schedule.getEmployeeData = function(){
    //var userId = firebase.auth().currentUser.uid; Note: This is for authorization
    return firebase.database().ref('staff/').once('value').then(function(snapshot) {
      return snapshot.val();
      //console.log(snapshot.val());
    })
  };

  Schedule.getEmployeeData().then(function(people){
    people.forEach((e) => Schedule.allEmployees.push(e))
    console.log('allEmployees',Schedule.allEmployees);
  });

  Schedule.grabRandom = function(){
    let personOne = Math.floor(Math.random() * Schedule.allEmployees.length);
    let personTwo = Math.floor(Math.random() * Schedule.allEmployees.length);
    let personThree = Math.floor(Math.random() * Schedule.allEmployees.length);

    while(personOne === personTwo){
      personTwo = Math.floor(Math.random() * Schedule.allEmployees.length)
    }

    while (personTwo === personThree || personOne === personThree) {
      personThree = Math.floor(Math.random() * Schedule.allEmployees.length)
    }

    Schedule.randomEmployees.push(personOne, personTwo, personThree)
  };

  Schedule.populateRandomEmployees = function(){
    hours.forEach((halfhour) => {
      Schedule.randomEmployees = [];
      Schedule.grabRandom();
      console.log(Schedule.randomEmployees);
      $('.table-ent').append(`<tr><td>${Schedule.randomEmployees[0]}</td></tr>`)
      $('.table-ext').append(`<tr><td>${Schedule.randomEmployees[1]}</td></tr>`)
      $('.table-tp').append(`<tr><td>${Schedule.randomEmployees[2]}</td></tr>`)
    })
  };

// Schedule.populateRandomEmployees();
  $('#populate-schedule-button').on('click',function(){
    Schedule.populateRandomEmployees();
  $('#schedule-table').show();

  })
ctx.Schedule = Schedule
})(window)


//[row-1][col-1] =/= [r][len-1]
//           &&
//[row-1][col-1] =/= [row-1][len-1]
