//----QUESTION FOR USERS----//
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

let main = document.querySelector(".quiz");
let num = document.querySelector(".num");
let ques = document.querySelector(".ques");
let options = document.querySelector(".options");
let next = document.querySelector("#nextBtn");
let proceed = document.querySelector(".proceed");
let ans = {};

//------GENERATING QUIZ-------//

const generateQuiz = (quiz) => {
  let count = 0;

  const renderQuiz = () => {
    if (count < quiz.length) {
      const data = quiz[count];
      num.innerText = `Question ${data.id} of 16`;
      ques.innerText = data.question;
      options.innerHTML = ""; // Clear existing options

      // Dynamically create and style each option
      data.options.forEach((option) => {
        const div = document.createElement("div");
        div.className = "option flex items-center gap-2"; // Apply CSS to the div container

        const input = document.createElement("input");
        input.type = "radio";
        input.name = "option";
        input.value = option;
        input.className =
          "rounded-full h-4 w-4 border-gray-300 accent-green-600"; // Apply styling

        const label = document.createElement("label");
        label.className = "text-sm font-medium text-gray-700"; // Apply label styling
        label.innerText = option;

        // Append input and label to the div
        div.appendChild(input);
        div.appendChild(label);

        // Append the div to the options container
        options.appendChild(div);

        // Add change event listener to each input
        input.addEventListener("change", (e) => {
          ans[data.question] = e.target.value;
        });
      });
    } else {
      endQuiz();
    }
  };

  // Initial render
  renderQuiz();

  // Next button click event
  next.addEventListener("click", () => {
    count++;
    renderQuiz();
  });
};

generateQuiz(questions);

//------END QUIZ PROCEED-------//
const endQuiz = () => {
  num.innerText = "Quiz Completed";
  ques.innerText = "Thank you for taking the quiz!";
  options.innerHTML = "";
  next.style.display = "none";

  const proceedBtn = document.createElement("button");
  proceedBtn.className =
    "proceed  bg-[#50ffb1] hover:bg-green-300 text-white font-bold py-2 px-4 rounded m-auto";
  proceedBtn.innerText = "Proceed";
  main.appendChild(proceedBtn);

  proceedBtn.addEventListener("click", () => {
    generateSteps();
  });
};

//------FETCH DATA FROM AI-------//
const generateSteps = () => {
  main.classList.add("hidden");
  num.classList.add("hidden");
  options.classList.add("hidden");
  document.querySelector(".steps").classList.remove("hidden");

  const message = document.querySelector(".message");
  const list = document.querySelector(".steps ul");
  message.innerHTML = `
   <div class ="flex flex-col justify-center items-center">
    <l-hourglass
    size="40"
    bg-opacity="0.1"
    speed="1.75"
    color="black"
    class="mb-3"
    ></l-hourglass>
    Analyzing your responses...
   </div>
     
    
    `; // Show a loading message
  list.innerHTML = ""; // Clear any previous content

  // Convert ans object to JSON string
  const ansData = JSON.stringify(ans, null, 2);

  let text = `Based on the following user data, generate a json response with two arrays. 
The first array is named "messages" and contains a concise summary of the user's mental health issues or indicates there are no issues in just 3-4 lines. 
The second array is named "actions" and contains actionable steps or tasks the user should take to improve their situation. Each step should be concise, practical, and tailored to the user’s needs. Include a brief description for each step to explain its purpose and how it will help. Avoid vague or overly general suggestions.

Here's the data:
${ansData}`;

  let apiKey = "AIzaSyArGBlyXd4CBUVvVgN2UPzXwbG78vFXhIU";
  let url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  let requestData = {
    contents: [
      {
        parts: [
          {
            text: text,
          },
        ],
      },
    ],
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((response) => {
      let jsonData = response.candidates[0].content.parts[0].text
        .replace("```json", "")
        .replace("```", "");
      const data = JSON.parse(jsonData);
      creatUI(data);
    })
    .catch((error) => {
      console.error("Error fetching AI-generated data:", error);
      message.innerHTML = "Failed to load data. Please try again."; // Show error message
    });
};

//------SHOW DATA TO THE DASHBOARD-------//
const creatUI = (data) => {
  const main = document.querySelector(".steps");
  const message = document.querySelector(".message");
  const list = document.querySelector(".steps ul");
  message.innerHTML = "";
  message.innerHTML = data.messages.reduce((acc, str) => acc + str, "");

  data.actions.forEach((step) => {
    let li = document.createElement("li");
    li.className = "step w-2/3 m-4 bg-gray-100 rounded-xl p-5";
    li.innerHTML = `
      <h2 class="text-center font-bold">${step.step}</h2>
          <p class="text-center my-2">
            ${step.description}
          </p>
      `;

    list.appendChild(li);
  });
};
