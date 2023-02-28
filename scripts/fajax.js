class FXMLHttpRequest{

    network= new Network();

    constructor() {
        this.method='';
        this.url='';
        this.body='';
        this.status = -1;
        this.responseText='';
        this.onload=()=>{};
    }

    open(method, url,body){
        this.method=method;
        this.url=url;
        this.body=body;
        this.status=0;
    }

    send(){
        this.network.send(this);
        if (this.status>199 && this.status<400){
            this.onload();
        }
    }
}