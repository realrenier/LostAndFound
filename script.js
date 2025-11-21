const form = document.getElementById('itemForm');
const lostDiv = document.getElementById('lostItems');
const foundDiv = document.getElementById('foundItems');
const navButtons = document.querySelectorAll('nav button');

let items = JSON.parse(localStorage.getItem("items")) || [];

form.addEventListener('submit', e => {
  e.preventDefault();
  const type = document.getElementById('type').value;
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const date = document.getElementById('date').value;
  const place = document.getElementById('place').value;
  const contact = document.getElementById('contact').value;
  const imageFile = document.getElementById('image').files[0];

  if (imageFile) {
    const reader = new FileReader();
    reader.onload = function() {
      const item = { type, name, description, date, place, contact, image: reader.result };
      items.push(item);
      localStorage.setItem("items", JSON.stringify(items));
      displayItems();
    };
    reader.readAsDataURL(imageFile);
  } else {
    const item = { type, name, description, date, place, contact, image: null };
    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));
    displayItems();
  }

  form.reset();
});

function showTab(tabId) {
  document.querySelectorAll('.tab').forEach(tab => tab.style.display = 'none');
  document.getElementById(tabId).style.display