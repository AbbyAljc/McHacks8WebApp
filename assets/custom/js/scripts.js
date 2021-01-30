
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

        var db = firebase.firestore();
        var users = db.collection("users").doc(user.uid);

        users.get().then(function(doc) {
            if (doc.exists) {
              if(doc.data().type == 'patient'){
                $("#errorMsg").text('')
                $("#errorMsg").text("This is for Doctors and Pharmacists only. Please use the application.")
              }else{
                if (currentPath === 'login') window.location.href = "./dashboard.html";

                $("#userName").text(doc.data().first_name + " " + doc.data().last_name);
                $("#userIcon").attr('src', doc.data().icon);
                $("#userIcon").attr('hidden', false);

              }
            } else {
                console.log("No such document!");
                window.location.href = "./login.html";
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
            window.location.href = "./login.html";
        });
    } else {
        console.log("Logged out");
        if (currentPath !== 'login')
            window.location.href = "./login.html";
    }
});

function writePrescript() {
    firebase.database().collection('prescription').add({
      doctor_id : user.uid,
      prescription_details : 

    });
  }
