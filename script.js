// === Your data (Questions + Anime Database) ===
const allQuestions = [ /* Paste all 100 questions here - same as before */ ];
const animeDatabase = [ /* Paste your 300 anime entries here */ ];

// For demo, using a smaller set - expand it
// ... (use the previous script.js data structure)

let currentQuestions = [];
let userAnswers = [];
let currentQuestionIndex = 0;
let genreScores = {};

function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

function startQuiz() {
    currentQuestions = shuffle(allQuestions).slice(0, 20);
    userAnswers = [];
    currentQuestionIndex = 0;
    genreScores = {};

    document.getElementById('intro-screen').classList.remove('active');
    document.getElementById('quiz-screen').classList.add('active');
    loadQuestion();
}

// Attach button listeners
document.getElementById('start-btn').addEventListener('click', startQuiz);

function loadQuestion() {
    const q = currentQuestions[currentQuestionIndex];
    document.getElementById('question-text').textContent = q.q;
    document.getElementById('question-counter').textContent = `${currentQuestionIndex + 1} / 20`;
    
    document.getElementById('progress').style.width = `${((currentQuestionIndex)/20)*100}%`;

    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';

    q.options.forEach((opt, i) => {
        const div = document.createElement('div');
        div.className = 'option';
        div.textContent = opt.t;
        div.addEventListener('click', () => selectOption(i, opt.genres));
        optionsDiv.appendChild(div);
    });

    document.getElementById('prev-btn').style.display = currentQuestionIndex > 0 ? 'block' : 'none';
}

function selectOption(idx, genres) {
    userAnswers[currentQuestionIndex] = {idx, genres};

    Object.keys(genres).forEach(g => {
        genreScores[g] = (genreScores[g] || 0) + genres[g];
    });

    if (currentQuestionIndex < 19) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        showResults();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) currentQuestionIndex--;
    loadQuestion();
}

function showResults() { /* Same as previous version */ }

function restartQuiz() {
    document.getElementById('results-screen').classList.remove('active');
    document.getElementById('intro-screen').classList.add('active');
}

function shareResults() {
    alert("🎉 Your results are ready to share!");
}

// Initialize
console.log("%cAnimeSphere loaded successfully!", "color:#00ffff;font-size:16px");
