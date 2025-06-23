function renderQuestionnaire(questionnaire) {
  // Extract the questionnaire title and questions
  const questionnaireTitle = questionnaire.title;
  const questionnaireQuestions = questionnaire.item;

  // Generate the HTML for each question and answer options
  let questionsHtml = "";
  for (const question of questionnaireQuestions) {
    const questionText = question.text;
    const questionId = question.linkId;
    const answerOptions = question.answerOption;
    let answerOptionsHtml = "";
    for (const option of answerOptions) {
      const optionValue = option.valueCoding.code;
      const optionText = option.valueCoding.display;
      const inputType = option.valueCoding.system ? "radio" : "text";
      const answerOptionHtml = `
        <label>
          <input type="${inputType}" name="${questionId}" value="${optionValue}">
          ${optionText}
        </label>
        <br>
      `;
      answerOptionsHtml += answerOptionHtml;
    }
    const questionHtml = `
      <h2>${questionText}</h2>
      ${answerOptionsHtml}
    `;
    questionsHtml += questionHtml;
  }

  // Generate the HTML for the entire questionnaire form
  const formHtml = `
    <h1>${questionnaireTitle}</h1>
    <form id="questionnaire-form">
      ${questionsHtml}
      <input type="submit" value="Submit">
    </form>
  `;

  // Render the HTML to the page
  document.getElementById("questionnaire-container").innerHTML = formHtml;

  // Add an event listener to the form to handle submission
  document
    .getElementById("questionnaire-form")
    .addEventListener("submit", handleFormSubmit);
}

async function handleFormSubmit(event) {
  event.preventDefault();

  // Get the questionnaire response resource
  const questionnaireResponse = await getClient().create({
    resourceType: "QuestionnaireResponse",
    questionnaire: "Questionnaire/44047-5",
    status: "completed",
    item: Array.from(new FormData(event.target)).map(
      ([questionLinkId, answerValue]) => {
        return {
          linkId: questionLinkId,
          answer: [
            {
              valueCoding: {
                code: answerValue,
              },
            },
          ],
        };
      }
    ),
  });

  // Calculate the total score
  let totalScore = 0;
  for (const answer of questionnaireResponse.item) {
    const answerValue = parseInt(answer.answer[0].valueCoding.code);
    totalScore += answerValue;
  }

  // Display the total score to the user
  alert(`Total score: ${totalScore}`);
}

function getClient() {
  // Get the FHIR client object using the SMART on FHIR authorization flow
  const smart = FHIR.client({
    serverUrl: "https://r3.smarthealthit.org",
    clientId: "my-client-id",
    scope: "launch/patient openid profile",
  });
  return smart;
}

// Retrieve the questionnaire and render it when the page loads
getClient().request("/forms.loinc.org/71354-5").then(renderQuestionnaire);
