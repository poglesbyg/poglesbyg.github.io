const FHIRURL = "https://r3.smarthealthit.org";
const client = FHIR.client(FHIRURL);
console.clear();

//// UPDATING
function updatePractitioner() {
  var firstname = prompt("First name?", this.practitioner.name[0].given[0]);
  if (!firstname) { return; }
  var lastname = prompt("Last name?", this.practitioner.name[0].family);
  if (!lastname) { return; }
  client.patch("Practitioner/"+this.practitioner.id, [
    { op: "replace", path: "/name/0/given/0", value: firstname }
    ,
    { op: "replace", path: "/name/0/family", value: lastname }
  ]).then(function(updatedPractitioner) {
    addPractitionerRow(updatedPractitioner);  
  });
  //// Because we reference 'this', we can't embed this inside of our .then(...) piece (or at least not without doing some more binding), so I just decided to stick it out here instead. That's why we were getting weird results in class, and I apologize for the confusion!
  this.row.parentNode.removeChild(this.row);
}



//// CREATING / INSERTING:
function addPractitioner() {
  //// Let's prompt the user for the pieces of info that we want to store about our new practitioner:
  var firstname = prompt("First name?");
  var lastname = prompt("Last name?");
  //// Let's create a minimal object structured the way a FHIR Practitioner resource would be structured:
  var practitioner = {
    "resourceType": "Practitioner",
    "name": {
      "given": [firstname],
      "family": lastname
    },
  }
  newPractitioner = client.create(practitioner).then(function(x) {
    addPractitionerRow(x);
  });
}

//// DELETING
//function deletePractitioner(practitioner_id) {
//  console.log(practitioner_id);
//}
function deletePractitioner() {
  //// Because of our binding in addPractitionerRow below, we now know that we will have a 'practitioner_id' property and a 'row' property. 'row' will refer to the TR (table row) in the DOM that contains this particular practitioner record
  if (confirm("Are you sure you want to delete this practitioner?")) {
    //// Whenever you 'bind' things to a function and run it, those variables are available as properties of the 'this' object
    client.delete("Practitioner/"+this.practitioner_id);
    //// Have the parent of the row we passed in remove the row from itself:
    this.row.parentNode.removeChild(this.row);
    //// Alternatively, we COULD have just re-read the entire set of results, but then we'd have to pass in the proper name search again, etc.
  }
}

//// READ
//// 'practitioner' Starts at data.entry[d].resource level in the data that client.request returns
function addPractitionerRow(practitioner) {
  //// Get a reference to practitionerResults tbody
  var practitionerResults = document.querySelector("#practitionerResults");
  //// Build a new table row (tr):
  var tr = document.createElement("tr");

  //// Create a table data cell (td)
  var td = document.createElement("td");
  //// Fill it with our first piece of info, which is our practitioner's first given name (first element in the 'given' array under the 'name' property's first entry)
  td.innerHTML = practitioner.name[0].given[0];
  tr.appendChild(td);
  var td = document.createElement("td");
  td.innerHTML = practitioner.name[0].family;
  tr.appendChild(td);
  var td = document.createElement("td");
  var btn = document.createElement("button");
  btn.innerHTML = "[X]";
  //// You can use <function>.bind({object}) to bind values to a function when attaching it to a listener like this. That way you make sure to maintain proper references.
  
  //// We want to make sure that LATER, when we CALL the function by clicking the button (when we're not in this loop anymore), that it still knows what the right practitioner/data/etc is:
  btn.onclick = deletePractitioner
              .bind({practitioner_id:practitioner.id, row:tr});
  //// Compare to this, where the ID will repeat incorrectly:
  //btn.onclick = function() {
  //  deletePractitioner(data.entry[d].resource.id);
  //}
  td.appendChild(btn);
  var btn = document.createElement("button");
  btn.innerHTML = "[Edit]";
  btn.onclick = updatePractitioner.bind({practitioner:practitioner, row:tr});
  td.appendChild(btn);
  tr.appendChild(td);

  //// Append that table row (tr) to my practitionerResults tbody
  practitionerResults.appendChild(tr);
}


function handlePractitioners(data) {
  //// Creating a reference to our tbody in our HTML so I can do things to change the content:
  var practitionerResults = document.querySelector("#practitionerResults");
  //// Clear the content by clearing out the innerHTML of our tbody
  practitionerResults.innerHTML = "";
  //console.log(data);
  //return;
  //// Check to make sure 'entry' even exists as a property in our data, because that's where our array of practitioner results will be:
  if (data.entry) {
    //// Then loop through it using a for-loop:
    for (var d=0; d<data.entry.length; d++) {
      //// Sometimes the API takes a bit to process everything. Let's just have a try/catch around this to avoid complications:
      
      //try {
        //// Here I'm calling another function that I will write to VISUALLY insert a row into my table. I'm doing this as a separate function so that I don't have to write all of the lines of code everywhere else that I want to use them.
        addPractitionerRow(data.entry[d].resource);
      //} catch(error) {
      //  console.log("Skipped a practitioner row due to incomplete data.");
      //}
    }
  }
}


function showPractitioners() {
  //// Basically doing this:
  //// https://r3.smarthealthit.org/Practitioner?name=...
  //// Keep in mind when displaying practitioners that this service seems to be caching requests and only refreshing every once in a while. Your changes me not immediately be apparent.
  var lastname = prompt("Name to search:");
  //if (confirm("Are you sure you want to pop up that name?")) {
  //  alert(lastname);
  //}
  client.request("Practitioner?name="+lastname)
    .then(handlePractitioners)
    .catch(console.error)
    ;
}
