document.addEventListener('DOMContentLoaded', async () => {
    //Bugout initialization
    document.getElementsByClassName("profileID", function(ev) {
        if (ev.keyCode == 13) {
            //set typing flag to true
            //*add code*
            const profileID = ev.target.textContent;
            console.log(profileID)
        }
    })

    const asyncExample = () => {
        const mycrap = "crapola"
        return mycrap
      }
      
    const users = await asyncExample()
    
    console.log(asyncExample())  
    
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