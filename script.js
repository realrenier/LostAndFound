const form = document.getElementById('itemForm');
const itemsDiv = document.getElementById('items');
const filter = document.getElementById('filter');

// Load items from localStorage or start empty
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

filter.addEventListener('change', displayItems);

function displayItems() {
  itemsDiv.innerHTML = '';
  const selected = filter.value;
  items.filter(i => selected === 'all' || i.type === selected)
       .forEach(i => {
         const card = document.createElement('div');
         card.className = 'card';
         card.innerHTML = `
           ${i.image ? `<img src="${i.image}">` : `<div style="height:120px;background:#eee;display:flex;align-items:center;justify-content:center;">No Image</div>`}
           <h3>${i.name}</h3>
           <p><strong>Type:</strong> ${i.type.toUpperCase()}</p>
           <p><strong>Description:</strong> ${i.description}</p>
           <p><strong>Date:</strong> ${i.date}</p>
           <p><strong>Place:</strong> ${i.place}</p>
           <p><strong>Contact:</strong> ${i.contact}</p>
         `;
         itemsDiv.appendChild(card);
       });
}

// Load items on page start
displayItems();