 const sendForm = (formInput) => {
   //сообщение для пользователя
   const errorMassage = 'Что-то пошло не так...',
     loadMassage = 'Загурзка...',
     saccessMesage = 'Спасибо! Мы скоро с вами свяжемся.';
   //получили форму
   const form = formInput;
   //div в котором будет сообщение
   const statusMessage = document.createElement('div');
   statusMessage.style.color = '#fff';
   statusMessage.style.csstext = 'font-size: 2rem';
   statusMessage.classList.add('request');

   form.addEventListener('input', (event) => {
     if (event.target.matches('.form-phone')) {
       event.target.value = event.target.value.replace(/[^\+\d]/g, "");
     }
     if (event.target.matches('.form-name') || event.target.matches('.mess')) {
       event.target.value = event.target.value.replace(/[^а-яА-ЯёЁ\ ]/g, "");
     }
   });

   //отслеживаем нажатие на кнопку
   form.addEventListener('submit', (event) => {
     //отменяем дефолтное поведеие события, чтобы не было обновления страницы
     event.preventDefault();
     //добавили div на страницу, пустой
     form.appendChild(statusMessage);

     statusMessage.textContent = loadMassage; //тут может быть спиннер, анимация, окно

     //объект считывает данные формы и имеет обязательно атрибут name
     const formData = new FormData(form);

     let body = {};

     formData.forEach((val, key) => {
       body[key] = val;
     });

     postData(body)
       .then((response) => {
         if (response.status !== 200) {
           throw new Error('status network not 200 ');
         }
         //console.log(response);
         statusMessage.textContent = saccessMesage;
       })
       .catch((error) => {
         statusMessage.textContent = errorMassage;
         console.error(error);
       });

     form.reset();
   });


   const postData = (body) => {
     return fetch('./server.php', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(body)
     });
   };

 };

 export default sendForm;