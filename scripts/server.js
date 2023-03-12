class Server{
    db= new Database();

    getRequest(request){
        request.status=200;
        let type=request.url.split('/')[1];
        let value=request.url.split('/')[2];
        alert(type+"\n"+value);
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
                }else if(type=="name")
                {
                    let response=this.db.getRecord(type, value);
                    if(!response){
                        request.status=404;
                    }else{
                        request.responseText=response;
                    }
                }
                else if(type=="date")
                {
                    let response=this.db.getRecord(type, value);
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