var firebaseConfig = {
    apiKey: "AIzaSyDhgp_fbMSpRiYBZYXgA09l9hh5wckz34w",
    authDomain: "mchacks2021-39752.firebaseapp.com",
    projectId: "mchacks2021-39752",
    storageBucket: "mchacks2021-39752.appspot.com",
    messagingSenderId: "478478347728",
    appId: "1:478478347728:web:3c3bef39b903026022ddd5",
    measurementId: "G-H3L6J6QE5X"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
init();


function init() {
    var path = window.location.pathname.split('/');
    const currentPath = path[path.length - 1].split('.')[0];
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
}

$("#emailSignIn").submit(function(event) {
    event.preventDefault();
    var path = window.location.pathname.split('/');
    const currentPath = path[path.length - 1].split('.')[0];

    firebase.auth().signInWithEmailAndPassword($("#emailLogin").val(), $("#passwordLogin").val())
        .then((userCredential) => {
            console.log("logging in")
        })
        .catch((error) => {
            $("#errorMsg").text('')
            $("#errorMsg").text(error.message)
        });
});


function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "./login.html";
    }).catch((error) => {
        alert(error)
    });
}
