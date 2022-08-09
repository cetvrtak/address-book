"use_strict";

let contacts = [];
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
const addContactForm = document.querySelector(".add-contact-form");
const addFirstNameEl = document.querySelector("#add-firstname");
const addLastNameEl = document.querySelector("#add-lastname");
const addEmailEl = document.querySelector("#add-email");
const addPhoneEl = document.querySelector("#add-phone");

const modalEditEl = document.querySelector(".modal-edit");
const editContactForm = document.querySelector(".edit-contact-form");
const editFirstNameEl = document.querySelector("#edit-firstname");
const editLastNameEl = document.querySelector("#edit-lastname");
const editEmailEl = document.querySelector("#edit-email");
const editPhoneEl = document.querySelector("#edit-phone");

const modalOpenEl = document.querySelector(".modal-open");
const openFullnameEl = document.querySelector(".modal-open-fullname");
const openEmailEl = document.querySelector(".modal-open-email");
const openPhoneEl = document.querySelector(".modal-open-phone");
const modalCloseEls = document.querySelectorAll(".modal-close");

const overlayEl = document.querySelector(".overlay");
const addNewContact = document.querySelector(".add-contact");
const contactsEl = document.querySelector(".contacts");
const btnAdd = document.querySelector(".btn-add");
const btnEdit = document.querySelector(".btn-edit");
const btnOpen = document.querySelector(".btn-open");

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
        <button class="btn open" data-id="${i}">
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
  modalOpenEl.classList.add("hidden");
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
function showContactDetails(id) {
  openFullnameEl.textContent = `${contacts[id].firstName} ${contacts[id].lastName}`;
  openEmailEl.textContent = contacts[id].email;
  openPhoneEl.textContent = contacts[id].phone;
  openModal.call(modalOpenEl);
}
function updateStorage() {
  localStorage.contacts = JSON.stringify(contacts);
}

// Event listeners
window.addEventListener("load", () => {
  if (localStorage.contacts && JSON.parse(localStorage.contacts).length) {
    contacts = JSON.parse(localStorage.contacts);
  }
  displayContacts();
});
window.addEventListener("beforeunload", updateStorage);

addNewContact.addEventListener("click", openModal.bind(modalAddEl));

overlayEl.addEventListener("click", closeModal);

btnAdd.addEventListener("click", (e) => {
  e.preventDefault();
  if (!validateForm(e.target.closest("form"))) return;
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
  const deleteBtn = e.target.closest(".delete");
  const openBtn = e.target.closest(".open");

  if (editBtn) {
    openModal.call(modalEditEl);

    id = editBtn.dataset.id;
    editFirstNameEl.value = contacts[id].firstName;
    editLastNameEl.value = contacts[id].lastName;
    editEmailEl.value = contacts[id].email;
    editPhoneEl.value = contacts[id].phone;
  } else if (deleteBtn) {
    deleteContact(deleteBtn.dataset.id);
  } else if (openBtn) {
    showContactDetails(openBtn.dataset.id);
  }
});

btnEdit.addEventListener("click", function (e) {
  e.preventDefault();
  if (!validateForm(e.target.closest("form"))) return;
  closeModal();
  saveContact(id);
});

modalCloseEls.forEach((el) => el.addEventListener("click", closeModal));

// VALIDATION
function validateForm(form) {
  // Select all input elements
  const names = form.querySelectorAll(".name");
  const email = form.querySelector(".email");
  const phone = form.querySelector(".phone");

  // Validate each element
  for (const name of names) {
    if (name.value.length < 3 || name.value.length > 20) return;
  }
  if (!email.value.includes("@")) return;
  if (!/\+[0-9]{10}[0-9]+/.test(phone.value)) return;

  return true;
}

// validateForm(addContactForm);
// validateForm(editContactForm);

// function validateForm(form) {
//   const inputEls = form.querySelectorAll(".input-field");
//   console.log(inputEls);
//   inputEls.forEach((el) => {
//     el.addEventListener("keyup", function () {
//       if (
//         el.classList.includes(".firstname") ||
//         el.classList.includes(".lastname")
//       )
//         validateElement(el, el.value.length < 3 || el.value.length > 20);
//       else if (el.classList.includes(".email"))
//         validateElement(el, !el.value.includes("@"));
//       else if (el.classList.includes(".phone"))
//         validateElement(el, !/\+[0-9]{10}[0-9]+/.test(el.value));
//     });
//   });
// }

// function validateElement(el, test) {
//   if (test) {
//     el.closest(".input-box")
//       .querySelector(".validation-box")
//       .classList.remove("invisible");
//   } else {
//     el.closest(".input-box")
//       .querySelector(".validation-box")
//       .classList.add("invisible");
//   }
// }

// function anyFieldEmpty(e) {
//   const form = e.target.closest("form");
//   const inputFieldEls = form.querySelectorAll(".input-field");

//   let state = false;
//   inputFieldEls.forEach((el) => {
//     if (el.value == "") {
//       state = true;
//     }
//   });
//   return state;
// }
