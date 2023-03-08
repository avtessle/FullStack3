class Database{

  constructor(){
    // localStorage.clear();
    //the arrays as JavaScripts arrays
    this.usersArr=this.initialize('all_users');
    this.apptArr=this.initialize('appointments');
  }

  //Initialize the arrays
  initialize(key){
    let arr=localStorage.getItem(key);
    if(arr===null){
      arr = new Array();
      localStorage.setItem(key,JSON.stringify(arr));
    }else{
      arr=JSON.parse(arr);
    }
    return arr;
  }

  //Check if the user exists
  checkUser(user){
    let userCheck=JSON.parse(user);

    for (let currentUser of this.usersArr){
      currentUser=JSON.parse(currentUser);

      if(currentUser.name===userCheck.name){
        if(currentUser.password===userCheck.password){
          sessionStorage.setItem("cuurentUser",username);
          return "true";
        }
        alert("wrong password");
        return "false";
      }
    }
    alert("user name does not exist");
    return "false";
  }

  //Add new user
  addUser(user){
    let userCheck=JSON.parse(user);

    for (let currentUser of this.usersArr){
      currentUser=JSON.parse(currentUser);
      if(currentUser.name===userCheck.name){
        alert("uesr name already exist!")
        return "false";
      }
    }

    if(this.addUserData(userCheck.name,userCheck.password)){
      //cleanInputs();
      sessionStorage.setItem("cuurentUser",username);
      return "true";
    }
  }

  addUserData(userName, userPassword){
    //test username
    let tesRegex=  /^[A-Za-z]\w*$/;
    if(!userName.match(tesRegex)) 
    { 
      alert("username must atart with a letter and contain only characters, digits and underscore");
      return false;
    }
  
    // //test password
    // if (!checkPassword(userPassword)){
    //   return false;
    // }
  
    let user=JSON.stringify({name:userName, password:userPassword});
    this.usersArr.push(user);
    localStorage.setItem('all_users',JSON.stringify(this.usersArr));
    return true;
  }

  //Get all the records
  getAllRecords(){
    return JSON.stringify(this.apptArr);
  }

  //Get a specific record
  getRecord(id){
    for (let record of this.apptArr){
      record=JSON.parse(record)
      if(record.id==id){
        return JSON.stringify(record);
      }
    }
    return "No matching record was found"
  }

  //Add new record
  addRecord(record){
    this.apptArr.push(record);
    localStorage.setItem('appointments',JSON.stringify(this.apptArr));
    return "added!";
  }
}