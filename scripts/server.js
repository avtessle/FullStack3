class Server{

    db= new Database();

    getRequest(request){
        request.status=200;
        switch(request.method){

            case('GET'):
            request.responseText= this.db.getAll();
            break;

            case('POST'):
            request.responseText= this.db.add(request.body);
            break;
        }
    }
}