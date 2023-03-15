class Server{
    db= new Database();

    getRequest(request){
        request.status=200;
        let type=request.url.split('/')[1];
        let value1=request.url.split('/')[2];
        let value2=request.url.split('/')[3];
        switch(request.method){

            case 'USER':
                if(type==="check"){
                    //User was not found
                    if(!this.db.checkUser(request.body)){
                        request.status=404;
                    }
                }else if(!this.db.addUser(request.body)){
                    request.status=404; 
                }
                break;

            case 'GET':
                switch (type){
                    case 'all':
                        request.responseText= this.db.getAllRecords();
                        break;
                    case 'single':
                        let response=this.db.getRecord(value1,value2);
                        if(!response){
                            request.status=404;
                        }else{
                            request.responseText=response;
                        }
                        break;
                    case 'multi':
                        let list =this.db.getRecords(value1,value2);
                        if(!list){
                            request.status=404;
                        }else{
                            request.responseText=list;
                        }
                        break;
    
                }
                break;

            case 'POST':
                if(!this.db.addRecord(request.body)){
                    request.status=422; 
                }
                break;

            case 'DELETE':
                if(!this.db.deleteRecord(request.body)){
                    request.status=404; 
                }
                break;

            case 'PUT':
                if(!this.db.editRecord(value1, value2, request.body)){
                    request.status=422; 
                }
                break;
        }
    }
}