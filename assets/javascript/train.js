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
        time:time,
        dateAdded: firebase.database.ServerValue.TIMESTAMP

    });
    // firebase watcher.on('child_added')
    // database.ref().on('')
    // stroing the snapshot.val() in a variable for convenience
    database.ref().on('child_added', function (snapshot) {
        var snapshot = snapshot.val();
        // logging the last input 
        console.log(snapshot.name);

        // changing the html to reflect the input
        $('#correct').append('<tr> <td>' + snapshot.name + '</td>' +
            '<td>' + snapshot.destination + '</td>' +
            '<td>' + snapshot.time + '</td>' +
            '<td>' + snapshot.frequency + '</td>' +
            '</tr>');


    }, function (errorObject) {
        console.log("the read failed: " + errorObject);

    });

});   