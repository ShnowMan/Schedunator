(function(ctx){

  let Schedule = {};

  Schedule.allEmployees = [];

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








})(window)


//[row-1][col-1] =/= [r][len-1]
//           &&
//[row-1][col-1] =/= [row-1][len-1]
