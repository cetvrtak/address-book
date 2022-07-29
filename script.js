"use_strict";

const modalAdd = document.querySelector(".modal-add");
const overlay = document.querySelector(".overlay");
const addContactBtn = document.querySelector(".add-contact");

// Functions
function openModal() {
  modalAdd.classList.remove("hidden");
  overlay.classList.remove("hidden");
}
function closeModal() {
  modalAdd.classList.add("hidden");
  overlay.classList.add("hidden");
}

// Event listeners
addContactBtn.addEventListener("click", openModal);
overlay.addEventListener("click", closeModal);
