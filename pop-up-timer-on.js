"use strict";

const newTabsMade = [];

const timerObj = {
    minutes: 5, //timerObj minutes will be from user input
    seconds: 0,
    countdown (pToAmmendTo) {

        let timeStr = '';
        timeStr += this.minutes < 10 ? '0' + this.minutes : this.minutes;
        timeStr += ':';
        timeStr += this.seconds < 10 ? '0' + this.seconds : this.seconds;
        // console.log(timeStr);
        let remainingStr = document.createElement('p');
        remainingStr.innerText = "remaining";
        //add to HTML
        pToAmmendTo.innerText = timeStr;
        pToAmmendTo.appendChild(remainingStr)

        if (this.minutes === 0 && this.seconds === 0) {
            // alert("fuuuuu");
            //console.log(timeStr);
        }
        else {
            if (this.seconds === 0 && this.minutes > 0) {
                // console.log(this.minutes, this.seconds)
                this.seconds = 59;
                this.minutes -= 1;
            }
            else {
                this.seconds -= 1;
            }
        
        }
    }
};


//get user input, assign that timerObj minutes

const ourButton = document.querySelector('button');

ourButton.addEventListener('click', function (refresh) {
    //the tab where we clicked on the extension button
    let firstTabId;

    //grab minutes and assign to timerObj
    refresh.preventDefault();

    const userMinutesInput = document.querySelector('#minutes').value;
    
    //timerObj.minutes = document.querySelector('#minutes').value ? document.querySelector('#minutes').value : 1;
    timerObj.minutes = userMinutesInput === 0 ? 1 : Math.abs(userMinutesInput);

    //replace our pop-up with our countdown

    const ourBody = document.querySelector('body');
    ourBody.setAttribute('style', "background-image:url('https://i.gifer.com/MZa6.gif')");

    ourBody.innerHTML = `<p>You have: </p>
    <p id="timer"></p> 
    <button id="disarm">DISARM</button>`;

    const pTimer = document.querySelector('#timer');
    
    let stopID = setInterval(function() {
        if(timerObj.minutes === 0 && timerObj.seconds === 0) {
            
            clearInterval(stopID);

            //trying to change innerHtml -- not working
            // const newImg = document.createElement('img');
            // newImg.setAttribute('src', 'icon_icon.png');  
            // pTimer = newImg;

            //closes all the tabs. doesn't matter if array is empty
            chrome.tabs.remove(newTabsMade);
        
            //change active/current?? window firstTabId, if it exists
            //not presently working

            // console.log('this has been stopped');
            // console.log(newTabsMade)
        }
        timerObj.countdown(pTimer);
        
    }, 1000);

    const disableButton = document.querySelector('#disarm');

    disableButton.addEventListener('click', function () {
        // console.log('stop me!!!!!!')
        clearInterval(stopID);
        pTimer.innerText = 'STOPPED';
        disableButton.innerText = 'QUITTER';
        
    })

    chrome.tabs.onCreated.addListener(function (tab) {
        newTabsMade.push(tab.id);
    });

    chrome.tabs.onRemoved.addListener(function (tab) {
        const indexOfTabInArr = newTabsMade.indexOf(tab);
        if (indexOfTabInArr > -1 ) {
            newTabsMade.splice(indexOfTabInArr, 1);
        }
    });

    // chrome.runtime.onMessage.addListener(
    //     function(request, sender, sendResponse) {
    //         firstTabId = request.tabId;
    //       console.log(sender.tab ?
    //                   "from a content script:" + sender.tab.url :
    //                   "from the extension");
    //       if (request.greeting == "hello")
    //         sendResponse({farewell: "goodbye"});
    //     });

    //loook at removing tabs from our array that have already been closed.
    //add event listener 
})

