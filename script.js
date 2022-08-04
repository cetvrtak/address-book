"use_strict";

let contacts;
// let contacts = [
//   {
//     firstName: "Stevo",
//     lastName: "Iliskovic",
//     email: "stevoiliskovic@gmail.com",
//     phone: "+38766230926",
//   },
//   {
//     firstName: "Patrick",
//     lastName: "Mahomes",
//     email: "patmahomes@gmail.com",
//     phone: "+901234567",
//   },
//   {
//     firstName: "Russel",
//     lastName: "Wilson",
//     email: "dangeruss@gmail.com",
//     phone: "+18005551234",
//   },
// ];

const modalAddEl = document.querySelector(".modal-add");
const addFirstNameEl = document.querySelector("#add-firstname");
const addLastNameEl = document.querySelector("#add-lastname");
const addEmailEl = document.querySelector("#add-email");
const addPhoneEl = document.querySelector("#add-phone");

const modalEditEl = document.querySelector(".modal-edit");
const editFirstNameEl = document.querySelector("#edit-firstname");
const editLastNameEl = document.querySelector("#edit-lastname");
const editEmailEl = document.querySelector("#edit-email");
const editPhoneEl = document.querySelector("#edit-phone");

const overlayEl = document.querySelector(".overlay");
const addNewContact = document.querySelector(".add-contact");
const contactsEl = document.querySelector(".contacts");
const btnAdd = document.querySelector(".btn-add");
const btnEdit = document.querySelector(".btn-edit");

// Functions
function createHeader() {
  contactsEl.innerHTML = `
    <div class="table-header id">#</div>
    <div class="table-header name">Name</div>
    <div class="table-header lastname">Lastname</div>
    <div class="table-header fullname">Full Name</div>
    <div class="table-header email">E-mail</div>
    <div class="table-header phone">Phone</div>
    <div class="table-header buttons invisible"></div>`;
}
function insertContactHTML(el, i) {
  contactsEl.insertAdjacentHTML(
    "beforeend",
    `
    <div class="id">${i + 1}</div>
    <div class="name">${el.firstName}</div>
    <div class="lastname">${el.lastName}</div>
    <div class="fullname">${el.firstName} ${el.lastName}</div>
    <div class="email">${el.email}</div>
    <div class="phone">${el.phone}</div>
    <div class="buttons">
        <button class="btn open">
            <ion-icon name="open-outline"></ion-icon>
        </button>
        <button class="btn edit" data-id="${i}">
            <ion-icon name="pencil-outline"></ion-icon>
        </button>
        <button class="btn delete" data-id="${i}">
            <ion-icon name="trash-outline"></ion-icon>
        </button>
    </div>`
  );
}
function displayContacts() {
  createHeader();
  for (let i = 0; i < contacts.length; i++) {
    insertContactHTML(contacts[i], i);
  }
}
function openModal() {
  this.classList.remove("hidden");
  overlayEl.classList.remove("hidden");
}
function closeModal() {
  modalAddEl.classList.add("hidden");
  modalEditEl.classList.add("hidden");
  overlayEl.classList.add("hidden");
}
function addContact(newContact) {
  contacts.push(newContact);
  insertContactHTML(newContact, contacts.length - 1);
  clearInputFields();
}
function clearInputFields() {
  const inputFields = modalAddEl.querySelectorAll(".input-field");
  inputFields.forEach((el) => (el.value = ""));
}
function saveContact(id) {
  contacts[id].firstName = editFirstNameEl.value;
  contacts[id].lastName = editLastNameEl.value;
  contacts[id].email = editEmailEl.value;
  contacts[id].phone = editPhoneEl.value;
  displayContacts();
}
function deleteContact(id) {
  contacts.splice(id, 1);
  displayContacts();
}
function updateStorage() {
  localStorage.contacts = JSON.stringify(contacts);
}

// Event listeners
window.addEventListener("load", () => {
  if (localStorage.contacts) {
    contacts = JSON.parse(localStorage.contacts);
  }
  displayContacts();
});
window.addEventListener("beforeunload", updateStorage);

addNewContact.addEventListener("click", openModal.bind(modalAddEl));

overlayEl.addEventListener("click", closeModal);

btnAdd.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal();
  const newContact = {
    firstName: addFirstNameEl.value,
    lastName: addLastNameEl.value,
    email: addEmailEl.value,
    phone: addPhoneEl.value,
  };
  addContact(newContact);
});

let id;
contactsEl.addEventListener("click", function (e) {
  e.preventDefault();
  const editBtn = e.target.closest(".edit");
  if (editBtn) {
    openModal.call(modalEditEl);

    id = editBtn.dataset.id;
    editFirstNameEl.value = contacts[id].firstName;
    editLastNameEl.value = contacts[id].lastName;
    editEmailEl.value = contacts[id].email;
    editPhoneEl.value = contacts[id].phone;
  }

  const deleteBtn = e.target.closest(".delete");
  if (deleteBtn) {
    deleteContact(deleteBtn.dataset.id);
  }
});

btnEdit.addEventListener("click", function (e) {
  e.preventDefault();
  closeModal();
  saveContact(id);
});
