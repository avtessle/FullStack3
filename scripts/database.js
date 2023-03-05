class Database{

  constructor(){
    //localStorage.clear();
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

  getRecord(id){
    for (let record of this.apptArr){
      if(record.id==id){
        return JSON.stringify(record);
      }
    }
  }

  add(record){
    this.apptArr.push(JSON.parse(record));
    localStorage.setItem('appointments',JSON.stringify(this.apptArr));
    return "added!";
  }
}