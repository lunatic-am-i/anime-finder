/* ── state ── */
let currentQuestion = 0;
const taste = {
    action: 0,
    romance: 0,
    emotional: 0,
    comedy: 0,
    fantasy: 0,
    mind: 0,
    thriller: 0,
    mystery: 0,
    psychological: 0,
    sciFi: 0,
    dark: 0,
    wholesome: 0,
    sliceOfLife: 0,
    horror: 0,
    adventure: 0,
    nostalgia: 0,
};

/* ── DOM refs ── */
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const resultEl = document.getElementById('result');
const quizEl = document.getElementById('quiz');
const progressBar = document.querySelector('.progress-bar');
const progressText = document.getElementById('progressText');
const tasteGrid = document.getElementById('tasteGrid');
const personalityEl = document.getElementById('personality');
const recContainer = document.getElementById('recommendations');

/* ── 40 question pool ── */
const questionPool = [
    /* core */
    {
        question: 'What excites you most in anime?',
        answers: [
            { text: 'Epic battles', score: { action: 3 } },
            { text: 'Deep story twists', score: { mind: 3, thriller: 1 } },
            { text: 'Romantic feelings', score: { romance: 3 } },
            { text: 'Funny chaos', score: { comedy: 3 } },
        ],
    },
    {
        question: 'Pick your vibe',
        answers: [
            { text: 'Dark and serious', score: { dark: 3, thriller: 1 } },
            { text: 'Bright and happy', score: { wholesome: 3 } },
            { text: 'Emotional journey', score: { emotional: 3 } },
            { text: 'Mysterious world', score: { mystery: 3 } },
        ],
    },
    {
        question: 'What pacing do you prefer?',
        answers: [
            { text: 'Fast and intense', score: { action: 3 } },
            { text: 'Slow emotional build', score: { emotional: 3 } },
            { text: 'Mind-game focused', score: { mind: 3 } },
            { text: 'Relaxed comedy flow', score: { comedy: 3 } },
        ],
    },
    {
        question: 'Your ideal world?',
        answers: [
            { text: 'Fantasy kingdom', score: { fantasy: 3 } },
            { text: 'Sci-fi future city', score: { sciFi: 3 } },
            { text: 'School life', score: { sliceOfLife: 3 } },
            { text: 'Survival war zone', score: { action: 3, dark: 1 } },
        ],
    },
    {
        question: 'Favorite MC type?',
        answers: [
            { text: 'Genius strategist', score: { mind: 3 } },
            { text: 'Overpowered hero', score: { action: 3 } },
            { text: 'Emotionally broken', score: { emotional: 3 } },
            { text: 'Funny idiot', score: { comedy: 3 } },
        ],
    },
    {
        question: 'Choose a power',
        answers: [
            { text: 'Time control', score: { mind: 3, sciFi: 2 } },
            { text: 'Magic', score: { fantasy: 3 } },
            { text: 'Super strength', score: { action: 3 } },
            { text: 'Mind reading', score: { psychological: 3 } },
        ],
    },
    {
        question: 'Pick your setting',
        answers: [
            { text: 'High school', score: { sliceOfLife: 3 } },
            { text: 'Space exploration', score: { sciFi: 3 } },
            { text: 'Medieval world', score: { fantasy: 3 } },
            { text: 'Modern city', score: { sliceOfLife: 2 } },
        ],
    },
    {
        question: 'What hits you hardest?',
        answers: [
            { text: 'Character death', score: { emotional: 3, dark: 1 } },
            { text: 'Love breakup', score: { romance: 3 } },
            { text: 'Plot twist', score: { thriller: 3 } },
            { text: 'Funny moments', score: { comedy: 3 } },
        ],
    },
    {
        question: 'Pick your companion',
        answers: [
            { text: 'Loyal friend', score: { wholesome: 3 } },
            { text: 'Rival genius', score: { mind: 3 } },
            { text: 'Cute partner', score: { romance: 3 } },
            { text: 'Chaos sidekick', score: { comedy: 3 } },
        ],
    },
    {
        question: 'Danger level?',
        answers: [
            { text: 'Extreme danger', score: { dark: 3, action: 2 } },
            { text: 'Moderate adventure', score: { adventure: 3 } },
            { text: 'Safe cozy', score: { wholesome: 3 } },
            { text: 'Psychological danger', score: { psychological: 3 } },
        ],
    },
    /* story & emotion */
    {
        question: 'What keeps you watching?',
        answers: [
            { text: 'Cliffhangers', score: { thriller: 3 } },
            { text: 'Strong emotions', score: { emotional: 3 } },
            { text: 'Non-stop fights', score: { action: 3 } },
            { text: 'Cute scenes', score: { wholesome: 3 } },
        ],
    },
    {
        question: 'Favorite theme?',
        answers: [
            { text: 'Revenge', score: { dark: 3 } },
            { text: 'Friendship', score: { wholesome: 3 } },
            { text: 'Love', score: { romance: 3 } },
            { text: 'Survival', score: { thriller: 3 } },
        ],
    },
    {
        question: 'Biggest fear in story?',
        answers: [
            { text: 'Losing loved ones', score: { emotional: 3 } },
            { text: 'Mind control', score: { psychological: 3 } },
            { text: 'Monsters', score: { horror: 3 } },
            { text: 'Nothing scares me', score: { wholesome: 3 } },
        ],
    },
    {
        question: 'Preferred ending?',
        answers: [
            { text: 'Happy ending', score: { wholesome: 3 } },
            { text: 'Bittersweet ending', score: { emotional: 3 } },
            { text: 'Dark ending', score: { dark: 3 } },
            { text: 'Open ending', score: { mystery: 3 } },
        ],
    },
    {
        question: 'What motivates characters?',
        answers: [
            { text: 'Love', score: { romance: 3 } },
            { text: 'Revenge', score: { dark: 3 } },
            { text: 'Power', score: { action: 3 } },
            { text: 'Survival', score: { thriller: 3 } },
        ],
    },
    {
        question: 'What emotional tone do you prefer?',
        answers: [
            { text: 'Very emotional', score: { emotional: 3 } },
            { text: 'Balanced', score: { sliceOfLife: 2 } },
            { text: 'Light emotions', score: { comedy: 2 } },
            { text: 'No emotion, pure action', score: { action: 3 } },
        ],
    },
    {
        question: 'Which story complexity?',
        answers: [
            { text: 'Simple', score: { wholesome: 2 } },
            { text: 'Medium', score: { sliceOfLife: 2 } },
            { text: 'Complex mind games', score: { mind: 3 } },
            { text: 'Dark complex plot', score: { thriller: 3, dark: 2 } },
        ],
    },
    /* style & action */
    {
        question: 'Fight style?',
        answers: [
            { text: 'Strategic fights', score: { mind: 3 } },
            { text: 'Explosive power fights', score: { action: 3 } },
            { text: 'Fast martial arts', score: { action: 2 } },
            { text: 'No fighting', score: { wholesome: 3 } },
        ],
    },
    {
        question: 'Animation style?',
        answers: [
            { text: 'Old school', score: { nostalgia: 3 } },
            { text: 'Modern clean', score: { action: 2 } },
            { text: 'Dark artistic', score: { dark: 3 } },
            { text: 'Cute chibi', score: { wholesome: 3 } },
        ],
    },
    {
        question: 'How much action?',
        answers: [
            { text: 'Non-stop action', score: { action: 3 } },
            { text: 'Balanced', score: { sliceOfLife: 2 } },
            { text: 'Low action', score: { emotional: 2 } },
            { text: 'No action', score: { wholesome: 3 } },
        ],
    },
    /* character & world */
    {
        question: 'Team type you like?',
        answers: [
            { text: 'Strong friendship group', score: { wholesome: 3 } },
            { text: 'Rival groups', score: { mind: 2 } },
            { text: 'Solo hero', score: { action: 3 } },
            { text: 'Chaotic group', score: { comedy: 3 } },
        ],
    },
    {
        question: 'Villain type?',
        answers: [
            { text: 'Pure evil', score: { dark: 3 } },
            { text: 'Tragic villain', score: { emotional: 3 } },
            { text: 'Smart villain', score: { mind: 3 } },
            { text: 'Funny villain', score: { comedy: 2 } },
        ],
    },
    {
        question: 'What matters most?',
        answers: [
            { text: 'Story', score: { mind: 2 } },
            { text: 'Characters', score: { emotional: 2 } },
            { text: 'Action', score: { action: 2 } },
            { text: 'Feel-good vibe', score: { wholesome: 3 } },
        ],
    },
    /* extra */
    {
        question: 'Do you like romance subplots?',
        answers: [
            { text: 'Yes main focus', score: { romance: 3 } },
            { text: 'Yes but small', score: { romance: 2 } },
            { text: 'Not really', score: { action: 2 } },
            { text: 'No romance at all', score: { dark: 1 } },
        ],
    },
    {
        question: 'Preferred anime length?',
        answers: [
            { text: 'Short (12 eps)', score: { sliceOfLife: 2 } },
            { text: 'Medium (24 eps)', score: { action: 2 } },
            { text: 'Long running', score: { action: 3 } },
            { text: 'Movies only', score: { emotional: 2 } },
        ],
    },
    {
        question: 'Do you like plot twists?',
        answers: [
            { text: 'Many twists', score: { thriller: 3 } },
            { text: 'Some twists', score: { mind: 2 } },
            { text: 'Few twists', score: { sliceOfLife: 2 } },
            { text: 'No twists', score: { wholesome: 3 } },
        ],
    },
    {
        question: 'Favorite genre energy?',
        answers: [
            { text: 'Dark intensity', score: { dark: 3 } },
            { text: 'Light happiness', score: { wholesome: 3 } },
            { text: 'High tension', score: { thriller: 3 } },
            { text: 'Balanced mix', score: { sliceOfLife: 2 } },
        ],
    },
    {
        question: 'What do you prefer in fights?',
        answers: [
            { text: 'Strategy', score: { mind: 3 } },
            { text: 'Power', score: { action: 3 } },
            { text: 'Emotion-driven', score: { emotional: 3 } },
            { text: 'No fights', score: { wholesome: 2 } },
        ],
    },
    {
        question: 'Do you like sad anime?',
        answers: [
            { text: 'Yes I love it', score: { emotional: 3 } },
            { text: 'Sometimes', score: { emotional: 2 } },
            { text: 'Rarely', score: { sliceOfLife: 2 } },
            { text: 'No sadness', score: { wholesome: 3 } },
        ],
    },
    {
        question: 'How important is art style?',
        answers: [
            { text: 'Very important', score: { nostalgia: 2 } },
            { text: 'Somewhat', score: { sliceOfLife: 2 } },
            { text: 'Not important', score: { action: 2 } },
            { text: 'Only story matters', score: { mind: 3 } },
        ],
    },
    {
        question: 'Do you prefer smart MC or strong MC?',
        answers: [
            { text: 'Smart MC', score: { mind: 3 } },
            { text: 'Strong MC', score: { action: 3 } },
            { text: 'Both', score: { action: 2, mind: 2 } },
            { text: 'Neither', score: { sliceOfLife: 2 } },
        ],
    },
    {
        question: 'What world feels best?',
        answers: [
            { text: 'Fantasy world', score: { fantasy: 3 } },
            { text: 'Sci-fi world', score: { sciFi: 3 } },
            { text: 'Real world', score: { sliceOfLife: 3 } },
            { text: 'Dark world', score: { dark: 3 } },
        ],
    },
    {
        question: 'What type of tension do you like?',
        answers: [
            { text: 'Physical fights', score: { action: 3 } },
            { text: 'Psychological tension', score: { psychological: 3 } },
            { text: 'Emotional tension', score: { emotional: 3 } },
            { text: 'No tension', score: { wholesome: 3 } },
        ],
    },
    {
        question: 'Do you like mystery?',
        answers: [
            { text: 'Heavy mystery', score: { mystery: 3 } },
            { text: 'Some mystery', score: { thriller: 2 } },
            { text: 'Light mystery', score: { sliceOfLife: 2 } },
            { text: 'No mystery', score: { wholesome: 3 } },
        ],
    },
    {
        question: 'Do you prefer heroes or anti-heroes?',
        answers: [
            { text: 'Heroes', score: { wholesome: 2 } },
            { text: 'Anti-heroes', score: { dark: 3 } },
            { text: 'Both', score: { emotional: 2 } },
            { text: 'Villains', score: { psychological: 3 } },
        ],
    },
    {
        question: 'Do you like slow builds?',
        answers: [
            { text: 'Yes', score: { emotional: 3 } },
            { text: 'Sometimes', score: { sliceOfLife: 2 } },
            { text: 'No', score: { action: 3 } },
            { text: 'Only fast pacing', score: { thriller: 2 } },
        ],
    },
    {
        question: 'Which tone do you prefer?',
        answers: [
            { text: 'Dark', score: { dark: 3 } },
            { text: 'Bright', score: { wholesome: 3 } },
            { text: 'Neutral', score: { sliceOfLife: 2 } },
            { text: 'Chaotic', score: { comedy: 3 } },
        ],
    },
    {
        question: 'What makes a good anime for you?',
        answers: [
            { text: 'Story', score: { mind: 2 } },
            { text: 'Emotions', score: { emotional: 2 } },
            { text: 'Action', score: { action: 2 } },
            { text: 'Comedy', score: { comedy: 2 } },
        ],
    },
];

/* ── helpers ── */
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function pickQuestions(pool, count = 20) {
    const copy = [...pool];
    shuffleArray(copy);
    const selected = copy.slice(0, count);
    // shuffle answers inside each question
    selected.forEach(q => shuffleArray(q.answers));
    return selected;
}

let questions = [];

function resetQuestions() {
    questions = pickQuestions(questionPool);
}

/* ── render question ── */
function showQuestion() {
    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    answersEl.innerHTML = '';
    const total = questions.length;
    const pct = ((currentQuestion + 1) / total) * 100;
    progressBar.style.setProperty('--pct', pct + '%');
    progressBar.style.setProperty('width', pct + '%');
    progressText.textContent = `${currentQuestion + 1} / ${total}`;

    q.answers.forEach((ans) => {
        const btn = document.createElement('button');
        btn.className = 'option';
        btn.textContent = ans.text;
        btn.addEventListener('click', () => {
            // disable all
            answersEl.querySelectorAll('.option').forEach(b => (b.disabled = true));
            // add score
            for (const k in ans.score) {
                taste[k] = (taste[k] || 0) + ans.score[k];
            }
            currentQuestion++;
            if (currentQuestion < questions.length) {
                showQuestion();
            } else {
                showResult();
            }
        });
        answersEl.appendChild(btn);
    });
}

/* ── personality ── */
function getPersonality() {
    const entries = Object.entries(taste);
    const sorted = entries.sort((a, b) => b[1] - a[1]);
    const top = sorted[0][0];
    const map = {
        action: '⚔️ Battle Junkie',
        mind: '🧠 Deep Thinker',
        emotional: '💔 Emotional Soul',
        comedy: '😂 Chaos Lover',
        fantasy: '✨ Dream Explorer',
        romance: '❤️ Romantic Dreamer',
        thriller: '🔥 Thrill Seeker',
        mystery: '🕵️ Mystery Hunter',
        wholesome: '🌸 Comfort Seeker',
        dark: '🌙 Dark Enthusiast',
        psychological: '🌀 Mindbender',
        sliceOfLife: '☕ Slice of Life Lover',
        sciFi: '🚀 Sci-Fi Adventurer',
    };
    return map[top] || '🌌 Balanced Watcher';
}

/* ── taste bars ── */
function renderTasteBars() {
    tasteGrid.innerHTML = '';
    const order = ['action', 'comedy', 'romance', 'psychological', 'fantasy', 'mind', 'thriller', 'mystery', 'dark', 'wholesome', 'sliceOfLife', 'sciFi', 'emotional'];
    const labels = {
        action: '⚔️ Action',
        comedy: '😂 Comedy',
        romance: '❤️ Romance',
        psychological: '🧠 Psychological',
        fantasy: '✨ Fantasy',
        mind: '🧠 Mind Games',
        thriller: '🔥 Thriller',
        mystery: '🕵️ Mystery',
        dark: '🌙 Dark',
        wholesome: '🌸 Wholesome',
        sliceOfLife: '☕ Slice of Life',
        sciFi: '🚀 Sci-Fi',
        emotional: '💔 Emotional',
    };
    const maxVal = Math.max(1, ...Object.values(taste));
    order.forEach(key => {
        const val = taste[key] || 0;
        const pct = Math.min(100, (val / maxVal) * 100);
        const row = document.createElement('div');
        row.className = 'taste-row';
        row.innerHTML = `
            <span>${labels[key] || key}</span>
            <div class="taste-meter"><div style="width:${pct}%"></div></div>
        `;
        tasteGrid.appendChild(row);
    });
}

/* ── API ── */
async function fetchAnime(genre) {
    const res = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `
                query ($genre: String) {
                    Page(perPage: 500) {
                        media(type: ANIME, genre: $genre, sort: POPULARITY_DESC, isAdult: false, format_in: [TV, MOVIE]) {
                            id
                            title { romaji }
                            description
                            genres
                            averageScore
                            popularity
                            coverImage { large }
                        }
                    }
                }
            `,
            variables: { genre },
        }),
    });
    const data = await res.json();
    return data?.data?.Page?.media || [];
}

function buildQueries(t) {
    const map = {
        action: 'Action',
        romance: 'Romance',
        fantasy: 'Fantasy',
        sciFi: 'Sci-Fi',
        mystery: 'Mystery',
        horror: 'Horror',
        comedy: 'Comedy',
        adventure: 'Adventure',
        psychological: 'Psychological',
        thriller: 'Mystery',
        emotional: 'Drama',
        wholesome: 'Slice of Life',
        sliceOfLife: 'Slice of Life',
    };
    return Object.keys(map)
        .sort((a, b) => (t[b] || 0) - (t[a] || 0))
        .slice(0, 8)
        .map(k => map[k]);
}

function calcScore(anime, t) {
    const g = (anime.genres || []).map(x => x.toLowerCase());
    let score = 0;
    const add = (key, mult = 2) => {
        if (g.includes(key)) score += (t[key] || 0) * mult;
    };
    add('action');
    add('romance');
    add('comedy');
    add('fantasy');
    add('sci-fi');
    add('horror');
    add('mystery');
    add('slice of life');
    add('drama');
    if (g.includes('psychological')) score += ((t.mind || 0) + (t.psychological || 0)) * 2;
    score += (anime.averageScore || 0) / 6;
    const pop = anime.popularity || 0;
    if (pop > 300000) score -= 25;
    if (pop < 50000) score += 12;
    if (pop < 10000) score += 18;
    return score;
}

function explain(anime) {
    const g = (anime.genres || []).map(x => x.toLowerCase());
    const map = {
        action: 'action-packed',
        romance: 'romantic',
        drama: 'emotional',
        psychological: 'mind-bending',
        fantasy: 'fantasy world',
        mystery: 'mysterious',
        comedy: 'funny',
        thriller: 'thrilling',
    };
    const reasons = [];
    for (const k in map) {
        if (g.includes(k)) reasons.push(map[k]);
    }
    return reasons.slice(0, 3).join(' • ') || 'great story';
}

/* ── recommendations ── */
async function recommendAnime() {
    recContainer.innerHTML = '<div class="loading">🎌 Analyzing your anime personality…</div>';
    const queries = buildQueries(taste);
    const results = await Promise.all(queries.map(q => fetchAnime(q)));
    const all = results.flat();

    // dedupe by normalized title
    const map = new Map();
    all.forEach(a => {
        let key = (a.title.romaji || '')
            .toLowerCase()
            .replace(/season\s*\d+/gi, '')
            .replace(/final season/gi, '')
            .replace(/the final season/gi, '')
            .replace(/part\s*\d+/gi, '')
            .replace(/movie/gi, '')
            .replace(/ova/gi, '')
            .replace(/special/gi, '')
            .replace(/[:\-]/g, '')
            .trim();
        if (!map.has(key) || (a.averageScore || 0) > (map.get(key).averageScore || 0)) {
            map.set(key, a);
        }
    });
    const unique = [...map.values()];

    // franchise dedupe
    const usedFranchise = new Set();
    const filtered = unique.filter(a => {
        let f = (a.title.romaji || '')
            .toLowerCase()
            .replace(/season\s*\d+/gi, '')
            .replace(/final season/gi, '')
            .replace(/the final season/gi, '')
            .replace
