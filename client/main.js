//Global object to manage scrolling data
const scrollData = {
    scrolling: false,
    startPos: 0,
    targetPos: 0,
    startTime: 0,
    duration: 400
};

//Smoothly scroll to a specified y position on page
const scrollToPos = (currentTime) => {
    const percentDone = Math.min((currentTime-scrollData.startTime)/scrollData.duration, 1);//Calculate percentage completed based on elapsed time, we're basically lerping

    //If scroll animation should be done, snap to end and return
    if(percentDone >= 1){
        scrollTo(0, scrollData.targetPos);
        scrollData.scrolling = false;
        return;
    }
    
    //Scroll to position based on percentage between start and end
    window.scrollTo(0, scrollData.startPos + percentDone * (scrollData.targetPos-scrollData.startPos));
    
    //Loop scroll animation until done
    window.requestAnimationFrame((timestamp)=>{
        scrollToPos(timestamp);
    });
};

document.getElementById('contact-button').addEventListener('click', (e)=>{
    e.preventDefault();

    window.requestAnimationFrame((timestamp)=>{
        if(scrollData.scrolling) return;//Return early if already scrolling

        //Initialize scroll data for scrolling to desired pos
        scrollData.scrolling = true;
        scrollData.duration = 400;
        scrollData.startTime = timestamp;
        scrollData.startPos = window.pageYOffset;
        //Clamp target pos within bottom of page
        scrollData.targetPos = Math.min(document.getElementById('contact').getBoundingClientRect().top, document.body.scrollHeight-window.innerHeight);

        scrollToPos(timestamp);
    });
});

//CONTACT FORM STUFF