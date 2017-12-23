//Smoothly scroll to a specified y position on page
const scrollToPos = (startPos, targetPos, duration, startTime, currentTime) => {
    const percentDone = Math.min(Math.max((currentTime-startTime)/duration, 0), 1);//Calculate percentage completed based on elapsed time, we're basically lerping

    if(percentDone >= 1){
        window.scrollTo(0, targetPos);
        return;
    }

    window.scrollTo(0, targetPos - percentDone * (targetPos-startPos));
    
    window.requestAnimationFrame((timestamp)=>{
        scrollToPos(startPos, targetPos, duration, startTime, timestamp);
    });
};

document.getElementById('contact-button').addEventListener('click', (e)=>{
    e.preventDefault();

    window.requestAnimationFrame((timestamp)=>{
        scrollToPos(window.pageYOffset, document.getElementById('#contact').getBoundingClientRect().top,
            1000, timestamp, timestamp);
    });
});