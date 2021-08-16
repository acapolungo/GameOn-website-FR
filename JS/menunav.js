//----------------------------- Menu Header  -----------------------------//

// Constante technique
const hamburger = document.querySelector('.hamburger');
const navbarMenu = document.querySelector('.navbar__menu');
const allItemNav = document.querySelectorAll('.navbar__item');

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

// sur le hamburger
hamburger.addEventListener("click", mobileMenu);
// sur tout les liens
allItemNav.forEach(item => {
  item.addEventListener('click', () => {
    mobileMenu();
  });
});

// Empecher le click si l'écran autre que Mobile
// const isMobile = !window.matchMedia("(min-width: 768px)").matches;
// if (isMobile) {
// }
