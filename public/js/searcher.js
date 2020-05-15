const searchbtn=document.getElementById("searchbtn")
const searchinpt=document.getElementById("searchinpt");
const messageseach= document.getElementById("messageseach");

const searchcatagories= document.getElementById("search-catagories");

const UI= new SearcherUI();

let sellectedCat="";
let key="";

addEventListeners();

function addEventListeners(){
    searchcatagories.onchange= function(e){
        sellectedCat=searchcatagories.options[searchcatagories.selectedIndex].textContent.trim();
        
        UI.setMessage(sellectedCat);
    
        UI.searchforCategory(sellectedCat);
        UI.search(key);
    }
    searchbtn.addEventListener("click", seachcase);
    searchinpt.addEventListener("keyup", typeSearch);
}

function seachcase(e){
    const searctext=searchinpt.value.trim();
    
    if(searctext===''){
        UI.allertUser("Please Enter Searched Key");
    }else{

    }
    e.preventDefault();
}

function typeSearch(e){
    key= e.target.value.toLowerCase();
    UI.search(key);
}