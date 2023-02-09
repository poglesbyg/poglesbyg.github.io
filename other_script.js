const FHIRURL = "https://r3.smarthealthit.org";

const client = FHIR.client(FHIRURL);
// console.clear();

function handleData(data) {
  for (var d in data.entry) {
    $("#practitioners").append($("<tr>")
      .html("<td>"
      +data.entry[d].resource.id+"</td><td>"
      +data.entry[d].resource.name[0].family+"</td><td>"
      +data.entry[d].resource.name[0].given[0]+"</td><td>"
      +data.entry[d].resource.birthDate+"</td><td>"
      +"</td>"
        ));
  }
}

client.request("Practitioner?").then(handleData).catch(console.error);

function showPractitionersByName(lastname) {
	client.request("Practitioner?name="+lastname).then(handleData).catch(console.error);	
}
//showPatientsByName("Smith");
function showPractitioners() {
	console.clear();
	showPractitionersByName("Who");
}

function addPractitioner(practitioner) {
  $.ajax({
    type: "POST",
    url: FHIRURL+'/Practitioner',
    headers: {
    },
    data: JSON.stringify(practitioner),
    success: function (data) {
      alert("Added a Doctor! Should see it in results soon!");
    },
    error: function(er) {
      console.log(er);
    },
    datatype: 'json',
    contentType: 'application/json+fhir;charset=utf-8'
  });
}

function addDoctor() {
  addPractitioner({
    "resourceType": "Practitioner",
    "name": {
      "given": ["Doctor"],
      "family": "Who"
    },
    "birthDate": "1963-03-23"
  });
}

function updatePractioner(practitioner) {
  $.ajax({
    type: "PUT",
    url: FHIRURL+'/Practitioner/'+practitioner.id,
    headers: {
    },
    data: JSON.stringify(practitioner),
    success: function (data) {
      alert("Updated a Doctor! Should see it in results soon!");
    },
    error: function(er) {
      console.log(er);
    },
    datatype: 'json',
    contentType: 'application/json+fhir;charset=utf-8'
  });
}

function updateDoctor() {
  client.request("Practitioner?name=Who").then(function(data) {
    var doc = data.entry[0].resource;
    doc.name[0].given = ["The Doctor"];
    updatePractioner(doc);
  }).catch(console.error);
}

function deletePractitioner(practitioner) {
  $.ajax({
    type: "DELETE",
    url: FHIRURL+'/Practitioner/'+practitioner.id,
    headers: {
    },
    success: function (data) {
      alert("Deleted a Doctor! Should see it in results soon!");
    },
    error: function(er) {
      console.log(er);
    },
    datatype: 'json',
    contentType: 'application/json+fhir;charset=utf-8'
  });
}
