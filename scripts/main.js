//Initialize with a default page
function init(){
    displayPage("home");
    history.replaceState({}, 'Home', '#home');
    window.addEventListener('popstate', poppin);
}

//Navigation between the pages
function nav(ev){
    ev.preventDefault(); 
    document.body.removeChild(document.body.lastElementChild)
    let pageId=ev.target.getAttribute('target');
    displayPage(pageId);
    history.pushState({}, pageId, `#${pageId}`);
}

//Display chosen page
function displayPage(pageId){
    let temp = document.getElementById(pageId);
    let clon = temp.content.cloneNode(true);
    document.body.appendChild(clon);

    document.querySelectorAll('.nav-link').forEach((link)=>{
        link.addEventListener('click', nav);
    })

    switch(pageId){
        case "home":
            initHome();
            break;
        case "appointment":
            initApp();
            break;
        case "search":
            initSearch(); 
    }
}

//Event of url change
function poppin(){
    let hash = location.hash.replace('#' ,'');
    document.body.removeChild(document.body.lastElementChild)
    displayPage(hash)
}

//Add event listeners to the buttons of Application
function initApp(){
   document.getElementById("cdate").setAttribute("min",Date.now.Date);
    // let addSubbmit= document.getElementById("addMeating");

    //addSubbmit.addEventListener("click",newRecordInfo);
}

function validateForm(){

    if(checkPattern("cname") && checkPattern("cphone"))
    {
    //    checkDate();

        newRecordInfo();

    }
    return false;
}

// function checkDate(){
//     var today = new Date(Date.now());
//     var cdate = document.getElementById("cdate").value;
//     alert(today.to " today\n"+ cdate + " choose");
// }

function checkPattern(id){
    var elem = document.getElementById(id);

    var pattern = elem.getAttribute("pattern");
    var re = new RegExp(pattern);
    if (re.test(elem.value)) {
        return true;
    }
    return false;
}

//Initialize the app
document.addEventListener('DOMContentLoaded', init);

// login and register- move to login.js
function initHome(){
    setDeafultDate("today");
    selectDay();
    document.getElementById("today").addEventListener("change",selectDay);
    
    
    
    // const showday = new Date("03-05-2023");
    // //getWeek(showday);
    // alert("week: "+showday.getDay()+"\nday: "+showday.setDeafultDate("today")+"\nfuuldate: "+showday.toDateString()+"\nhour: "+showday.toTimeString());
    // // showday.addEventListener('onchange', login);
}

function selectDay(){
    createDailyTable();
    let meeting= seeDateRecord(document.getElementById("today").value);
}


//Initialize the search page
function initSearch(){
    document.getElementById("searchnameB").addEventListener('click', searchRec);
    document.getElementById("editBtn").addEventListener('click', editRecord);
    document.getElementById("deleteBtn").addEventListener('click', deleteRecord);
    recVisibility('hidden');
    setDeafultDate("searchDate")
    seeAll();
}

//Search record by name
function searchRec(){
    //let name = document.getElementById("search_name").value;
    let date= document.getElementById("searchDate").value;
    let time= document.getElementById("searchTime").value;
    if(date && time){
        seeRecord(date,time);
    }
    document.getElementById("searchTime").value="";
}

// function getWeek(date){
//     let myDate = new Date(date);
//     return "hi";
// }

// Adam Beer July 23
// from https://teamtreehouse.com/community/html-input-date-field-how-to-set-default-value-to-todays-date
function setDeafultDate(id) {
    var today = new Date(Date.now());
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
  
    if(dd<10) {
        dd = '0'+dd
    } 
  
    if(mm<10) {
        mm = '0'+mm
    } 
  
    today = yyyy + '-' + mm + '-' + dd;
    console.log(today);
    document.getElementById(id).value = today;
}
  
function createDailyTable(){
    
    let myTable = document.getElementById("myDayTable");
    myTable.innerHTML='';
    let header = document.createElement('tr');
    
    header.appendChild(document.createElement('th')); 
    let name = document.createElement('th');
    name.innerHTML = "name";
   // neme.style.width='200px';
    let phone = document.createElement('th');
    phone.innerHTML = "phone";
    //phone.style.width='200px';
    
    header.appendChild(name);
    header.appendChild(phone);

    myTable.appendChild(header);

    for(let time = 9; time<21; time++){
        let rowTime = document.createElement('tr');
        let myTime = document.createElement('th');
        rowTime.id = time+":00";
        myTime.innerHTML= time+":00";

        rowTime.appendChild(myTime);
        myTable.appendChild(rowTime);
    }

}