/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-92.slack.com/app_redirect?channel=unit-2
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

   //variables to measure beginning and end of index based on 9 items per page.
   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;

   

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
   
   //This event listener calls the search bar function that calls the showPage function with the results of the search.
   search.addEventListener("click", ()=> {
      
       
      searchBar(input, data);
 
       console.log('submit button is functional');
       
      });
// This event listener narrows the search as the user enter letters of the name
   input.addEventListener("keyup", (e)=> {
      const searchValue = e.target.value.toLowerCase();
      
        console.log(searchValue) ;
      
              
      searchBar(searchValue, data);
       
         
       });
      

}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
   const numOfPages = Math.ceil(list.length / 9);
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
   //Selection of first Pagination button and setting its classname to "Active"
   let button1 = document.querySelectorAll('button');
   button1[1].className = "active";
   

   // This listener runs when the user clicks one of the page buttons at the botton of the page and changes the className for that page to active.
   linkList.addEventListener("click", (e) => {
      if (e.target.tagName == "BUTTON") {
         button1 = document.querySelector('.active');
         button1.className = "";
         e.target.className = 'active';
         showPage(list, e.target.textContent);

      }

   })
}

//


//This function gives functionality to the search component.
// It loops through the data array object properties first and last name and checks for a match in the user input while converting the input to lower case.
//When a match occurs, it sends the matching objects into a new array and calls ShowPage and addPagination on the new array.
// It also checks for no matches by looking at whether the new array is empty and produces a message.


//Search bar function uses an empty array to store student objects when the if condition is met. The results array gets passed ads a parameter for the showPage and addPagination functions. 

 function searchBar(nameSearched, list){
   
const message = document.querySelector('.student-list');   
const results = [];


// Looping over the data array to compare the input data with the first and last name on every object in the data array.
   for(let i = 0; i< list.length; i++){
      
      
      if(nameSearched.length !== 0 && list[i].name.first.toLowerCase().includes(nameSearched) || list[i].name.last.toLowerCase().includes(nameSearched)){
         results.push(list[i]);
         
      }
      
      //This condition checks if the new array is empty(no search results found.)
      //It then prints a message explaining that no results were found and hides the pagination div.                                                                     
      
   }


      if(results.length ===0){
         
         message.innerHTML =  `<h3>No results were found</h3>`;
         document.querySelector('.pagination').style.display = 'none';
         
      } else{
      showPage(results, 1);
      addPagination(results);
      document.querySelector('.pagination').style.display = 'inline';
      }
   
   

}    

 
// Call functions
showPage(data, 1);
addPagination(data);
//searchBar(input, data)