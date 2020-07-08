///////////////////////////////
// Simple P2P Social Network //
///////////////////////////////


//// Run everything asynchronously after DOM load
document.addEventListener('DOMContentLoaded', async () => {

//// Generate peer ID and store it in LocalStorage
    let identifier = localStorage.getItem("Peer ID")
    if(!identifier){
        let identifier = generateId() 
        localStorage.setItem("Peer ID", identifier)
        console.log("There was no id, so set one: " + identifier)
    } else {
        console.log("There was an id: " + identifier)
    }

//// Process URL from the address bar
    const url = window.location.href; 
    let urlObject = new URL(url);
    let profileId = urlObject.searchParams.get('r')
    let arrUrl = profileId.split("-");
    let serverName = arrUrl[0]
    let serverId = arrUrl[1] // connect to existing instance

//// Initialize a Bugout session
    let b = new Bugout(serverId)
    b.on("seen", function(address){
        console.log("Server identifier: " + b.identifier)
        document.getElementsByTagName("bugout-status")[0].innerHTML=
            "<i class='fa fa-exchange fa-lg' aria-hidden='true' style='color: green'></i> Peers connected!"
        console.log("Seen: " + address)
    })

//// Handle incoming messages
    // Recieve inbound message from Bugout
    b.on("message", function(address, msg){
        //let message = JSON.stringify(msg)
        processMsg(msg)
        console.log(address)
    })

    // Process message types
    function processMsg(message){
        if(message.type == "profile"){
            console.log("Recieved an incoming message object of type 'profile'")
        }
        if(message.type == "post"){
            console.log("recieved an incoming post")
            document.getElementById("post").innerHTML=message.message //message.date, message.type, etc.
        }
        if(message.type == "reply"){
            console.log("recieved an incoming reply")
            document.getElementById("response").innerHTML=message.message //msg.date, msg.type, etc.
        }
    }

//// Handle inputs from DOM
    // Get value from *any* input field upon value change
    const inputTags = document.getElementsByTagName("input")
    console.log(inputTags)

    //Process carriage return
    for (let keyPress of inputTags){
        keyPress.addEventListener('keyup', getInput)
    }

    function getInput (e) {
        //console.log("Typing...")
        if (e.keyCode == 13) {
            e.preventDefault();
            processInput(this)
        }
    }

    //Process 'clicked away' or 'tabbed out'
    for (let onBlur of inputTags){
        onBlur.addEventListener('blur', getInputTabOut)
    }

    function getInputTabOut (e) {
        console.log("Tabbed or clicked out... " + this.id)
        if(e.value){
            console.log(e.id + " has a value")
        } else
        {
            console.log(e.id + " has no value")
        }
    }

    // Handle input field type
    function processInput (input){
        let message = {}
        let profile = {}
        if(input.id=="name-input"){
            console.log("name-input")
            //create a user profile
            //message = new Profile("profile", identifier, Date.now(), firsstName, lastName, email, about, avatar)
        } else
        if(input.id=="post-input"){
            //create a post message
            console.log("post-input")
            message = new Post("post", identifier, generateId(), Date.now(), input.value)
        } else 
        if(input.id=="reply-input"){
            console.log("reply-input")
            //create a reply message
            message = new Reply("reply", identifier, "", generateId(), Date.now(), input.value)
        } else {
            console.log("Warning: Input field <input id='" + input.id + "'> is not defined in the function named 'processInput'.")
        }
        if(message){
            b.send(message) 
        }
    }

//// Create message objects
    // Create a user profile object
    function Profile(type, identifier, first, last, email, about, avatar) {
        this.type = type
        this.identifier = identifier
        this.firstName = first
        this.lastName = last
        this.email = email
        this.about = about
        this.avatar = avatar
        this.name = function() {return this.firstName + " " + this.lastName}
    }

    // Create a post object
    function Post(type, identifier, postId, date, message) {
        this.type = type
        this.identifier=identifier
        this.postId=postId
        this.date = date
        this.message = message
    }

    // Create a reply object
    function Reply(type, identifier, postId, replyId, date, message) {
        this.type = type,
        this.identifier = identifier
        this.postId = postId
        this.replyId = replyId
        this.date = date
        this.message = message
    }

//// Generate crypto ID hash
    function generateId (len) {
        var arr = new Uint8Array((len || 40) / 2)
        window.crypto.getRandomValues(arr)
        return Array.from(arr, dec2hex).join('')
    }
    function dec2hex (dec) {
        return ('0' + dec.toString(16)).substr(-2)
    }

/*///// Example async callback
    //example reference: https://stackoverflow.com/questions/52864065/can-i-pass-an-async-function-as-a-callback-to-an-async-function
    const setStateAsync = (newState) => {
        return new Promise((resolve) => {
            setState(newState, resolve);
        })
    }
    async function componentDidMount() {
        await setStateAsync(newState);
        await doStuff();
    }

*/ 
})