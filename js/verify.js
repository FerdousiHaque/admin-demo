firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in
      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Welcome User : " + email_id + 
                                                        "<br/> Verified status : "+ user.emailVerified;
        var user = firebase.auth().currentUser;
      if(!user.emailVerified){
        user.sendEmailVerification().then(function() {
            // Email sent
            window.alert("Verification sent to your email, Check your email and Make sure it is verified");
            window.location = "index.html";
        }).catch(function(error) {
            // An error happened.
            window.alert("Error :  "+ error.message);
        });
    } else {
        window.location = "page1.html";
    } 
  
    } else {
      // No user is signed in
      //window.location = "index.html";
    }
  });
  
function logout(){
    firebase.auth().signOut();
    window.location = "index.html";
  }
    