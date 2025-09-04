const decisionTree = {
  question: "Are there signs of EXTRA-ABDOMINAL cause?",
  answers: {
    "Sweet/fruity breath + Diabetes history": {
      diagnosis: "Diabetic Ketoacidosis",
      tests: "Blood sugar, ketones, arterial blood gas"
    },
    "Productive cough + fever": {
      diagnosis: "Pneumonia (upper lobe)",
      tests: "Chest X-ray, sputum culture"
    },
    "Shock + chest pain/shortness of breath": {
      diagnosis: "Myocardial Infarction",
      tests: "ECG, cardiac enzymes"
    },
    "History of epilepsy/migraine": {
      diagnosis: "Abdominal seizure/migraine",
      tests: "EEG"
    },
    "Black ancestry + pain crisis": {
      diagnosis: "Sickle Cell Crisis",
      tests: "Sickle cell prep, CBC"
    },
    "Known black widow spider bite": {
      diagnosis: "Black Widow envenomation",
      tests: "Clinical evaluation"
    },
    "None": {
      question: "Is the pain intermittent and colicky (comes in waves)?",
      answers: {
        "Yes": {
          question: "Where is the pain located?",
          answers: {
            "Hyperactive bowel sounds + tympany": {
              diagnosis: "Intestinal Obstruction",
              tests: "Abdominal X-ray, CT scan if needed"
            },
            "Right upper abdomen + jaundice/dark urine": {
              diagnosis: "Gallstones (Cholelithiasis / Choledocholithiasis)",
              tests: "Ultrasound, HIDA scan"
            },
            "Flank/side pain + blood in urine": {
              diagnosis: "Kidney Stones (Nephrolithiasis)",
              tests: "CT scan, IVP"
            },
            "Abdomen rigid, 'board-like'": {
              diagnosis: "Perforated ulcer",
              tests: "X-ray for free air under diaphragm"
            }
          }
        },
        "No": {
          question: "Where is the pain most severe?",
          answers: {
            "Lower abdomen": {
              diagnosis: "Appendicitis, Salpingitis, Ectopic Pregnancy, Diverticulitis, Crohn’s disease, Mittelschmerz",
              tests: "Ultrasound or CT, pregnancy test if female"
            },
            "Right upper abdomen": {
              diagnosis: "Acute Cholecystitis",
              tests: "Ultrasound"
            },
            "Upper middle abdomen + shock": {
              diagnosis: "Acute Pancreatitis",
              tests: "Serum amylase/lipase, CT scan"
            },
            "Bloody stool + severe pain": {
              diagnosis: "Mesenteric Thrombosis/Embolism or Intussusception (children)",
              tests: "Angio-CT, Ultrasound"
            }
          }
        }
      }
    }
  }
};

let currentNode;

function showNode(node) {
  const qDiv = document.getElementById("question");
  const aDiv = document.getElementById("answers");
  const rDiv = document.getElementById("result");

  qDiv.textContent = "";
  aDiv.innerHTML = "";
  rDiv.textContent = "";

  if (node.diagnosis) {
    rDiv.innerHTML = `<b>Possible Diagnosis:</b> ${node.diagnosis}<br><b>Suggested Tests:</b> ${node.tests}`;
  } else {
    qDiv.textContent = node.question;
    for (let ans in node.answers) {
      let btn = document.createElement("button");
      btn.textContent = ans;
      btn.onclick = () => {
        currentNode = node.answers[ans];
        showNode(currentNode);
      };
      aDiv.appendChild(btn);
    }
  }
}

function startOver() {
  currentNode = decisionTree;
  showNode(currentNode);
}

// Start on load
startOver();
