// Access Control Passcode 
const APP_PIN = "123d";

let chores = JSON.parse(localStorage.getItem('chores')) || [];

// Access Control Functions
function checkPin() {
  const enteredPin = document.getElementById('pin-input').value;
  const errorElement = document.getElementById('pin-error');

  if (enteredPin === APP_PIN) {
    document.getElementById('pin-screen').classList.add('hidden');
    document.getElementById('app-container').classList.remove('hidden');
    document.getElementById('pin-input').value = '';
    errorElement.innerText = '';
    filterAndSortChores();
  } else {
    errorElement.innerText = 'Incorrect PIN. Try again.';
  }
}

function lockApp() {
  document.getElementById('app-container').classList.add('hidden');
  document.getElementById('pin-screen').classList.remove('hidden');
}

// Add New Chore
function addChore() {
  const input = document.getElementById('chore-input');
  const text = input.value.trim();

  if (text !== '') {
    chores.push({ id: Date.now(), text: text, completed: false });
    saveAndRender();
    input.value = '';
  }
}

// Toggle Complete / Incomplete State
function toggleChore(id) {
  chores = chores.map(chore => {
    if (chore.id === id) chore.completed = !chore.completed;
    return chore;
  });
  saveAndRender();
}

// Delete Chore
function deleteChore(id) {
  chores = chores.filter(chore => chore.id !== id);
  saveAndRender();
}

// Search and Sort Logic
function filterAndSortChores() {
  const searchQuery = document.getElementById('search-input').value.toLowerCase();
  const sortOption = document.getElementById('sort-select').value;

  // Search Filter
  let filtered = chores.filter(chore => chore.text.toLowerCase().includes(searchQuery));

  // Sorting
  if (sortOption === 'name-asc') {
    filtered.sort((a, b) => a.text.localeCompare(b.text));
  } else if (sortOption === 'name-desc') {
    filtered.sort((a, b) => b.text.localeCompare(a.text));
  } else if (sortOption === 'status') {
    filtered.sort((a, b) => a.completed - b.completed);
  }

  renderList(filtered);
}

// Save to LocalStorage
function saveAndRender() {
  localStorage.setItem('chores', JSON.stringify(chores));
  filterAndSortChores();
}

// Render Items to UI
function renderList(choreArray) {
  const listElement = document.getElementById('chore-list');
  listElement.innerHTML = '';

  choreArray.forEach(chore => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="${chore.completed ? 'completed' : ''}" onclick="toggleChore(${chore.id})">
        ${chore.completed ? '✅' : '⬜'} ${chore.text}
      </span>
      <button onclick="deleteChore(${chore.id})">✕</button>
    `;
    listElement.appendChild(li);
  });
}
