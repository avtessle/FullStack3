class Database{

  constructor(){
    //localStorage.clear();
    this.usersArr=this.initialize('all_users');
    this.apptArr=this.initialize('appointments');
  }

  //Initialize the arrays to JavaScript
  initialize(key){
    let arr=localStorage.getItem(key);
    if(arr===null){
      arr = new Array();
      localStorage.setItem(key,JSON.stringify(arr));
    }
    else{
      arr=JSON.parse(arr);
    }
    return arr;
  }

  //Check if the user exists
  checkUser(user){
    // for (const currentUser of arr){
    //   if(currentUser.name===user.name){
    //     if(currentUser.password===user.password){
    //       cleanInputs();
    //       window.location.replace("./main.html");
    //       sessionStorage.setItem("cuurentUser",username);
    //       return;
    //     }
    //     alert("wrong password");
    //     return;
    //   }
    // }
    // alert("user name does not exist");
    return "true";
  }

  //Add new user
  addUser(user){
    return "true";
  }

  //Get all the records
  getAllRecords(){
    return "all records";
  }

  //Get a specific record
  getRecord(id){
    for (let record of this.apptArr){
      if(record.id==id){
        return JSON.stringify(record);
      }
    }
  }

  //Add new record
  addRecoed(record){
    this.apptArr.push(JSON.parse(record));
    localStorage.setItem('appointments',JSON.stringify(this.apptArr));
    return "added!";
  }
}