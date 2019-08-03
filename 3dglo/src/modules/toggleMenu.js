 const toggleMenu = () => {
   const menu = document.querySelector('menu'),
     body = document.querySelector('body');

   const addMenu = () => {
     menu.classList.add('active-menu');
   };

   const removeMenu = () => {
     menu.classList.remove('active-menu');
   };

   body.addEventListener('click', (event) => {
     let target = event.target;
     if (target.closest('.menu')) {
       addMenu();
     } else if (!target.closest('menu')) {
       removeMenu();
     } else if (target.closest('ul>li')) {
       removeMenu();
     } else if (target.classList.contains('close-btn')) {
       removeMenu();
     }

   });
 };

 export default toggleMenu;