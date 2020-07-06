//--> Init AvionDB
    //--> Check for profile data
        //(data)--> Get name
            //--> Init bugout server
        //(!data)--> Enter data & update DB
            //--> Init bugout server
                //--> process messages

/*///
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
    let ready; //global bugout ready variable

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
                document.getElementsByTagName("bugout-status")[0].innerHTML="Peers connected!"
                console.log("Bugout: Ready...")
                b.on("message", function(address, message){
                    document.getElementsByTagName("post").innerHTML=message
                })
            })
        }

        //Send outgoing messages
        function post(){
            document.getElementsByTagName("post")[0].innerHTML=e.value
            if(ready==true){
                b.send(
                    e.value
                )
            }
            console.log(roomname + " Send post with value: " + e.value)
        }

        //Send outgoing reply
        function reply(){
            document.getElementsByTagName("reply")[0].innerHTML=e.value
            if(ready==true){
                b.send(
                    e.value
                )
            }            
            console.log(roomname + " Send reply with value: " + e.value)
        }
        
        //Handle incoming message
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

///*/
const runExample = async () => {
    const ipfs = await window.Ipfs.create();
      
    // Creates a db named "DatabaseName"
    const aviondb = await AvionDB.init("DatabaseName", ipfs); 
    
    // Creates a Collection named "employees"
    const collection = await aviondb.initCollection("employees");
   
    // Returns the List of collection names
    await aviondb.listCollections() 
    // prints ['employees'] 
   
    // Adding an employee document
    await collection.insertOne({
      hourly_pay: "$15",
      name: "Elon",
      ssn: "562-48-5384",
      weekly_hours: 100,
    });
   
    // We also support multi-insert using collection.insert()
    // See https://github.com/dappkit/aviondb/blob/master/API.md
      
      
    // Search by a single field Or many!
    var employee = await collection.findOne({
      ssn: "562-48-5384", 
    });
   
    // We also support find(), findById()
    // See https://github.com/dappkit/aviondb/blob/master/API.md
      
    // Returns the matching document
    console.log(employee); 
    // Prints the above added JSON document
      
      
    // Update a document
    var updatedEmployee = await collection.update(
     { ssn: "562-48-5384" },
     { $set: { hourly_pay: '$100' } }
    );
      
    // We also support updateMany(), findOneAndUpdate()
    // See https://github.com/dappkit/aviondb/blob/master/API.md
  
    // Returns the updated document
    console.log(updatedEmployee); 
    // Prints the updated JSON document
  
      
    await collection.close(); // Collection will be closed.
    await aviondb.drop(); // Drops the database 
    await aviondb.close(); // Closes all collections and binding database.
    await ipfs.stop();
  };
      
runExample()