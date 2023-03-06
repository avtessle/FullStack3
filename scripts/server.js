class Server{
    db= new Database();

    getRequest(request){
        request.status=200;
        let type=request.url.split('/')[1];
        switch(request.method){

            case 'USER':
            if(type==="check"){
                request.responseText= this.db.checkUser(request.body);
            }else{
                request.responseText= this.db.addUser(request.body);
            }
            break;

            case 'GET':
                if(type==="all"){
                    request.responseText= this.db.getAllRecords();
                }else{
                    request.responseText= this.db.getRecord(type);
                }
                break;

            case 'POST':
                request.responseText= this.db.addRecord(request.body);
                break;
        }
    }
}