// Access Control Passcode (Default: 1234)
const APP_PIN = "1234";

let chores = JSON.parse(localStorage.getItem('chores')) || [];

// --- ACCESS CONTROL FUNCTIONS ---
function checkPin() {
  const pinInput = document.getElementById('pin-input');
  const errorElement = document.getElementById('pin-error');
  const enteredPin = pinInput ? pinInput.value : '';

  if (enteredPin === APP_PIN) {
    document.getElementById('pin-screen').classList.add('hidden');
    document.getElementById('app-container').classList.remove('hidden');
    if (pinInput) pinInput.value = '';
    if (errorElement) errorElement.innerText = '';
    filterAndSortChores();
  } else {
    if (errorElement) errorElement.innerText = 'Incorrect PIN. Try again.';
  }
}

function lockApp() {
  document.getElementById('app-container').classList.add('hidden');
  document.getElementById('pin-screen').classList.remove('hidden');
}

// --- CHORE MANAGEMENT FUNCTIONS ---
function addChore() {
  const input = document.getElementById('chore-input');
  const text = input ? input.value.trim() : '';

  if (text !== '') {
    chores.push({ 
      id: Date.now(), 
      text: text, 
      completed: false 
    });
    saveAndRender();
    input.value = '';
  }
}

function toggleChore(id) {
  chores = chores.map(chore => {
    if (chore.id === id) chore.completed = !chore.completed;
    return chore;
  });
  saveAndRender();
}

function deleteChore(id) {
  chores = chores.filter(chore => chore.id !== id);
  saveAndRender();
}

// --- SEARCH & SORT LOGIC ---
function filterAndSortChores() {
  const searchInput = document.getElementById('search-input');
  const sortSelect = document.getElementById('sort-select');

  const searchQuery = searchInput ? searchInput.value.toLowerCase() : '';
  const sortOption = sortSelect ? sortSelect.value : 'name-asc';

  // Filter chores matching search text
  let filtered = chores.filter(chore => 
    chore.text && chore.text.toLowerCase().includes(searchQuery)
  );

  // Apply sorting option
  if (sortOption === 'name-asc') {
    filtered.sort((a, b) => a.text.localeCompare(b.text));
  } else if (sortOption === 'name-desc') {
    filtered.sort((a, b) => b.text.localeCompare(a.text));
  } else if (sortOption === 'status') {
    filtered.sort((a, b) => a.completed - b.completed);
  }

  renderList(filtered);
}

function saveAndRender() {
  localStorage.setItem('chores', JSON.stringify(chores));
  filterAndSortChores();
}

// --- RENDER LIST TO DOM ---
function renderList(choreArray) {
  const listElement = document.getElementById('chore-list');
  if (!listElement) return;

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
