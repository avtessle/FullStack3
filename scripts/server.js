class Server{
    db= new Database();

    getRequest(request){
        request.status=200;
        switch(request.method){

            case('GET'):
                let type=request.url.split('/')[1];
                if(type==="all"){
                    request.responseText= this.db.getAll();
                }else{
                    request.responseText= this.db.getRecord(type);
                }
            break;

            case('POST'):
                request.responseText= this.db.add(request.body);
                break;
        }
    }
}