// Menu responsive
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");
    const expanded = navMenu.classList.contains("active");
    menuToggle.setAttribute("aria-expanded", expanded ? "true" : "false");
  });
}

// Fermer le menu quand on clique sur un lien
const navLinks = document.querySelectorAll(".menu a");

navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    if (navMenu) {
      navMenu.classList.remove("active");
    }
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

// Indiquer la section active dans la page CV
const cvSectionIds = ["Profil", "Formation", "Robotique", "Enseignement", "Competences", "Stages", "Loisirs"];
const cvSections = cvSectionIds
  .map(function (id) { return document.getElementById(id); })
  .filter(Boolean);

if (cvSections.length > 0) {
  window.addEventListener("scroll", function () {
    let currentId = "Accueil";

    cvSections.forEach(function (section) {
      const sectionTop = section.offsetTop - 140;
      if (window.scrollY >= sectionTop) {
        currentId = section.id;
      }
    });

    document.querySelectorAll(".cv-menu a[href^='#'], .cv-menu a[href^='cv.html#']").forEach(function (link) {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      if (href === "#" + currentId || href === "cv.html#" + currentId) {
        link.classList.add("active");
      }
    });
  });
}

// Audio de la leçon Scratch avec la voix du navigateur
const playLessonAudio = document.getElementById("playLessonAudio");
const stopLessonAudio = document.getElementById("stopLessonAudio");

const lessonText =
  "Bonjour les élèves. Aujourd’hui, nous allons découvrir Scratch. " +
  "Scratch est un logiciel qui permet de créer des histoires, des jeux et des animations. " +
  "Dans Scratch, le personnage s’appelle le lutin. " +
  "La scène est l’endroit où se passe l’animation. " +
  "Les blocs servent à donner des instructions au lutin. " +
  "Par exemple, on peut utiliser un bloc pour faire avancer le lutin, " +
  "ou pour lui faire dire bonjour. " +
  "Maintenant, écoute bien la leçon, fais les activités, puis réponds au quiz pour connaître ton score.";

if (playLessonAudio) {
  playLessonAudio.addEventListener("click", function () {
    speechSynthesis.cancel();

    const audio = new SpeechSynthesisUtterance(lessonText);
    audio.lang = "fr-FR";
    audio.rate = 0.9;
    audio.pitch = 1;

    speechSynthesis.speak(audio);
  });
}

if (stopLessonAudio) {
  stopLessonAudio.addEventListener("click", function () {
    speechSynthesis.cancel();
  });
}

// Activité interactive 1 : faire bouger le lutin
const moveSpriteBtn = document.getElementById("moveSpriteBtn");
const sprite = document.getElementById("sprite");
const spriteMessage = document.getElementById("spriteMessage");

let spriteMoved = false;

if (moveSpriteBtn && sprite && spriteMessage) {
  moveSpriteBtn.addEventListener("click", function () {
    spriteMoved = !spriteMoved;

    if (spriteMoved) {
      sprite.classList.add("move");
      spriteMessage.textContent = "Bravo ! Le lutin a avancé grâce à ton instruction.";
    } else {
      sprite.classList.remove("move");
      spriteMessage.textContent = "Le lutin est revenu à sa place.";
    }
  });
}

// Activité interactive 2 : ordre des blocs
const checkOrderBtn = document.getElementById("checkOrderBtn");
const orderResult = document.getElementById("orderResult");

if (checkOrderBtn && orderResult) {
  checkOrderBtn.addEventListener("click", function () {
    const step1 = document.getElementById("step1").value;
    const step2 = document.getElementById("step2").value;
    const step3 = document.getElementById("step3").value;

    orderResult.className = "message";

    if (step1 === "" || step2 === "" || step3 === "") {
      orderResult.classList.add("error");
      orderResult.textContent = "Merci de choisir les trois étapes.";
      return;
    }

    if (step1 === "flag" && step2 === "move" && step3 === "say") {
      orderResult.classList.add("success");
      orderResult.textContent = "Excellent ! L’ordre est correct : drapeau vert, avancer, dire Bonjour.";
    } else {
      orderResult.classList.add("error");
      orderResult.textContent = "Essaie encore. Pense d’abord au bloc qui commence le programme.";
    }
  });
}

// Activité interactive 3 : choisir le bon bloc
const choiceButtons = document.querySelectorAll(".choice-btn");
const blockChoiceResult = document.getElementById("blockChoiceResult");

if (choiceButtons.length > 0 && blockChoiceResult) {
  choiceButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      choiceButtons.forEach(function (btn) {
        btn.classList.remove("correct-choice", "wrong-choice");
      });

      blockChoiceResult.className = "message";
      if (button.dataset.correct === "true") {
        button.classList.add("correct-choice");
        blockChoiceResult.classList.add("success");
        blockChoiceResult.textContent = "Bravo ! Le bloc « Dire Bonjour ! » correspond à la mission.";
      } else {
        button.classList.add("wrong-choice");
        blockChoiceResult.classList.add("error");
        blockChoiceResult.textContent = "Essaie encore. Cherche le bloc qui permet au lutin de parler.";
      }
    });
  });
}

// Quiz Scratch EB3
const quizData = [
  {
    question: "1. Dans Scratch, comment s’appelle le personnage ?",
    options: ["Le décor", "Le lutin", "Le bouton"],
    correct: 1
  },
  {
    question: "2. À quoi sert la scène dans Scratch ?",
    options: [
      "À montrer l’endroit où se passe l’animation",
      "À écrire seulement le nom de l’élève",
      "À supprimer le programme"
    ],
    correct: 0
  },
  {
    question: "3. Que fait le bloc « avancer de 10 pas » ?",
    options: [
      "Il fait bouger le lutin",
      "Il change la langue",
      "Il ferme Scratch"
    ],
    correct: 0
  },
  {
    question: "4. Quel bouton lance souvent un programme Scratch ?",
    options: ["La poubelle", "Le drapeau vert", "La gomme"],
    correct: 1
  },
  {
    question: "5. Scratch aide les élèves à apprendre...",
    options: [
      "La programmation et la logique",
      "Seulement le chant",
      "Seulement le sport"
    ],
    correct: 0
  },
  {
    question: "6. Les blocs Scratch servent à...",
    options: [
      "Donner des instructions au lutin",
      "Éteindre l’ordinateur",
      "Changer le clavier"
    ],
    correct: 0
  }
];

const quizContainer = document.getElementById("quizContainer");
const submitQuiz = document.getElementById("submitQuiz");
const resetQuiz = document.getElementById("resetQuiz");
const quizResult = document.getElementById("quizResult");

let userAnswers = new Array(quizData.length).fill(null);

function loadQuiz() {
  if (!quizContainer) return;

  quizContainer.innerHTML = "";
  userAnswers = new Array(quizData.length).fill(null);

  quizData.forEach(function (item, questionIndex) {
    const questionBox = document.createElement("div");
    questionBox.classList.add("quiz-question");

    const questionTitle = document.createElement("h3");
    questionTitle.textContent = item.question;
    questionBox.appendChild(questionTitle);

    item.options.forEach(function (optionText, optionIndex) {
      const optionButton = document.createElement("button");
      optionButton.classList.add("option");
      optionButton.textContent = optionText;
      optionButton.type = "button";

      optionButton.addEventListener("click", function () {
        selectAnswer(questionIndex, optionIndex, questionBox);
      });

      questionBox.appendChild(optionButton);
    });

    quizContainer.appendChild(questionBox);
  });
}

function selectAnswer(questionIndex, optionIndex, questionBox) {
  userAnswers[questionIndex] = optionIndex;

  const options = questionBox.querySelectorAll(".option");

  options.forEach(function (option) {
    option.classList.remove("selected");
  });

  options[optionIndex].classList.add("selected");
}

if (submitQuiz && quizResult) {
  submitQuiz.addEventListener("click", function () {
    let score = 0;
    const questionBoxes = document.querySelectorAll(".quiz-question");

    quizData.forEach(function (item, questionIndex) {
      const options = questionBoxes[questionIndex].querySelectorAll(".option");

      options.forEach(function (option, optionIndex) {
        option.disabled = true;
        option.classList.remove("correct", "wrong");

        if (optionIndex === item.correct) {
          option.classList.add("correct");
        }

        if (userAnswers[questionIndex] === optionIndex && optionIndex !== item.correct) {
          option.classList.add("wrong");
        }
      });

      if (userAnswers[questionIndex] === item.correct) {
        score++;
      }
    });

    quizResult.className = "quiz-result";

    if (score >= 5) {
      quizResult.classList.add("good");
      quizResult.textContent = "Excellent ! Ton score est " + score + "/" + quizData.length + ".";
    } else if (score >= 3) {
      quizResult.classList.add("medium");
      quizResult.textContent = "Bien essayé ! Ton score est " + score + "/" + quizData.length + ".";
    } else {
      quizResult.classList.add("bad");
      quizResult.textContent = "Tu peux relire la leçon puis recommencer. Ton score est " + score + "/" + quizData.length + ".";
    }
  });
}

if (resetQuiz && quizResult) {
  resetQuiz.addEventListener("click", function () {
    quizResult.className = "quiz-result";
    quizResult.textContent = "";
    loadQuiz();
  });
}

loadQuiz();
