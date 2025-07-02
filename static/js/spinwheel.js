const games = [
    {
        title: "Matching Game",
        desc: "Match terms and definitions about puberty and menstruation.",
        url: "/minigame-matching"
    },
    {
        title: "Period Tracker Puzzle",
        desc: "Arrange the icons on the calendar to simulate a typical menstrual cycle!",
        url: "/minigame"
    },
    {
        title: "Quiz Challenge",
        desc: "Answer quick questions about menstrual health.",
        url: "/minigame-quiz"
    },
    {
        title: "Sorting Game",
        desc: "Sort items into correct menstrual hygiene categories.",
        url: "/minigame-sorting"
    }
];

let spinning = false;

function highlightRoulette(idx) {
    document.querySelectorAll('.roulette-item').forEach((el, i) => {
        if (i === idx) {
            el.style.background = '#d72660';
            el.style.color = '#fff';
            el.style.borderColor = '#a61b46';
            el.style.transform += ' scale(1.12)';
            el.style.zIndex = 2;
            el.style.boxShadow = '0 4px 16px #ffd6e0';
        } else {
            el.style.background = '#ffe0ec';
            el.style.color = '#d72660';
            el.style.borderColor = '#ffd6e0';
            el.style.transform = el.style.transform.replace(' scale(1.12)','');
            el.style.zIndex = 1;
            el.style.boxShadow = '';
        }
    });
}

document.getElementById('spinBtn').onclick = function() {
    if (spinning) return;
    spinning = true;
    document.getElementById('spinBtn').classList.add('spinning');
    const spinRounds = 20 + Math.floor(Math.random() * 10); // total cycles
    let current = 0;
    let idx = 0;
    const titleEl = document.getElementById('gameTitle');
    const descEl = document.getElementById('gameDesc');
    const playBtn = document.getElementById('playGameBtn');
    const modal = document.getElementById('gameModal');

    function spinStep() {
        idx = (idx + 1) % games.length;
        highlightRoulette(idx);
        titleEl.textContent = games[idx].title;
        descEl.textContent = games[idx].desc;
        playBtn.href = games[idx].url;
        if (current < spinRounds) {
            setTimeout(spinStep, 80 + current * 4); // slow down
            current++;
        } else {
            modal.style.display = 'flex';
            spinning = false;
            document.getElementById('spinBtn').classList.remove('spinning');
        }
    }
    spinStep();
};

// Highlight the first item by default
highlightRoulette(0);

function closeModal() {
    document.getElementById('gameModal').style.display = 'none';
}