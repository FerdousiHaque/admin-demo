
  
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in
      var user = firebase.auth().currentUser;
      if(user.emailVerified){
        window.location = "page1.html";
      } else {
          window.location = "verify.html";
      }
    } else {
      // No user is signed in
    }
  });
  
  function login(){
    
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
  
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then((user) => {
    if(user.emailVerified){
      window.location = "page1.html";
    } else {
        window.location = "verify.html";
    }
      })    .catch(function(error) {
      // Handle Errors 
      var errorMessage = error.message;
      window.alert("Error : " + errorMessage);
    });
  }
  
  function signup(){
    
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
  
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass)
    .then((user) => {
      window.location = "index.html";
        })    .catch(function(error) {
      // Handle Errors 
      var errorMessage = error.message;
      window.alert("Error : " + errorMessage);
    });
    
  }