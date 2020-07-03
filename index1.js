//-->Wait for user name (profile)
    //--> Create the AvionDB database
    //--> Start the bugout session
        //--> Wait for peers
            //--> send/recieve messages
            //--> log sent/recieved messages in database

document.addEventListener('DOMContentLoaded', async () => {

    //Watch for keyup in any input field
    const inputs = document.getElementsByTagName("input")
    for (let input of inputs){
        input.addEventListener('keyup',getInput)
    }

    //Get input field value when 'enter' is pressed
    function getInput (input) {
        //console.log("Typing...")
        if (input.keyCode == 13) {
            input.preventDefault()
            bugout(this)
        }
    }
 
    //Start a Bugout session
    let b; //global bugout variable
    let roomname; //global bugout roomname

    function bugout(e){
        switch(e.id) {
            case "name":
                // create bugout session
                roomname = e.value + "-" + generateId()
                console.log("Starting a Bugout room with name: " + roomname)
                b = Bugout(roomname)
                console.log(roomname)
                console.log("Bugout identifier: " + b.address())
                break;
            case "post":
                // send main post to bugout peers
                post(e)
                break;
            case "reply":
                // send reply to main post to bugout peers
                reply(e)
                break;
            default:
              // code block
        }

        //Handle incoming messages
        if(b){
            b.on("seen", function(){
                ready = true;
                document.getElementsByTagName("status")[0].textContent="Peers connected!"
                console.log("Bugout: Ready...")
            })
        }

        //Send outgoing messages
        function post(){
            if(ready=true){
                console.log("we're ready")
                document.getElementsByTagName("feed")[0].textContent="Ready"
            }
            console.log(roomname + " Send post with value: " + e.value)
            var parent = document.createElement("div");
            parent.append("Some text");
            parent.prepend("Headline: ");
            
            console.log(parent.textContent); // "Headline: Some text"
        }
        function reply(){
            console.log(roomname + " Send reply with value: " + e.value)
        }
    }

    //Create AvionDB database
    function avion(){
        //initilize databsae
    }

    //Make ID hashes
    function generateId (len) {
        var arr = new Uint8Array((len || 40) / 2)
        window.crypto.getRandomValues(arr)
        return Array.from(arr, dec2hex).join('')
    }
    function dec2hex (dec) {
        return ('0' + dec.toString(16)).substr(-2)
    }  
})