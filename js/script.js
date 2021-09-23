/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/





/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
   
const sBar = document.querySelector('.header');
sBar.insertAdjacentHTML("beforeend", `<label for="search" class="student-search">
   <span>Search by name</span>
   <input id="search" placeholder="Search by name...">
   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
 </label>`) ;

 
 const search = document.querySelector('.student-search button');
 const input = document.getElementById('search');




function showPage(list, page) {

   //variables to measure beginning and end of index based on 10 items per page.
   const startIndex = (page * 10) - 10;
   const endIndex = page * 10;

   // Selecting the UL element with a class 'student-list
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';

   //This loop creates an item based on the template literal below, of all the students in the data array.
   //It then inserts them into the page based on the if condition.

   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {


         const studentItem = `
         <li class="student-item ">
           <div class="student-details">
              <img class="avatar" src=${list[i].picture.medium}>
               <h3>${list[i].name.first} ${list[i].name.last}</h3>
            <span class="email">${list[i].email}</span>
            </div >
            <div class="joined-details">
               <span class="date">Joined ${list[i].registered.date}</span>
            </div>
         </li> `;

         studentList.insertAdjacentHTML("beforeend", studentItem);
      }


   }

   search.addEventListener('submit', (e)=> {
      e.preventDefault();
       
      searchBar(input, data);
 
       console.log('submit button is functional');
       
      });

   input.addEventListener("keyup", ()=> {
         searchBar(input, data);
         
       })

}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
   const numOfPages = Math.ceil(list.length / 10);
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = "";


   // This loop creates a button according to the number of list items per page and total of list items. 
   // I used the iterator i as the Text context for the Button.
   for (let i = 1; i <= numOfPages; i++) {

      const button = `
         <li>
         <button type="button">${i}</button>
       </li>`;

      linkList.insertAdjacentHTML('beforeend', button);
   }

      button = document.querySelector('button');
      button.className = "active";

   linkList.addEventListener("click", (e) => {
      if (e.target.tagName == "BUTTON") {
         button = document.querySelector('.active');
         button.className = "";
         e.target.className = 'active';
         showPage(list, e.target.textContent);

      }

   })
}

//



 function searchBar(nameSearched, list){

   
const results = [];
 

   for(let i = 0; i< list.length; i++){
      
      if(nameSearched.value.length !==0 && list[i].name.first.includes(nameSearched.value.toLowerCase()) || list[i].name.last.includes(nameSearched.value.toLowerCase())){
         results.push(list[i]);
         
      }
   }
         showPage(results, 1);
         addPagination(results);

}
     

 
// Call functions
showPage(data, 1);
addPagination(data);
//searchBar(input, data)