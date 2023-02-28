class Database{

  constructor(){
    this.usersArr=this.initialize('all_users');
    this.apptArr=this.initialize('appointments');
  }

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

  getAll(){
    return "all records";
  }

  add(record){
    this.apptArr.push(record);
    localStorage.setItem('appointments',JSON.stringify(this.apptArr));
    return "added!";
  }

}