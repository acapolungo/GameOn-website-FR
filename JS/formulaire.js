//----------------------------- Gestion de formulaire -----------------------------//

// Constantes applicatives
const majority = 13;
const nameRegex = /^[A-Za-z\s]{2,20}$/;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const birthdateRegex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
const tournamentsRegex = /^(0?[0-9]|[0-9][0-9])$/;

// Constante techniques
const firstNameInput = document.querySelector('#first');
const lastNameInput = document.querySelector('#last');
const emailInput = document.querySelector('#email');
const birthdateInput = document.querySelector('#birthdate');
const tournamentsInput = document.querySelector('#tournaments');
const errorTown = document.querySelector('#error-town');
const form = document.querySelector('.reservation');

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
function dateInitMax() {
    let majorityMinThirteen = new Date();
    majorityMinThirteen.setFullYear(majorityMinThirteen.getFullYear() - majority); // on cap une majorité à 13 ans
    let dd = majorityMinThirteen.getDate();
    let mm = majorityMinThirteen.getMonth() + 1; // janvier est 0
    let yyyy = majorityMinThirteen.getUTCFullYear();
    if (dd < 10) {
        dd = `0${dd}`;
    }
    if (mm < 10) {
        mm = `0${mm}`;
    }
    majorityMinThirteen = `${yyyy}-${mm}-${dd}`;
    //console.log(majorityMinThirteen)
    document.querySelector("#birthdate").setAttribute("max", majorityMinThirteen);
}
dateInitMax();

// Quantité de tournois
const validateTournamentss = (tournaments, input) => {
    if (tournamentsIsValid(tournaments) && tournaments > 0) {
        ifInputValid(input);
        input.nextElementSibling.innerHTML = "";
        checkedInput(0, false);
        // for (let inputs of checkboxElement) {
        //   inputs.disabled = false;
        //   let inputCheckIcon = inputs.nextElementSibling.childNodes[1];
        //   inputCheckIcon.classList.remove('modal__checkicon--disabled');
        //   //console.log(inputs);
        // }
    } else if (parseInt(tournaments) === 0) {
        ifInputValid(input);
        input.nextElementSibling.innerHTML = "";
        disableInputs();
    } else if (tournaments == "") {
        ifInputInvalid(input);
        input.nextElementSibling.innerHTML = "Veuillez remplir ce champ";
        disableInputs();
    } else {
        ifInputInvalid(input);
        input.nextElementSibling.innerHTML = "Veuillez remplir ce champ";
    }
}
const validateTournaments = (e) => {
    let input = e.target;
    let tournaments = input.value;
    if (tournamentsIsValid(tournaments) && tournaments > 0) {
        ifInputValid(input);
        input.nextElementSibling.innerHTML = "";
        checkedInput(0, false);
        // for (let inputs of checkboxElement) {
        //   inputs.disabled = false;
        //   let inputCheckIcon = inputs.nextElementSibling.childNodes[1];
        //   inputCheckIcon.classList.remove('modal__checkicon--disabled');
        //   //console.log(inputs);
        // }
    } else if (parseInt(tournaments) === 0) {
        ifInputValid(input);
        input.nextElementSibling.innerHTML = "";
        disableInputs();
    } else if (tournaments == "") {
        ifInputInvalid(input);
        input.nextElementSibling.innerHTML = "Veuillez remplir ce champ";
        disableInputs();
    } else {
        ifInputInvalid(input);
        input.nextElementSibling.innerHTML = "Veuillez remplir ce champ";
    }
}
const validateInputTournaments = (e) => {
    //const tournaments = e.target.value;

    //validateTournaments(tournaments, tournamentsInput);
    validateTournaments(e);
}

// Checkbox
const checkboxElement = document.querySelectorAll("input[name='location']");
let count = 0;

// Rest au début de la modale
function disableInputs() {
    //   for (let inputs of checkboxElement) {
    //     inputs.checked = false
    //     inputs.disabled = true;
    //     let inputCheckIcon = inputs.nextElementSibling.childNodes[1];
    //     inputCheckIcon.classList.add('modal__checkicon--disabled');
    //   }
    checkedInput(false, true);
}

// Initialise les valeurs chk n'importe quel valeur / true / false
function checkedInput(chk, dis) {
    for (let checkbox of checkboxElement) {
        if (chk == true || chk == false) {
            checkbox.checked = chk;
        }
        checkbox.disabled = dis;
        let inputCheckIcon = checkbox.nextElementSibling.childNodes[1];
        if (dis) {
            inputCheckIcon.classList.add('modal__checkicon--disabled');
        } else {
            inputCheckIcon.classList.remove('modal__checkicon--disabled');
        }
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
    //console.log(count)
    errorTown.innerHTML = "";
    return count;
}
// Test des checkbox
function checkBoxIsValid(value) {
    if (tournamentsInput.value == 0 && value == 0) {
        errorTown.innerHTML = "";
        return true;
    }
    if (tournamentsInput.value >= value && value > 0) {
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
        if (inputs.value == "") {
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

firstNameInput.addEventListener('focusout', validateInputFirstName);
lastNameInput.addEventListener('focusout', validateInputLastName);
emailInput.addEventListener('focusout', validateInputEmail);
birthdateInput.addEventListener('focusout', validateInputBirthdate);
tournamentsInput.addEventListener('focusout', validateTournaments);
form.addEventListener('submit', submit);