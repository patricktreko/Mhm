function checkAnswer(selected, correct) {
    // Remove previous feedback
    let feedback = document.getElementById('feedback');
    if (feedback) feedback.remove();

    // Create feedback element
    feedback = document.createElement('div');
    feedback.id = 'feedback';
    feedback.style.marginTop = '1em';
    feedback.style.fontWeight = 'bold';

    if (selected === correct) {
        feedback.textContent = '✅ Correct!';
        feedback.style.color = '#28a745';
        // Confetti effect
        confetti();
    } else {
        feedback.textContent = "❌ You're wrong, try again!";
        feedback.style.color = '#d72660';
    }

    // Insert feedback after the activities div
    const activities = document.getElementById('activities');
    activities.parentNode.insertBefore(feedback, activities.nextSibling);
}

// Simple confetti effect
function confetti() {
    for (let i = 0; i < 40; i++) {
        const conf = document.createElement('div');
        conf.className = 'confetti';
        conf.style.left = Math.random() * 100 + 'vw';
        conf.style.background = `hsl(${Math.random()*360}, 70%, 60%)`;
        conf.style.animationDuration = (Math.random() * 1 + 1.5) + 's';
        document.body.appendChild(conf);
        setTimeout(() => conf.remove(), 2000);
    }
}

// Add confetti CSS
(function() {
    if (!document.getElementById('confetti-style')) {
        const style = document.createElement('style');
        style.id = 'confetti-style';
        style.innerHTML = `
        .confetti {
            position: fixed;
            top: 0;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            opacity: 0.8;
            pointer-events: none;
            z-index: 9999;
            animation: confetti-fall linear forwards;
        }
        @keyframes confetti-fall {
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0.5;
            }
        }
        `;
        document.head.appendChild(style);
    }
})();
