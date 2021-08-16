const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.navbar');
const navbarMenu = document.querySelector('.navbar__menu');

const btnMainOpen = document.querySelector('.main__btn');
const btnModCross = document.querySelector('.modal__close');
const btnCloseRegistration = document.querySelector('.modal__closeregistration');
const blockModal = document.querySelector('.modal');
const modalBody = document.querySelector('.modal__body');
let modal = false;

const newElt = document.createElement("div");
const newP = document.createElement("p");
const newBtn = document.createElement("button");

const allItemNav = document.querySelectorAll('.navbar__item');

//----------------------------- Menu Header  -----------------------------//

// la cible n'est ni header ni l'un de ses descendants ; fermer le menu
window.addEventListener("click", function (e) {
  if (!e.target.closest("header")) {
    hamburger.classList.remove("active");
    navbarMenu.classList.remove("active");
  }
})

// Toggle du hamburger et du menu
function mobileMenu() {
  hamburger.classList.toggle("active");
  navbarMenu.classList.toggle("active");
}

// Empecher le click si l'écran autre que Mobile
const isMobile = !window.matchMedia("(min-width: 768px)").matches;
if (isMobile) {
  // sur le hamburger
  hamburger.addEventListener("click", mobileMenu);
  // sur tout les liens
  allItemNav.forEach(item => {
    item.addEventListener('click', () => {
      mobileMenu();
    });
  });
}

//----------------------------- Modale -----------------------------//

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
  disableInputs()
}
// Fermeture
function closeModal() {
  modal = false;
  blockModal.style.display = "none";
  blockModal.setAttribute('aria-hidden', 'true');
  blockModal.removeAttribute('aria-modal');

  closeRegistration();
  form.style.display = "block";
  count = "";
}

//----------------------------- Gestion de formulaire -----------------------------//

const firstNameInput = document.querySelector('#first');
const lastNameInput = document.querySelector('#last');
const emailInput = document.querySelector('#email');
const birthdateInput = document.querySelector('#birthdate');
const tournamentsInput = document.querySelector('#tournaments');
const errorTown = document.querySelector('#error-town');

const form = document.querySelector('.reservation');

const nameRegex = /^[A-Za-z\s]{2,20}$/;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const birthdateRegex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
const tournamentsRegex = /^(0?[0-9]|[0-9][0-9])$/;

// Validation des regex
const nameIsValid = (name) => {
  return nameRegex.test(name)
}
const emailIsValid = (email) => {
  return emailRegex.test(email)
}
const birthdateIsValid = (birthdate) => {
  return birthdateRegex.test(birthdate)
}
const tournamentsIsValid = (tournaments) => {
  return tournamentsRegex.test(tournaments)
}
const nameIsEmpty = (name) => {
  return name.trim() == ""
}

function ifInputValid(input) {
  input.classList.remove('modal__input--error');
  input.classList.add('modal__input--valid');
  input.nextElementSibling.classList.remove('error--invalid');
}

function ifInputInvalid(input) {
  input.classList.add('modal__input--error');
  input.classList.remove('modal__input--valid');
  input.nextElementSibling.classList.add('error--invalid');
}

// On lance au focusOut
const validateName = (name, input) => {
  if (nameIsValid(name)) {
    ifInputValid(input);
    input.nextElementSibling.innerHTML = "";
  } else if (nameIsEmpty(name)) {
    ifInputInvalid(input);
    input.nextElementSibling.innerHTML = "Veuillez remplir ce champ"
  } else {
    ifInputInvalid(input);
    input.nextElementSibling.innerHTML = "Le champ accepte les lettres et les tirets maximum 20 caractères";
  }
}
// lancer la fonction pour test de focusout
const validateInputFirstName = (e) => {
  const firstName = e.target.value

  validateName(firstName, firstNameInput)
}
const validateInputLastName = (e) => {
  const lastName = e.target.value

  validateName(lastName, lastNameInput)
}

// Email
const validateEmail = (email, input) => {
  if (emailIsValid(email)) {
    ifInputValid(input);
    input.nextElementSibling.innerHTML = "";
  } else if (email.trim() == "") {
    ifInputInvalid(input);
    input.nextElementSibling.innerHTML = "Veuillez remplir ce champ";
  } else {
    ifInputInvalid(input);
    input.nextElementSibling.innerHTML = "Le champ email n'est pas valide";
  }
}
const validateInputEmail = (e) => {
  const email = e.target.value;

  validateEmail(email, emailInput);
}

// Date de naissance
const validateBirthdate = (birthdate, input) => {
  if (birthdateIsValid(birthdate)) {
    ifInputValid(input);
    input.nextElementSibling.innerHTML = "";
  } else if (birthdate == "") {
    ifInputInvalid(input);
    input.nextElementSibling.innerHTML = "Veuillez remplir ce champ";
  } else {
    ifInputInvalid(input);
    input.nextElementSibling.innerHTML = "Le champ date de naissance n'est pas valide";
  }
}

const validateInputBirthdate = (e) => {
  const birthdate = e.target.value;

  validateBirthdate(birthdate, birthdateInput);
}

// Gestion de la date pour le maximum d'annéesvar oneYearFromNow = new Date();
let majorityMinThirteen = new Date();
majorityMinThirteen.setFullYear(majorityMinThirteen.getFullYear() - 13); // on cap une majorité à 13 ans
let dd = majorityMinThirteen.getDate();
let mm = majorityMinThirteen.getMonth() + 1 // janvier est 0
let yyyy = majorityMinThirteen.getUTCFullYear();
if (dd < 10) {
  dd = `0${dd}`;
}
if (mm < 10) {
  mm = `0${mm}`;
}
majorityMinThirteen = `${yyyy}-${mm}-${dd}`;
console.log(majorityMinThirteen)
document.querySelector("#birthdate").setAttribute("max", majorityMinThirteen);
//console.log(today);

// Quantité de tournois
const validateTournaments = (tournaments, input) => {
  if (tournamentsIsValid(tournaments) && tournaments > 0) {
    ifInputValid(input);
    input.nextElementSibling.innerHTML = "";
    for (let inputs of checkboxElement) {
      inputs.disabled = false;
      let inputCheckIcon = inputs.nextElementSibling.childNodes[1];
      inputCheckIcon.classList.remove('modal__checkicon--disabled');
      //console.log(inputs);
    }
  } else if (parseInt(tournaments) === 0) {
    ifInputValid(input);
    input.nextElementSibling.innerHTML = "";
    disableInputs()
  } else if (tournaments == "") {
    ifInputInvalid(input);
    input.nextElementSibling.innerHTML = "Veuillez remplir ce champ";
    for (let inputs of checkboxElement) {
      inputs.checked = false
      inputs.disabled = true;
      let inputCheckIcon = inputs.nextElementSibling.childNodes[1];
      inputCheckIcon.classList.add('modal__checkicon--disabled');
    }
  } else {
    ifInputInvalid(input);
    input.nextElementSibling.innerHTML = "Veuillez remplir ce champ";
  }
}
const validateInputTournaments = (e) => {
  const tournaments = e.target.value;

  validateTournaments(tournaments, tournamentsInput);
}

// Checkbox
const checkboxElement = document.querySelectorAll("input[name='location']");
let count = 0;

// Rest au début de la modale
function disableInputs() {
  for (let inputs of checkboxElement) {
    inputs.checked = false
    inputs.disabled = true;
    let inputCheckIcon = inputs.nextElementSibling.childNodes[1];
    inputCheckIcon.classList.add('modal__checkicon--disabled');
  }
}

for (let i = 0; i < checkboxElement.length; i++) {
  checkboxElement[i].addEventListener("click", verifyNumberCheck);
}

function verifyNumberCheck(e) {
  if (e.target.checked) {
    //const nameCheckBox = e.target.id;
    count++;
    //console.log(nameCheckBox);
  } else {
    count--;
  }
  console.log(count)
  errorTown.innerHTML = "";
  return count;
}
// Si count > 0 alors
function checkBoxIsValid(value) {
  if (tournamentsInput.value >= value) {
    errorTown.innerHTML = "";
    return true;
  } else if (tournamentsInput.value < value) {
    errorTown.innerHTML = "Vous ne pouvez avoir plus de villes que de participations";
    return false;
  } else {
    errorTown.innerHTML = "Merci de valider au moins une ville";
    return false;
  }
  //return value > 1 ? true : false;
}
function checkRequiredIsValid() {
  if (document.querySelector("#checkbox1").checked) {
    return document.querySelector("#checkbox1").checked;
  } else {
    document.querySelector('#error-quantity').innerHTML = "Merci de cocher pour accepter les termes et conditions.";
  }
  //return document.querySelector("#checkbox1").checked ? true : false;
}

// Compilation des retour true/false de chaque Regex
const firstNameFormValid = () => {
  return nameIsValid(firstNameInput.value);
}
const lastNameFormValid = () => {
  return nameIsValid(lastNameInput.value);
}
const emailFormValid = () => {
  return emailIsValid(emailInput.value);
}
const birthdateFormValid = () => {
  return birthdateIsValid(birthdateInput.value);
}
const tournamentsFormValid = () => {
  return tournamentsIsValid(tournamentsInput.value);
}
const checkboxFormValid = () => {
  return checkBoxIsValid(count);
}
const formIsValid = () => {
  return firstNameFormValid() && lastNameFormValid() && emailFormValid() && birthdateFormValid() && tournamentsFormValid() && checkboxFormValid() && checkRequiredIsValid()
}

// Values "" au submit
function ifInputNotFill() {
  for (let inputs of document.querySelectorAll('.modal__input')) {
    if(inputs.value =="") {
      inputs.nextElementSibling.innerHTML = "Veuillez remplir ce champ";
    }
  }
}
// Reset au submit
function submitResetInput() {
  for (let inputs of document.querySelectorAll('.modal__input')) {
      inputs.value = "";
      inputs.classList.remove('modal__input--valid');
  }
  disableInputs()
}

const submit = (e) => {
  if (formIsValid()) {
    // submit the form
    e.preventDefault();
    createNewModal();
    submitResetInput();
  } else {
    // do not submit form
    e.preventDefault();
    ifInputNotFill();
    // console.log(nameIsValid(firstNameInput.value))
    // console.log(nameIsValid(lastNameInput.value))
    // console.log(emailIsValid(emailInput.value))
    // console.log(birthdateIsValid(birthdateInput.value))
    // console.log(tournamentsIsValid(tournamentsInput.value))
    // console.log(checkBoxIsValid(count))
    // console.log(checkRequiredIsValid())
  }
}
btnMainOpen.addEventListener("click", openModal);
btnModCross.addEventListener("click", closeModal);
firstNameInput.addEventListener('focusout', validateInputFirstName);
lastNameInput.addEventListener('focusout', validateInputLastName);
emailInput.addEventListener('focusout', validateInputEmail);
birthdateInput.addEventListener('focusout', validateInputBirthdate);
tournamentsInput.addEventListener('focusout', validateInputTournaments);
form.addEventListener('submit', submit);

//----------------------------- Fin de gestion du formulaire && modale de remerciement -----------------------------//

function createNewModal() {
  form.style.display = "none";
  openRegistration();
}

// Crée un nouvel élément
function openRegistration() {
  if (!document.querySelector("#registration")) {
    //It #registration does not exist
    modalBody.appendChild(newElt);
    modalBody.classList.add('modal__registration')
    modalBody.setAttribute("id", "registration");
    newElt.appendChild(newP);
    newElt.appendChild(newBtn);
    newP.classList.add("modal__greetings");
    newBtn.classList.add("modal__closeregistration");
    document.querySelector(".modal__greetings").innerHTML = "Merci ! <br>Votre réservation a été reçue."
    document.querySelector(".modal__closeregistration").innerHTML = "Fermer";
    newBtn.addEventListener("click", () => {
      closeModal();
    });
    }
}
// Supprime ce nouvel élément
function closeRegistration() {
  if (document.querySelector("#registration")) {
    //If #registration exist
    modalBody.removeAttribute("id", "registration")
    newElt.removeChild(newBtn);
    newElt.removeChild(newP);
  }
}