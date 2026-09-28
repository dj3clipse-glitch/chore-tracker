const form = document.getElementById('chore-form');
const choreList = document.getElementById('chore-list');

// Load saved chores on startup
document.addEventListener('DOMContentLoaded', loadChores);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const person = document.getElementById('person').value;
  const chore = document.getElementById('chore').value;
  const timestamp = new Date().toLocaleString();

  const choreData = { person, chore, timestamp };

  saveChore(choreData);
  addChoreToTable(choreData);

  form.reset();
});

function saveChore(choreData) {
  let chores = JSON.parse(localStorage.getItem('chores')) || [];
  chores.unshift(choreData); // Add new entry at the top
  localStorage.setItem('chores', JSON.stringify(chores));
}

function loadChores() {
  let chores = JSON.parse(localStorage.getItem('chores')) || [];
  chores.forEach(choreData => addChoreToTable(choreData));
}

function addChoreToTable(choreData) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td><strong>${choreData.person}</strong></td>
    <td>${choreData.chore}</td>
    <td><small>${choreData.timestamp}</small></td>
  `;
  choreList.prepend(row);
}