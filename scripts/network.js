class Network{

    server= new Server();

    send(request){
        this.server.getRequest(request);
    }

}

