
$("#submitPrescript").submit(function(event) {
    event.preventDefault();
    console.log("Submitting prescription.")
    firebase.firestore().collection('prescription').add({
      doctor_id : "user.uid",
      prescription_details : $("#prescript").val(),
      allowed_quantity : $("#refills").val(),
      medication : $("#medication").val()
    });

  });
