// ----------------- Decision Tree -----------------
const decisionTree = {
  question: "Are there signs of EXTRA-ABDOMINAL cause?",
  answers: {
    "Sweet/fruity breath + Diabetes history": {
      diagnosis: ["Diabetic Acidosis"],
      tests: ["Blood glucose, Urine ketones, ABG"]
    },
    "Productive cough + fever": {
      diagnosis: ["Pneumonia"],
      tests: ["Chest X-ray, Sputum analysis"]
    },
    "Shock + chest pain/shortness of breath": {
      diagnosis: ["Myocardial Infarction"],
      tests: ["ECG, Cardiac enzymes"]
    },
    "History of epilepsy/migraine": {
      diagnosis: ["Abdominal Migraine / Aura"],
      tests: ["EEG, Clinical history"]
    },
    "Black ancestry + pain crisis": {
      diagnosis: ["Sickle Cell Crisis"],
      tests: ["Sickle Cell prep, CBC"]
    },
    "Known black widow spider bite": {
      diagnosis: ["Black Widow Bite Reaction"],
      tests: ["Observation, Symptomatic treatment"]
    },
    "None": {
      question: "Is the pain intermittent and colicky?",
      answers: {
        "Yes": {
          question: "Where is the pain located?",
          answers: {
            "Right Upper Quadrant (RUQ)": {
              diagnosis: ["Cholelithiasis / Choledocholithiasis"],
              tests: ["Ultrasound of Gallbladder", "HIDA Scan"]
            },
            "Flank": {
              diagnosis: ["Nephrolithiasis (Kidney Stones)"],
              tests: ["IVP or CT Scan"]
            },
            "Generalized / Tympanic": {
              diagnosis: ["Intestinal Obstruction"],
              tests: ["Abdominal X-ray (Flat plate)"]
            }
          }
        },
        "No": {
          question: "Is the pain persistent and localized?",
          answers: {
            "Lower Quadrant": {
              diagnosis: ["Appendicitis", "Salpingitis", "Ectopic Pregnancy", "Diverticulitis", "Regional Ileitis", "Mittelschmerz"],
              tests: ["Ultrasound / CT Scan", "Pregnancy test", "Blood tests"]
            },
            "Right Upper Quadrant": {
              diagnosis: ["Acute Cholecystitis"],
              tests: ["Ultrasound, CBC, Liver function tests"]
            },
            "Patient in Shock": {
              diagnosis: ["Acute Pancreatitis"],
              tests: ["Serum amylase/lipase, Ultrasound"]
            },
            "Bloody Stool": {
              diagnosis: ["Mesenteric Ischemia", "Intussusception"],
              tests: ["Angio-CT, Ultrasound"]
            }
          }
        }
      }
    }
  }
};

// ----------------- State Variables -----------------
let currentNode = decisionTree;
let history = [];

// ----------------- HTML Elements -----------------
const questionContainer = document.getElementById("question-container");
const answersContainer = document.getElementById("answers-container");
const resultContainer = document.getElementById("result-container");
const backBtn = document.getElementById("backBtn");
const restartBtn = document.getElementById("restartBtn");

// ----------------- Functions -----------------
function askQuestion() {
  // Clear previous
  questionContainer.innerHTML = "";
  answersContainer.innerHTML = "";
  resultContainer.innerHTML = "";

  // Show back button if history exists
  backBtn.style.display = history.length > 0 ? "inline-block" : "none";

  // Show Start Over only if we are past first question
  restartBtn.style.display = history.length > 0 ? "inline-block" : "none";

  // If we reached diagnosis
  if (currentNode.diagnosis) {
    questionContainer.innerHTML = "<strong>Possible Diagnoses:</strong>";
    resultContainer.innerHTML = `<ul>
      ${currentNode.diagnosis.map(d => `<li>${d}</li>`).join('')}
      </ul>
      <strong>Recommended Tests:</strong>
      <ul>${currentNode.tests.map(t => `<li>${t}</li>`).join('')}</ul>`;
    return;
  }

  // Show question
  questionContainer.textContent = currentNode.question;

  // Show answer buttons
  for (let answer in currentNode.answers) {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.addEventListener("click", () => {
      history.push(currentNode); // save current node
      currentNode = currentNode.answers[answer];
      askQuestion();
    });
    answersContainer.appendChild(btn);
  }
}

// ----------------- Back Button -----------------
backBtn.addEventListener("click", () => {
  if (history.length > 0) {
    currentNode = history.pop();
    askQuestion();
  }
});

// ----------------- Start Over Button -----------------
restartBtn.addEventListener("click", () => {
  currentNode = decisionTree;
  history = [];
  askQuestion();
});

// ----------------- Initialize -----------------
askQuestion();
