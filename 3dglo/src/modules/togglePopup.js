const togglePopup = () => {
  const popup = document.querySelector('.popup'),
    popupContent = document.querySelector('.popup-content'),
    popupBtn = document.querySelectorAll('.popup-btn'),
    availWidth = screen.availWidth;

  popupBtn.forEach((elem) => {
    elem.addEventListener('click', () => {
      popup.style.display = 'block';
      if (availWidth > 420) {
        popupContent.animate([{
            top: '-50%'
          },
          {
            top: '10%'
          }
        ], 1000);
      }
    });
  });

  popup.addEventListener('click', (event) => {
    let target = event.target;
    if (target.classList.contains('popup-close')) {
      popup.style.display = 'none';
    } else {
      target = target.closest('.popup-content');
      if (!target) {
        popup.style.display = 'none';
      }
    }

  });

};

export default togglePopup;