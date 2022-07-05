const footerModalButton = document.querySelector('.footer-modalButton');
const footerBackDrop = document.querySelector('.footer-backdrop');
const footerModal = document.querySelector('.footer-modal');
const footerCloseBtn = document.querySelector('.footer__close-btn');

function openModal (e) {
  e.preventDefault()
  footerBackDrop.classList.add('footer-backdrop--visible');
  footerModal.classList.add('footer-modal--visible');
  document.body.style.overflow = 'hidden';
}

function closeModal () {
  footerBackDrop.classList.remove('footer-backdrop--visible');
  footerModal.classList.remove('footer-modal--visible');
  document.body.style.overflow = 'auto';
}

footerModalButton.addEventListener('click', openModal );
footerBackDrop.addEventListener('click', closeModal);
footerCloseBtn.addEventListener('click', closeModal)