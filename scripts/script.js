const FHIRURL = "https://r3.smarthealthit.org";
const client = FHIR.client(FHIRURL);
console.clear();

//// UPDATING
function updatePatient() {
	//// Prompt for each of my (potentially new) values for firstname and lastname. I'm including the current values for the patient in question as defaults:
	var firstname = prompt("First name?", this.patient.name[0].given[0]);
  //// Just in case they don't enter something, then we'll get a [false] value, so let's just exit by using 'return' if that happens:
  if (!firstname) { return; }
  //// ditto
	var lastname = prompt("Last name?", this.patient.name[0].family);
  //// ditto
  if (!lastname) { return; }
  
  client.patch("Patient/"+this.patient.id, [
    { op: "replace", path: "/name/0/given/0", value: firstname }
    ,
    { op: "replace", path: "/name/0/family", value: lastname }
	]).then(function(updatedPatient) {
  	addPatientRow(updatedPatient);  
	  this.row.parentNode.removeChild(this.row);
  });
  
}

//// CREATING / INSERTING:
function addPatient() {
	//// Let's prompt the user for the pieces of info that we want to store about our new patient:
	var firstname = prompt("First name?");
	var lastname = prompt("Last name?");
  //// Let's create a minimal object structured the way a FHIR Patient resource would be structured:
	var patient = {
    "resourceType": "Patient",
    "name": {
      "given": [firstname],
      "family": lastname
    },
  }
  newPatient = client.create(patient).then(function(x) {
    addPatientRow(x);
  });
}


//// DELETING
//function deletePatient(patient_id) {
//	console.log(patient_id);
//}

function deletePatient() {
	//// Because of our binding in addPatientRow below, we now know that we will have a 'patient_id' property and a 'row' property. 'row' will refer to the TR (table row) in the DOM that contains this particular patient record
	if (confirm("Are you sure you want to delete this patient?")) {
  	//// Whenever you 'bind' things to a function and run it, those variables are available as properties of the 'this' object
		client.delete("Patient/"+this.patient_id);
    //// Have the parent of the row we passed in remove the row from itself:
    this.row.parentNode.removeChild(this.row);
    //// Alternatively, we COULD have just re-read the entire set of results, but then we'd have to pass in the proper name search again, etc.
  }
}

//// READ
//// 'patient' Starts at data.entry[d].resource level in the data that client.request returns
function addPatientRow(patient) {
	//// Get a reference to patientResults tbody
  var patientResults = document.querySelector("#patientResults");
  //// Build a new table row (tr):
  var tr = document.createElement("tr");

	//// Create a table data cell (td)
	var td = document.createElement("td");
  //// Fill it with our first piece of info, which is our patient's first given name (first element in the 'given' array under the 'name' property's first entry)
  td.innerHTML = patient.name[0].given[0];
  tr.appendChild(td);
  var td = document.createElement("td");
  td.innerHTML = patient.name[0].family;
  tr.appendChild(td);
  var td = document.createElement("td");
  var btn = document.createElement("button");
  btn.innerHTML = "[X]";
  //// You can use <function>.bind({object}) to bind values to a function when attaching it to a listener like this. That way you make sure to maintain proper references.
  
  //// We want to make sure that LATER, when we CALL the function by clicking the button (when we're not in this loop anymore), that it still knows what the right patient/data/etc is:
  btn.onclick = deletePatient
  						.bind({patient_id:patient.id, row:tr});

	//// Compare to this, where the ID will repeat incorrectly:
  //btn.onclick = function() {
  //	deletePatient(data.entry[d].resource.id);
  //}
  
  td.appendChild(btn);
  var btn = document.createElement("button");
  btn.innerHTML = "[Edit]";
  //btn.onclick = updatePatient.bind({patient:patient, row:tr});
  td.appendChild(btn);
  tr.appendChild(td);

	//// Append that table row (tr) to my patientResults tbody
	patientResults.appendChild(tr);
}


function handlePatients(data) {
	//// Creating a reference to our tbody in our HTML so I can do things to change the content:
	var patientResults = document.querySelector("#patientResults");
  //// Clear the content by clearing out the innerHTML of our tbody
  patientResults.innerHTML = "";
  //console.log(data);
  //return;
  //// Check to make sure 'entry' even exists as a property in our data, because that's where our array of patient results will be:
  if (data.entry) {
  	//// Then loop through it using a for-loop:
    for (var d=0; d<data.entry.length; d++) {
    	//// Sometimes the API takes a bit to process everything. Let's just have a try/catch around this to avoid complications:
      
      //try {
      	//// Here I'm calling another function that I will write to VISUALLY insert a row into my table. I'm doing this as a separate function so that I don't have to write all of the lines of code everywhere else that I want to use them.
	      addPatientRow(data.entry[d].resource);
      //} catch(error) {
      //	console.log("Skipped a patient row due to incomplete data.");
      //}
    }
  }
}


function showPatients() {
	//// Basically doing this:
  //// https://r3.smarthealthit.org/Patient?name=...
	//// Keep in mind when displaying patients that this service seems to be caching requests and only refreshing every once in a while. Your changes me not immediately be apparent.
	var lastname = prompt("Name to search:");
  //if (confirm("Are you sure you want to pop up that name?")) {
  //	alert(lastname);
  //}
	client.request("Patient?name="+lastname)
  	.then(handlePatients)
    .catch(console.error)
    ;
}
