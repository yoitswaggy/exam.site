const TOTAL_QUESTIONS = 20;
const EXAM_TIME = 600;

function shuffle(arr){
  return arr.sort(() => Math.random() - 0.5);
}

function generateBetterOptions(bank){
  return bank.map((q, i) => {
    let wrongPool = [...q.w];

    if (wrongPool.length < 3) {
      let extra = bank
        .filter((_, idx) => idx !== i)
        .map(item => item.c);

      wrongPool = [...wrongPool, ...extra];
    }

    wrongPool = shuffle(wrongPool).slice(0,3);

    return {
      q: q.q,
      c: q.c,
      options: shuffle([q.c, ...wrongPool])
    };
  });
}

let quiz = [];

function generateQuiz(){
  let improvedBank = generateBetterOptions(bank);

  quiz = shuffle([...improvedBank])
    .slice(0, TOTAL_QUESTIONS)
    .map(q => ({
      question: q.q,
      answers: q.options,
      correct: q.c
    }));
}

let current = 0;
let score = 0;
let answered = false;

function loadQuestion(){
  answered = false;

  let q = quiz[current];

  document.getElementById("question").innerText =
    `${current + 1}. ${q.question}`;

  let html = "";

  q.answers.forEach(ans => {
    html += `<button onclick="selectAnswer(this.textContent, this)">${ans}</button>`;
  });

  document.getElementById("answers").innerHTML = html;
}

function selectAnswer(ans, btn){
  if(answered) return;

  answered = true;

  if(ans === quiz[current].correct){
    btn.style.background = "lightgreen";
    score++;
  } else {
    btn.style.background = "salmon";
  }
}

function nextQuestion(){
  if(!answered){
    alert("Хариултаа сонго!");
    return;
  }

  current++;

  if(current < quiz.length){
    loadQuestion();
  } else {
    document.getElementById("question").innerText = "Дууслаа!";
  }
}

generateQuiz();
loadQuestion();
