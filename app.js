const firebaseConfig = {
  apiKey: "AIzaSyDbXz93KDKzVAKPA4A9KOGfvArR95UIiUA",
  authDomain: "chore-tracker-f6e11.firebaseapp.com",
  projectId: "chore-tracker-f6e11",
  storageBucket: "chore-tracker-f6e11.firebasestorage.app",
  messagingSenderId: "251373271126",
  appId: "1:251373271126:web:790b7f74678970112fe3f7",
  measurementId: "G-B9J80QYC9S"
};
// 2. Initialize Firebase & Firestore Database
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 3. Rest of your app code below...
const APP_PIN = "1234";
let chores = [];

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

// --- FORM SUBMISSION HANDLING ---
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('chore-form');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const personInput = document.getElementById('person');
      const choreInput = document.getElementById('chore');

      const person = personInput ? personInput.value.trim() : '';
      const chore = choreInput ? choreInput.value.trim() : '';

      if (person !== '' && chore !== '') {
        const choreData = {
          id: Date.now(),
          person: person,
          chore: chore,
          timestamp: new Date().toLocaleString()
        };

        chores.unshift(choreData);
        saveAndRender();
        form.reset();
      }
    });
  }
});

// --- DELETE CHORE LOG ---
function deleteChore(id) {
  chores = chores.filter(item => item.id !== id);
  saveAndRender();
}

// --- SEARCH & SORT LOGIC ---
function filterAndSortChores() {
  const searchInput = document.getElementById('search-input');
  const sortSelect = document.getElementById('sort-select');

  const searchQuery = searchInput ? searchInput.value.toLowerCase() : '';
  const sortOption = sortSelect ? sortSelect.value : 'latest';

  // Filter based on search input (checks person and chore text)
  let filtered = chores.filter(item => 
    (item.person && item.person.toLowerCase().includes(searchQuery)) ||
    (item.chore && item.chore.toLowerCase().includes(searchQuery))
  );

  // Sorting logic
  if (sortOption === 'latest') {
    filtered.sort((a, b) => b.id - a.id);
  } else if (sortOption === 'oldest') {
    filtered.sort((a, b) => a.id - b.id);
  } else if (sortOption === 'person-asc') {
    filtered.sort((a, b) => a.person.localeCompare(b.person));
  } else if (sortOption === 'chore-asc') {
    filtered.sort((a, b) => a.chore.localeCompare(b.chore));
  }

  renderTable(filtered);
}

function saveAndRender() {
  localStorage.setItem('chores', JSON.stringify(chores));
  filterAndSortChores();
}

// --- RENDER TABLE BODY ---
function renderTable(choreArray) {
  const tableBody = document.getElementById('chore-table-body');
  if (!tableBody) return;

  tableBody.innerHTML = '';

  if (choreArray.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#a0aec0;">No chores logged yet</td></tr>`;
    return;
  }

  choreArray.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${item.person}</strong></td>
      <td>${item.chore}</td>
      <td><small>${item.timestamp}</small></td>
      <td><button class="delete-btn" onclick="deleteChore(${item.id})">✕</button></td>
    `;
    tableBody.appendChild(tr);
  });
}
