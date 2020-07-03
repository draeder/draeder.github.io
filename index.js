document.addEventListener('DOMContentLoaded', async () => {
    //Bugout initialization
  



    //Getter and Setter for any input field
    const inputs = document.getElementsByTagName("input")
    for (let input of inputs){
      input.addEventListener('keyup',getInput)
    }
    function getInput (e) {
        //console.log("Typing...")
        if (e.keyCode == 13) {
          let thisElement = this.id
          let userInput = this.value; //get the tag ID
          e.preventDefault();
          //console.log("User input tag ID (" + thisElement +") says (" + userInput + ")")
          spsn.a=userInput;
          //x.a==userInput;
        }
    } 

    //https://stackoverflow.com/questions/1759987/listening-for-variable-changes-in-javascript
    let spsn = {
      aInternal: 10,
      aListener: function(val) {},
      set a(val) {
        this.aInternal = val;
        this.aListener(val);
      },
      get a() {
        return this.aInternal;
      },
      registerListener: function(listener) {
        this.aListener = listener;
      }
    }
    spsn.registerListener(function(val) {
      console.log("Someone changed the value of spsn.a to " + val);
    });
    console.log(spsn.a)

// detect click on page
let target = document.getElementsByTagName("input")

let targetProxy = new Proxy(target,{
  get:(obj,key)=>{
    let value = Reflect.get(obj,key);
    if(typeof(value) == "function"){
      return value.bind(obj);
    }
    return value;
  }
});
for (let input of inputs){
  //input.addEventListener('keyup',getInput)
  input.addEventListener('keyup',()=>
    processInput(input)//console.log(input.id + " is typing... " +input.value)  
  );
}

function processInput(e){
  console.log(e.id + " is typing... " + e.value)
  console.log(e.keyCode)
  if (e.keyCode == 13) {
    console.log("Entered: " + e.value)
  }
}

document.onkeyup = consle.log(logKey);

    //*
    
    //AvionDb initialization variables

    //Get ipfs node ID

    //UI Handler
    ////Styles/CSS
    ////Elements
    ////
  
    document.getElementsByClassName("reply", async () => {
        this.onkeydown("ev", function () {
            if (ev.keyCode == 13) {
                //set typing flag to true
                //*add code*
            }
        })
    })

    //User Profile Handler
    ////Create Self
    ////Edit Self
    ////Sync Self to other devices
    ////View Self/Anyone by Profile ID

    //Publish Handler
    ////Publish New Content
    //////Reply to Existing Content
    ////Edit Existing *own* Content
    //////Delete Existing *own* Content

    //Subscribe Handler
    ////Subscribe to Anyone
    ////Unsubscribe from Anyone
    ////Manage Subscribers (Block)
    
    //Feed Handler
    ////View Self/Anyone's Feed
    ////View Subscribed-to Feeds

    //Notifications

})