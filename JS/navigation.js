//----------------------------- Modale -----------------------------//

const btnOpenModal = document.querySelector('.main__btn');
const btnCloseModal = document.querySelector('.modal__close');
const btnCloseRegistration = document.querySelector('.modal__closeregistration');
const blockModal = document.querySelector('.modal');
const modalBody = document.querySelector('.modal__body');
let modal = false;

// Ouverture
function openModal() {
  navbarMenu.addEventListener("click", function (e) {
    e.stopPropagation;
  });
  hamburger.addEventListener("click", function (e) {
    e.stopPropagation;
  });
  modal = true;
  blockModal.style.display = "block";
  blockModal.removeAttribute('aria-hidden');
  blockModal.setAttribute('aria-modal', 'true');
  disableInputs();
}
// Fermeture
function closeModal() {
  modal = false;
  blockModal.style.display = "none";
  blockModal.setAttribute('aria-hidden', 'true');
  blockModal.removeAttribute('aria-modal');

  closeRegistration();
  form.style.display = "block";
  count = 0;
}

//----------------------------- Nouvelle modale de remerciement -----------------------------//

function createNewModal() {
  form.style.display = "none";
  openRegistration();
}

// Crée un nouvel élément
function openRegistration() {
  let registration = document.querySelector("#registration");
  if (registration == null) { // !registration
    //It #registration does not exist
    modalBody.classList.add('modal__registration')
    let newElt = document.createElement("div");
    let newP = document.createElement("p");
    let newBtn = document.createElement("button");
    modalBody.appendChild(newElt);
    newElt.setAttribute("id", "registration");
    newElt.appendChild(newP);
    newElt.appendChild(newBtn);
    newP.classList.add("modal__greetings");
    newBtn.classList.add("modal__closeregistration");
    document.querySelector(".modal__greetings").innerHTML = "Merci ! <br>Votre réservation a été reçue."
    document.querySelector(".modal__closeregistration").innerHTML = "Fermer";
    newBtn.addEventListener("click", () => {
      closeModal();
    });
    registration = document.querySelector("#registration");
  }
  registration.style.display = "block";
}
// Supprime ce nouvel élément
function closeRegistration() {
  let registration = document.querySelector("#registration");
  if (registration != null) { //registration
    registration.style.display = "none";
  }
}

btnOpenModal.addEventListener("click", openModal);
btnCloseModal.addEventListener("click", closeModal);