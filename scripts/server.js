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
                        let response=this.db.getRecord(request.url.split('/')[2],request.url.split('/')[3]);
                        if(!response){
                            request.status=404;
                        }else{
                            request.responseText=response;
                        }
                        break;
                    case 'multi':
                        //request.responseText= this.db.getRecords();
                        break;
                }
                break;

            case 'POST':
                if(!this.db.addRecord(request.body)){
                    request.status=404; 
                }
                break;

            case 'DELETE':
                if(!this.db.deleteRecord(request.body)){
                    request.status=404; 
                }
                break;
        }
    }
}