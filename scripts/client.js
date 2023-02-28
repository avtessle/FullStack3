class Client{

    seeAll(){
        let request=new FXMLHttpRequest();    
        request.onload= function() {
            if (this.status == 200) {
            document.getElementById("request").innerHTML = request.responseText;
        }};
        request.open("GET", "application/all");
        request.send();   
    }

    add(newRecord){
        let request=new FXMLHttpRequest();    
        request.onload= function() {
            if (this.status == 200) {
            document.getElementById("request").innerHTML = request.responseText;
        }};
        request.open("POST", "application/add",newRecord);
        request.send();   
    }
}