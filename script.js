const inputBtn = document.getElementById("input-btn");

let myLeads = []
let oldLeads = []

const inputEl = document.getElementById("input-el");  //const ; can't reassign

const ulEl = document.getElementById("ul-el");

const deleteBtn = document.getElementById("delete-btn")

const tabBtn = document.getElementById("tab-btn")


//localStorage.clear();
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));   // data converted to array;  // 2.GET...
//console.log(leadsFromLocalStorage);

// 1. Check if leadsFromLocalStorage is truthy
// 2. If so, set myLeads to its value and call renderLeads()

if (leadsFromLocalStorage) {  // if true;
   myLeads = leadsFromLocalStorage;   
   render(myLeads);   //passing argument to fun;
}

tabBtn.addEventListener("click",function(){
   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      // since only one tab should be active and in the current window at once
      // the return variable should only have one entry
      myLeads.push(tabs[0].url)
      localStorage.setItem("myLeads", JSON.stringify(myLeads)); //("key",value) // 1.SET...   // 2) convert given i/p value to array into string ;
      render(myLeads);   
   })

})


// to display list
function render(leads){    //1.wrapped,code below in renderLeads fun. //changed fun name renderLeads to render();
   let listItems = " " ; 
   for (let i = 0; i < leads.length; i++) {
      // listItems += "<li><a target='_blank' href='#'>" + myLeads[i] + "</a></li>" ;
      listItems += `
        <li>
           <a target='_blank' href='${leads[i]}'>     
              ${leads[i]}
           </a>
        </li>      
      `                                                            //template string : can write html elements same as in html page.
   } 
   ulEl.innerHTML = listItems ;
}


/*
//ulEl.textContent += myLeads[i] + " " ;  //+= to store previous entries
 //ulEl.innerHTML += "<li>" + myLeads[i] + "</li>"                                                                             
  // Let's try a different method!
   // create element
   // set text content
   // append to ul
//const li = document.createElement("li");
//li.textContent = myLeads[i];
//ulEl.append(li)
*/

deleteBtn.addEventListener("dblclick", function() {         //When clicked, clear localStorage, myLeads, and the DOM.
   localStorage.clear();          
   myLeads = [];
   render(myLeads)
})

inputBtn.addEventListener("click", function(){
   myLeads.push(inputEl.value);   //1) push input to array;
   inputEl.value = "";     // to clear out the input field.

   localStorage.setItem("myLeads", JSON.stringify(myLeads)); //("key",value) // 1.SET...   // 2) convert given i/p value to array into string ;

   render(myLeads);          //2.call the fun to render out the inputs or saved info / display out the given input.

})


/*                                                                                    
  topics covered :
  
  const
  addEventListener
  innerHTML
  input.value
  function parameters
  template strings
  localStorage
  The JSON object
  objects in arrays

 */ 