 const dataImgChange = () => {
   const command = document.querySelector('#command');

   let img;

   command.addEventListener('mouseover', (event) => {
     if (event.target.matches('.command__photo')) {
       img = event.target.src;
       event.target.src = event.target.dataset.img;
     }
   });

   command.addEventListener('mouseout', (event) => {
     if (event.target.matches('.command__photo')) {
       event.target.dataset.img = event.target.src;
       event.target.src = img;
     }
   });
 };

 export default dataImgChange;