const FHIRURL = "https://r3.smarthealthit.org";

const client = FHIR.client(FHIRURL);
console.clear();


//// READING:
function handlePatients(data) {
	console.log("type of data:", typeof data);
  //console.log(data)
  //return;
  //console.log(data.entry.length);
  //return;
	console.log("Reading items in data.entry:");
  for (var d in data.entry) {
		console.log("id:", data.entry[d].resource.id);
    console.log("family name:", data.entry[d].resource.name[0].family);
    console.log("first given name:", data.entry[d].resource.name[0].given[0]);
    console.log("-----------");
	}
}
//client.request("Patient?name=Smith").then(handlePatients).catch(console.error);
//client.request("Patient?name=McFly").then(handlePatients).catch(console.error);

//// We should wrap this all up into a function to show patients by name. (We'll use it further below!)
function showPatientsByName(lastname) {
	client.request("Patient?name="+lastname).then(handlePatients).catch(console.error);	
}
//showPatientsByName("Smith");
function showMcFlies() {
	console.clear();
	showPatientsByName("McFly");
}


//// CREATING / INSERTING:
function addPatient(patient) {
  $.ajax({
  	//// POST is used to CREATE
    type: "POST",
    url: FHIRURL+'/Patient',
    headers: {
    //// If this were real, we'd have to provide a token that was obtained through some OAUTH authentication (we'd be logging in as a patient or provider with a limited scope of permissions to read/write on this thing)
  //    "Authorization":"Bearer "+$scope.token
    },
    data: JSON.stringify(patient),
    success: function (data) {
    	alert("Added a Martin McFly! Should see it in results soon!");
		},
    error: function(er) {
      console.log(er);
    },
    datatype: 'json',
    contentType: 'application/json+fhir;charset=utf-8'
  });
}

function addMartyMcFly() {
  addPatient({
    "resourceType": "Patient",
    "name": {
      "given": ["Martin"],
      "family": "McFly"
    },
  });
}

//// UPDATING
function updatePatient(patient) {
		$.ajax({
    	//// PUT is used to UPDATE
      type: "PUT",
      url: FHIRURL+'/Patient/'+patient.id,
      success: function (patient) {
	      alert("Updating the patient. Changes should appear soon!")
      },
      data: JSON.stringify(patient),
      datatype: 'json',
      contentType: 'application/json+fhir;charset=utf-8'
    });
}

function updateMartyMcFly() {
	updatePatient({
    //// Note what happens in the console if we leave out this id:
    "id": "288529",
		"resourceType": "Patient",
    "name": {
      "given": ["Marti"],
      "family": "McFly"
    }
  });
}




//// DELETING
function deletePatient(id) {
  $.ajax({
    type: "DELETE",
    url: FHIRURL+'/Patient/'+id,
    success: function (data) {
    	console.log("Patient", id, "deleted.")
      showPatientsByName("McFly");
    },
  });
}
//// Notice the resource.id is a String:
function deleteMarty() {
	deletePatient("288531");
}

