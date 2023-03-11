class Server{
    db= new Database();

    getRequest(request){
        request.status=200;
        let type=request.url.split('/')[1];
        switch(request.method){

            case 'USER':
            if(type==="check"){

                //User was not found
                if(!this.db.checkUser(request.body)){
                    request.status=404;
                }
            }
            break;

            case 'GET':
                if(type==="all"){
                    request.responseText= this.db.getAllRecords();
                }else{
                    let response=this.db.getRecord(type);
                    if(!response){
                        request.status=404;
                    }else{
                        request.responseText=response;
                    }
                }
                break;

            case 'POST':
                request.responseText= this.db.addRecord(request.body);
                break;

            case 'DELETE':
                this.db.deleteRecord(request.body);
                break;
        }
    }
}