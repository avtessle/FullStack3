class Database{

  constructor(){
    //localStorage.clear();
    //the array as JavaScripts array
    this.usersArr=this.initializeUsers();
  }
  
  initializeUsers(){
    let arr=localStorage.getItem("all_users");
    if(arr===null){
      arr = new Array();
      localStorage.setItem("all_users",JSON.stringify(arr));
    }else{
      arr=JSON.parse(arr);
    }
    return arr;
  }

  //Check if the user exists
  checkUser(user){
    user=JSON.parse(user);
    for (let userCheck of this.usersArr){
      if(userCheck.name===user.name){
        if(userCheck.password===user.password){
          sessionStorage.setItem("cuurentUser",JSON.stringify(userCheck));
          return true;
        }
        alert("wrong password");
        return false;
      }
    }
    alert("user name does not exist");
    return false;
  }

  //Add new user
  addUser(user){
    user=JSON.parse(user);
    for (let userCheck of this.usersArr){
      if(userCheck.name===user.name){
        alert("uesr name already exist!")
        return false;
      }
    }

    user.appointments=[];
    if(this.addUserData(user)){
      //this.apptArr=user.appointments;
      sessionStorage.setItem("cuurentUser",JSON.stringify(user));
      return true;
    }
  }

  addUserData(user){
    //test username
    let tesRegex=  /^[A-Za-z]\w*$/;
    if(!user.name.match(tesRegex)) 
    { 
      alert("username must atart with a letter and contain only characters, digits and underscore");
      return false;
    }
  
    // //test password
    // if (!checkPassword(userPassword)){
    //   return false;
    // }
  
    this.usersArr.push(user);
    localStorage.setItem('all_users',JSON.stringify(this.usersArr));
    return true;
  }

  //Get all the records
  getAllRecords(){
    let apptArr=JSON.parse(sessionStorage.getItem("cuurentUser")).appointments;
    return JSON.stringify(apptArr);
  }

  //Get a specific record
  getRecord(date,time){
    let apptArr=JSON.parse(sessionStorage.getItem("cuurentUser")).appointments;
    for (let record of apptArr){
      record=JSON.parse(record)
      if(record.date==date && record.time===time){
        return JSON.stringify(record);
      }
    }
      return false;
  }

  getRecords(type, value){
    let apptArr=JSON.parse(sessionStorage.getItem("cuurentUser")).appointments;
    let myList = []; 
    for (let record of apptArr){
      record=JSON.parse(record)
      if(record[type]==value){
        myList.push(record);
      }
    }
    return JSON.stringify(myList);
    // switch (type) {
    //   case "name":
    //     for (let record of apptArr){
    //       record=JSON.parse(record)
    //       if(record.name==value){
    //         return JSON.stringify(record);
    //       }
    //     }
    //     break;
    //   case "date":
    //     for (let record of apptArr){
    //       record=JSON.parse(record)
    //       if(record.date==value){
    //         return JSON.stringify(record);
    //       }
    //     }
    //     break;
    //   case "phone":
    //     for (let record of apptArr){
    //       record=JSON.parse(record)
    //       if(record.phone==value){
    //         return JSON.stringify(record);
    //       }
    //     }
    //     break;
    //   default:
    //     break;
    //   }
    
    //return false;
  }

  //Add new record
  addRecord(record){
    let apptArr=JSON.parse(sessionStorage.getItem("cuurentUser")).appointments;
    apptArr.push(record);

    this.updateStorage(apptArr);
    return true;
  }

  deleteRecord(record){
    let apptArr=JSON.parse(sessionStorage.getItem("cuurentUser")).appointments;
    const index = apptArr.indexOf(record);
    apptArr.splice(index, 1);
    this.updateStorage(apptArr);
    return true;
  }

  updateStorage(apptArr){
    //Update currentUser appointments
    let currentUser=JSON.parse(sessionStorage.getItem("cuurentUser"));
    let index=this.usersArr.findIndex(x => x.name === currentUser.name && x.password === currentUser.password);
    currentUser["appointments"]=apptArr;

    //Update sessionStorage
    sessionStorage.setItem("cuurentUser",JSON.stringify(currentUser));

    //Update users array (localStorage)
    this.usersArr[index]=currentUser;
    localStorage.setItem('all_users',JSON.stringify(this.usersArr));
  }
}