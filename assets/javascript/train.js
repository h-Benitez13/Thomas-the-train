// firebase code to be asynchronous while initializing the page
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAHVV51cc_a8Wjyyo_MVxHUrRMRjE4bOns",
    authDomain: "thomas-the-train-e852a.firebaseapp.com",
    databaseURL: "https://thomas-the-train-e852a.firebaseio.com",
    projectId: "thomas-the-train-e852a",
    storageBucket: "thomas-the-train-e852a.appspot.com",
    messagingSenderId: "487361585735"
};


firebase.initializeApp(config);

// create a variable to reference the database
var database = firebase.database();

//   capture the button click 
$('#train-add').click(function (event) {
    // do not want it to repeat
    event.preventDefault();
    // grab the values form text boxes
    var name = $('#name-input').val().trim();
    var destination = $('#destination-input').val().trim();
    var time = $('#time-input').val().trim();
    var frequency = $('#freq-input').val();

    // giving my databaes labels for the inputs
    // using .push() to not reset one set of data but a list of 
    database.ref().push({
        name: name,
        destination: destination,
        frequency: frequency,
        time: time,

    });
    // firebase watcher.on('child_added')
    // database.ref().on('')
    // stroing the snapshot.val() in a variable for convenience
    database.ref().on('child_added', function (snap) {
        // var snap = snapshot.val();
        // // logging the last input 
        // console.log(snap.name);


        // variable for firstTrainTime to manipulate
        // variable for frequency to manipulate
        // variable for ACTUAL time for moment.js
        var time = snap.val().time;
        var frequency = snap.val().frequency;
        var changeUp = moment();

        // current TIME
        console.log(changeUp);
        $('.time').html(changeUp);
        console.log("CURRENT TIME: " + moment(changeUp).format("hh:mm"));


        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(time, "HH:mm").subtract(1, "years");
        // console.log(firstTimeConverted);

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        // console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % frequency;
        console.log('THIS IS THE: ' + tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = frequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        var nextTrainForm = moment(nextTrain).format("hh:mm a");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        // changing the html to reflect the input
        $('#correct').append('<tr> <td>' + snap.val().name + '</td>' +
            '<td>' + snap.val().destination + '</td>' +
            '<td>' + nextTrainForm + '</td>' +
            '<td>' + snap.val().frequency + '</td>' +
            '<td>' + tMinutesTillTrain + " min" + '</td>' +
            '</tr>'
        );








    }, function (errorObject) {
        console.log("the read failed: " + errorObject);



    });




});   