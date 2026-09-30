// Access Control Passcode
const APP_PIN = "1234";

// Load initial chores from LocalStorage
let chores = JSON.parse(localStorage.getItem('chores')) || [];

// --- ACCESS CONTROL FUNCTIONS ---
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

// --- CHORE MANAGEMENT FUNCTIONS ---
function addChore() {
  const input = document.getElementById('chore-input');
  const text = input ? input.value.trim() : '';

  if (text !== '') {
    chores.unshift({
      id: Date.now(),
      text: text,
      completed: false,
      timestamp: new Date().toLocaleString()
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

  // Search Filter
  let filtered = chores.filter(chore => 
    (chore.text && chore.text.toLowerCase().includes(searchQuery)) ||
    (chore.person && chore.person.toLowerCase().includes(searchQuery))
  );

  // Sorting
  if (sortOption === 'name-asc') {
    filtered.sort((a, b) => (a.text || a.chore || '').localeCompare(b.text || b.chore || ''));
  } else if (sortOption === 'name-desc') {
    filtered.sort((a, b) => (b.text || b.chore || '').localeCompare(a.text || a.chore || ''));
  } else if (sortOption === 'status') {
    filtered.sort((a, b) => (a.completed ? 1 : 0) - (b.completed ? 1 : 0));
  }

  renderList(filtered);
}

function saveAndRender() {
  localStorage.setItem('chores', JSON.stringify(chores));
  filterAndSortChores();
}

// --- RENDER LIST TO UI ---
function renderList(choreArray) {
  const listElement = document.getElementById('chore-list');
  if (!listElement) return;
  
  listElement.innerHTML = '';

  choreArray.forEach(chore => {
    const li = document.createElement('li');
    const displayText = chore.person ? `[${chore.person}] ${chore.chore || chore.text}` : (chore.text || chore.chore);
    
    li.innerHTML = `
      <span class="${chore.completed ? 'completed' : ''}" onclick="toggleChore(${chore.id})">
        ${chore.completed ? '✅' : '⬜'} ${displayText}
      </span>
      <button onclick="deleteChore(${chore.id})">✕</button>
    `;
    listElement.appendChild(li);
  });
}

// --- FORM EVENT LISTENER (Optional Table / Form support) ---
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('chore-form');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const personInput = document.getElementById('person');
      const choreInput = document.getElementById('chore');

      const person = personInput ? personInput.value.trim() : '';
      const choreText = choreInput ? choreInput.value.trim() : '';

      if (choreText !== '') {
        const choreData = {
          id: Date.now(),
          person: person,
          text: choreText,
          completed: false,
          timestamp: new Date().toLocaleString()
        };

        chores.unshift(choreData);
        saveAndRender();
        form.reset();
      }
    });
  }
});
