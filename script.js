// Constants

const questions = [
  // Emotional Well-being
  {
    id: 1,
    question: "How often in the past two weeks have you felt sad or down?",
    options: ["Never", "Rarely", "Sometimes", "Frequently", "Almost every day"],
  },
  {
    id: 2,
    question:
      "How often in the past two weeks have you felt anxious or worried?",
    options: ["Never", "Rarely", "Sometimes", "Frequently", "Almost every day"],
  },
  {
    id: 3,
    question: "How often do you feel hopeless about the future?",
    options: ["Never", "Rarely", "Sometimes", "Frequently", "Almost every day"],
  },

  // Physical Symptoms
  {
    id: 4,
    question: "Have you noticed changes in your sleep patterns recently?",
    options: ["No changes", "Sleeping too much", "Sleeping too little", "Both"],
  },
  {
    id: 5,
    question:
      "How often do you feel physically exhausted without a clear reason?",
    options: ["Never", "Rarely", "Sometimes", "Frequently", "Almost every day"],
  },
  {
    id: 6,
    question:
      "Do you experience physical symptoms like headaches or stomachaches when stressed?",
    options: ["Never", "Rarely", "Sometimes", "Frequently", "Always"],
  },

  // Behavioral Patterns
  {
    id: 7,
    question:
      "Have you lost interest in activities you used to enjoy in the past two weeks?",
    options: ["No", "Occasionally", "Frequently", "Always"],
  },
  {
    id: 8,
    question:
      "Do you feel overwhelmed by small tasks or responsibilities in your daily life?",
    options: ["Never", "Rarely", "Sometimes", "Frequently", "Always"],
  },

  // Self-Esteem and Social Support
  {
    id: 9,
    question: "How would you rate your self-esteem over the past month?",
    options: ["High", "Moderate", "Low", "Very low"],
  },
  {
    id: 10,
    question:
      "Do you feel supported by your friends, family, or community when you need help?",
    options: ["Yes, completely", "Somewhat", "Not much", "Not at all"],
  },

  // Coping and Strength-Based Questions
  {
    id: 11,
    question: "What activities help you relax or feel happy when stressed?",
    options: [
      "Spending time with loved ones",
      "Exercising or physical activity",
      "Engaging in hobbies",
      "Other (please specify)",
    ],
  },
  {
    id: 12,
    question:
      "How often do you practice self-care (e.g., rest, hobbies, exercise)?",
    options: ["Never", "Rarely", "Sometimes", "Frequently", "Almost every day"],
  },

  // Stress and Triggers
  {
    id: 13,
    question: "Have you experienced any major life changes recently?",
    options: [
      "No",
      "Yes, positive changes",
      "Yes, negative changes",
      "Yes, both positive and negative changes",
    ],
  },
  {
    id: 14,
    question:
      "Do specific situations or events often make you feel stressed or anxious?",
    options: ["No", "Occasionally", "Frequently", "Always"],
  },

  // Risk Assessment
  {
    id: 15,
    question:
      "Have you experienced thoughts of self-harm or harming others in the past month?",
    options: ["No", "Rarely", "Sometimes", "Frequently"],
  },

  // Readiness for Help
  {
    id: 16,
    question:
      "Would you consider seeking professional help for your mental health?",
    options: ["Yes", "No", "Maybe", "I’m already receiving help"],
  },
];

const QUIZ_LENGTH = 16;
const CLASSES = {
  option: "option flex items-center gap-2",
  input: "rounded-full h-4 w-4 border-gray-300 accent-green-600",
  label: "text-sm font-medium text-gray-700",
  nextBtn:
    "next bg-[#50ffb1] hover:bg-green-300 text-white font-bold py-2 px-4 rounded mb-1",
};

// Selectors
const selectors = {
  mainQuiz: ".quiz",
  questionNumber: ".num",
  questionText: ".ques",
  optionsContainer: ".options",
  nextButton: "#nextBtn",
  proceedButton: ".proceed",
  stepsSection: ".steps",
  message: ".message",
  stepsList: ".steps ul",
  feedMsg: "#feed-msg",
  thankMsg: ".thanks",
  msgClose: ".msg-close",
  tmsgClose: ".tmsg-close",
};

const elements = {};
for (const [key, selector] of Object.entries(selectors)) {
  elements[key] = document.querySelector(selector);
}

// Quiz Data and Answers
let answers = {};
let currentQuestionIndex = 0;

// Generate Quiz
const renderQuestion = (questionData) => {
  elements.questionNumber.innerText = `Question ${questionData.id} of ${QUIZ_LENGTH}`;
  elements.questionText.innerText = questionData.question;
  elements.optionsContainer.innerHTML = "";

  questionData.options.forEach((option) => {
    const optionDiv = document.createElement("div");
    optionDiv.className = CLASSES.option;

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "option";
    input.value = option;
    input.className = CLASSES.input;

    const label = document.createElement("label");
    label.className = CLASSES.label;
    label.innerText = option;

    optionDiv.appendChild(input);
    optionDiv.appendChild(label);
    elements.optionsContainer.appendChild(optionDiv);

    // Handle the "Other (please specify)" option
    if (option === "Other (please specify)") {
      input.addEventListener("change", () => {
        // Create and display the input field below the option
        const otherInput = document.createElement("input");
        otherInput.type = "text";
        otherInput.placeholder = "Please specify...";
        otherInput.className = "mt-2 p-2 border rounded w-full"; // Styling to make it appear below

        // Handle saving the custom response
        otherInput.addEventListener("input", () => {
          answers[questionData.question] = otherInput.value;
        });

        elements.optionsContainer.appendChild(otherInput);
      });
    } else {
      input.addEventListener("change", () => {
        answers[questionData.question] = input.value;
      });
    }
  });
};

const renderQuiz = (questions) => {
  if (currentQuestionIndex < questions.length) {
    renderQuestion(questions[currentQuestionIndex]);
  } else {
    endQuiz();
  }
};

const startQuiz = () => {
  elements.nextButton.addEventListener("click", () => {
    const selectedOption = document.querySelector(
      'input[name="option"]:checked'
    );
    if (!selectedOption) {
      alert("Please select an option before proceeding.");
      return;
    }
    currentQuestionIndex++;
    renderQuiz(questions);
  });

  renderQuiz(questions);
};

// End Quiz
const endQuiz = () => {
  elements.questionNumber.innerText = "Quiz Completed";
  elements.questionText.innerText = "Thank you for taking the quiz!";
  elements.optionsContainer.innerHTML = "";
  elements.nextButton.style.display = "none";

  const proceedBtn = document.createElement("button");
  proceedBtn.className =
    "proceed bg-[#50ffb1] hover:bg-green-300 text-white font-bold py-2 px-4 rounded m-auto";
  proceedBtn.innerText = "Proceed";
  elements.mainQuiz.appendChild(proceedBtn);

  proceedBtn.addEventListener("click", generateSteps);
};

// Generate Steps
const generateSteps = async () => {
  try {
    elements.mainQuiz.classList.add("hidden");
    elements.questionNumber.classList.add("hidden");
    elements.stepsSection.classList.remove("hidden");

    elements.message.innerHTML = `
      <div class="flex flex-col justify-center items-center">
        <l-hourglass size="40" bg-opacity="0.1" speed="1.75" color="black" class="mb-3"></l-hourglass>
        Analyzing your responses...
      </div>
    `;

    const ansData = JSON.stringify(answers, null, 2);

    const prompt = `
      Based on the following user data, generate a JSON response with two arrays:
      1. "messages": Summary of the user's mental health in 3-4 lines.
      2. "actions": Actionable steps with a brief description for each.
      Here's the data: ${ansData}
    `;

    const apiResponse = await fetchAI(prompt);
    createUI(apiResponse);
  } catch (error) {
    elements.message.innerHTML = "Failed to load data. Please try again.";
    console.error("Error generating steps:", error);
  }
};

// Fetch AI Data
const fetchAI = async (prompt) => {
  let apiKey = "AIzaSyArGBlyXd4CBUVvVgN2UPzXwbG78vFXhIU";
  let url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const responseData = await response.json();
  const jsonData = responseData.candidates[0].content.parts[0].text
    .replace("```json", "")
    .replace("```", "");

  return JSON.parse(jsonData);
};

// Create UI for Results
const createUI = (data) => {
  elements.message.innerHTML = data.messages.join(" ");
  data.actions.forEach((step, index) => {
    const stepItem = document.createElement("li");
    stepItem.className = "step w-2/3 m-4 bg-gray-100 rounded-xl p-5";
    stepItem.innerHTML = `
      <h2 class="text-center font-bold">Step ${index + 1}: ${step.action}</h2>
      <p class="text-center my-2">${step.description}</p>
    `;
    elements.stepsList.appendChild(stepItem);

    setTimeout(() => {
      elements.feedMsg.classList.remove("hidden");
    }, 5000);
  });
};

// Close Message
elements.msgClose.addEventListener("click", () => {
  elements.feedMsg.classList.add("hidden");
  // elements.thankMsg.classList.add("hidden");
});

elements.tmsgClose.addEventListener("click", () => {
  elements.thankMsg.classList.add("hidden");
});

// Initialize Quiz
startQuiz();
