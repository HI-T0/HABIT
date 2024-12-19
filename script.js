const addHabitBtn = document.getElementById('add-habit');
const habitModal = document.getElementById('habit-modal');
const saveHabitBtn = document.getElementById('save-habit');
const habitContainer = document.getElementById('habit-container');
const coinCountElem = document.getElementById('coin-count');
const emojiButtons = document.querySelectorAll('.emoji-btn');

let coinCount = 0;
let selectedEmoji = '';
let selectedHabit = '';

// Function to update coin count
function updateCoins(amount) {
    coinCount += amount;
    coinCountElem.textContent = coinCount;
}

// Function to create habit card
function createHabitCard(title, emoji, months) {
    const card = document.createElement('div');
    card.className = 'habit-card';

    const emojiElem = document.createElement('div');
    emojiElem.className = 'emoji';
    emojiElem.textContent = emoji;
    card.appendChild(emojiElem);

    const titleElem = document.createElement('h3');
    titleElem.textContent = title;
    card.appendChild(titleElem);

    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';

    const progress = document.createElement('div');
    progress.className = 'progress';
    progressBar.appendChild(progress);

    card.appendChild(progressBar);

    const daysContainer = document.createElement('div');
    let currentMonth = 1;
    let completedDays = 0;
    const daysPerMonth = 30;

    function updateProgress() {
        const totalDays = months * daysPerMonth;
        progress.style.width = `${(completedDays / totalDays) * 100}%`;
    }

    function renderMonth(month) {
        daysContainer.innerHTML = '';
        const startDay = (month - 1) * daysPerMonth + 1;
        const endDay = month * daysPerMonth;

        for (let i = startDay; i <= endDay; i++) {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    updateCoins(2);
                    completedDays++;
                    updateProgress();

                    if (completedDays === month * daysPerMonth) {
                        if (currentMonth < months) {
                            currentMonth++;
                            renderMonth(currentMonth);
                        } else {
                            alert(`${title} Completed!`);
                        }
                    }
                }
            });
            daysContainer.appendChild(checkbox);
        }
    }

    renderMonth(currentMonth);

    card.appendChild(daysContainer);
    habitContainer.appendChild(card);
}

// Open the modal when the add button is clicked
addHabitBtn.addEventListener('click', () => {
    habitModal.style.display = 'flex';
});

// Save habit and close modal
saveHabitBtn.addEventListener('click', () => {
    const months = parseInt(document.getElementById('habit-months').value, 10);

    if (selectedHabit && months > 0) {
        createHabitCard(selectedHabit, selectedEmoji, months);
        habitModal.style.display = 'none';
        document.getElementById('habit-title').value = '';
        document.getElementById('habit-months').value = '';
    }
});

// Close modal if clicked outside modal content
habitModal.addEventListener('click', (e) => {
    if (e.target === habitModal) {
        habitModal.style.display = 'none';
    }
});

// Emoji selection functionality
emojiButtons.forEach(button => {
    button.addEventListener('click', () => {
        selectedHabit = button.getAttribute('data-habit');
        selectedEmoji = button.getAttribute('data-emoji');
        document.getElementById('habit-title').value = selectedHabit;  // Set the habit title
    });
});
