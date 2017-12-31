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

const scrollToContacts = (e) => {
    e.preventDefault();
    
    window.requestAnimationFrame((timestamp)=>{
        if(scrollData.scrolling) return;//Return early if already scrolling

        //Initialize scroll data for scrolling to desired pos
        scrollData.scrolling = true;
        scrollData.startTime = timestamp;
        scrollData.startPos = window.pageYOffset;
        //Clamp target pos within bottom of page
        scrollData.targetPos = Math.min(document.getElementById('contact').getBoundingClientRect().top, document.body.scrollHeight-window.innerHeight);

        scrollToPos(timestamp);
    });
}

let formErrors = false;//Whether any errors have occured during form verification

//When contact form field loses focus, verify validity of contents
const onInputBlur = function() {
    //Get input for this field
    const input = this.querySelector('.input');

    const value = input.value.trim();//String value to validate

    let valid = true;//Whether value is valid

    //Loop through validation callbacks to determine if valid
    for(var i = 0; i < arguments.length; i++){
        if(!arguments[i](value)){
            valid = false;
            break;
        }
    }

    //Set section's valid attribute to keep track of valid fields
    input.setAttribute('valid', valid);

    //If field is invalid, change label to red
    this.querySelector('label').style.color = valid ? 'white' : '#e74433';
};

//Validate whether string is empty
const validateEmpty = (string) => {
    return string.length > 0;
};

//Validate whether string is a valid email
const validateEmail = (email) => {
    return /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email);
};

//Show message to verify if message was successfully sent
const showSubmitMessage = (message, success) => {
    //Message element to show
    const submitMessage = document.getElementById('afterSubmit');

    //Inner div contains actual message
    const innerDiv = submitMessage.querySelector('div');

    //Set message contents and background color
    innerDiv.innerText = message;
    submitMessage.style.backgroundColor = success ? '#5A8' : '#E74433';

    //Start css transition to make message slide down
    submitMessage.style.maxHeight = innerDiv.clientHeight;
    submitMessage.style.marginBottom = '2%';

    //Slide back up after 7 seconds
    setTimeout(()=>{
        submitMessage.style.maxHeight = 0;
        submitMessage.style.marginBottom = 0;
    }, 7000);
};

//Validate/submit contact form
const submitForm = (e) => {

    e.preventDefault();
    const inputs = document.querySelectorAll('.input');
    let errors = false;
    
    for(var i = 0; i < inputs.length; i++){
        inputs[i].onblur();
        if(inputs[i].getAttribute('valid') === 'false'){
            errors = true;
        }
    }

    if(errors){
        showSubmitMessage("Oops. The form hasn't been filled out correctly, please review and try again.",
            false);
        return;
    }

    const xhr = new XMLHttpRequest();

    //Data string to post
    let data = '';

    //Serialize form inputs to data string
    for(var i = 0; i < inputs.length; i++){
        data += `${i > 0 ? '&' : ''}${inputs[i].name}=${inputs[i].value}`;
    }

    xhr.open('POST', '/contact', true);

    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = () => {
        showSubmitMessage(xhr.response.message, xhr.status === 200);
    };

    xhr.send(data);
};

//Initialize when window loaded
window.onload = () => {
    document.getElementById('contact-button').addEventListener('click', scrollToContacts);

    //Hook up all input blur events
    const nameSection = document.getElementById('nameSection');
    nameSection.querySelector('.input').onblur = ()=>onInputBlur.call(nameSection, validateEmpty);

    const emailSection = document.getElementById('emailSection');
    emailSection.querySelector('.input').onblur = ()=>onInputBlur.call(emailSection, validateEmpty,validateEmail);
    
    const messageSection = document.getElementById('messageSection');
    messageSection.querySelector('.input').onblur = ()=>onInputBlur.call(messageSection, validateEmpty);

    document.getElementById('contact-form').onsubmit = submitForm;
};