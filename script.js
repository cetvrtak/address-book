"use_strict";

const contacts = [
  {
    firstName: "Stevo",
    lastName: "Iliskovic",
    email: "stevoiliskovic@gmail.com",
    phone: "+38766230926",
  },
  {
    firstName: "Patrick",
    lastName: "Mahomes",
    email: "spatmahomes@gmail.com",
    phone: "+901234567",
  },
  {
    firstName: "Russel",
    lastName: "Wilson",
    email: "dangeruss@gmail.com",
    phone: "+18005551234",
  },
];

const modalAddEl = document.querySelector(".modal-add");
const overlayEl = document.querySelector(".overlay");
const addNewContact = document.querySelector(".add-contact");
const contactsEl = document.querySelector(".contacts");
const btnAdd = document.querySelector(".btn-add");

// Functions
function insertContactHTML(el, i) {
  contactsEl.insertAdjacentHTML(
    "beforeend",
    `<div class="id">${i + 1}</div>
          <div class="name">${el.firstName}</div>
          <div class="lastname">${el.lastName}</div>
          <div class="fullname">${el.firstName} ${el.lastName}</div>
          <div class="email">${el.email}</div>
          <div class="phone">${el.phone}</div>
          <div class="buttons">
              <button class="btn open">
                  <ion-icon name="open-outline"></ion-icon>
              </button>
              <button class="btn edit">
                  <ion-icon name="pencil-outline"></ion-icon>
              </button>
              <button class="btn delete">
                  <ion-icon name="trash-outline"></ion-icon>
              </button>
          </div>`
  );
}
function displayContacts() {
  for (let i = 0; i < contacts.length; i++) {
    insertContactHTML(contacts[i], i);
  }
}
displayContacts();

function openModal() {
  modalAddEl.classList.remove("hidden");
  overlayEl.classList.remove("hidden");
}
function closeModal() {
  modalAddEl.classList.add("hidden");
  overlayEl.classList.add("hidden");
}
function addContact(newContact) {
  contacts.push(newContact);
  //   localStorage.setItem(localStorage, newContact);
  insertContactHTML(newContact, contacts.length - 1);
}
// function updateStorage() {
//   contacts.forEach((el, i) => {
//     localStorage.setItem(i, el);
//   });
// }
// updateStorage();

// Event listeners
addNewContact.addEventListener("click", openModal);
overlayEl.addEventListener("click", closeModal);
btnAdd.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal();
  const newContact = {
    firstName: document.querySelector("#firstname").value,
    lastName: document.querySelector("#lastname").value,
    email: document.querySelector("#email").value,
    phone: document.querySelector("#phone").value,
  };
  addContact(newContact);
});
