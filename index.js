const form = document.getElementById("eventForm");
const nameInput = document.getElementById("eventName");
const typeInput = document.getElementById("eventType");
const tableBody = document.getElementById("tableBody");

const stats = {
  total: document.getElementById("total"),
  click: document.getElementById("click"),
  lead: document.getElementById("lead"),
  sale: document.getElementById("sale"),
};

let events = JSON.parse(localStorage.getItem("events")) || [];

function saveEvents() {
  localStorage.setItem("events", JSON.stringify(events));
}

function renderTable() {
  tableBody.innerHTML = "";

  events.forEach((event) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${event.name}</td>
      <td>${event.type}</td>
      <td>${event.date}</td>
    `;

    tableBody.appendChild(row);
  });
}

function renderStats() {
  stats.total.textContent = events.length;
  stats.click.textContent = events.filter((e) => e.type === "click").length;
  stats.lead.textContent = events.filter((e) => e.type === "lead").length;
  stats.sale.textContent = events.filter((e) => e.type === "sale").length;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newEvent = {
    name: nameInput.value.trim(),
    type: typeInput.value,
    date: new Date().toLocaleString(),
  };

  if (!newEvent.name) return;

  events.push(newEvent);
  saveEvents();
  renderTable();
  renderStats();

  form.reset();
});

renderTable();
renderStats();
