const bank = [
  { q: "1+1=?", c: "2", w: ["1","3","4"] },
  { q: "2+2=?", c: "4", w: ["2","3","5"] },
  { q: "Монгол улсын нийслэл?", c: "Улаанбаатар", w: ["Дархан","Ховд","Эрдэнэт"] }
];

const TOTAL_QUESTIONS = 3;

function shuffle(arr){
  return arr.sort(() => Math.random() - 0.5);
}

let quiz = [];
let current = 0;
let score = 0;
let answered = false;

function generateQuiz(){
  quiz = shuffle([...bank]).slice(0, TOTAL_QUESTIONS).map(q => {
    let wrong = shuffle([...q.w]).slice(0,3);
    return {
      question: q.q,
      answers: shuffle([q.c, ...wrong]),
      correct: q.c
    };
  });
}

function loadQuestion(){
  answered = false;
  let q = quiz[current];

  document.getElementById("question").innerText =
    `${current+1}. ${q.question}`;

  let html = "";
  q.answers.forEach(ans => {
    html += `<button onclick="selectAnswer('${ans}', this)">${ans}</button>`;
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
    document.getElementById("answers").innerHTML = "";
  }
}

// START
generateQuiz();
loadQuestion();
