"use strict";

var map;//Object for the google map we'll be using for guesses

var endMap;//Map used to display results

var numLocations = 5;//Number of locations that comprise a round, we'll generate all these at the start (maybe with a seed?)
var locations = [];
     
var geoSearchStub = "https://en.wikipedia.org/w/api.php?format=json&action=query&list=geosearch&gsradius=10000&gsprop=country|type";//Stub url to use for searching for Wikipedia pages w/ locations near random loc
var wikiPageStub = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts|images&explaintext";//Stub url to get Wikipedia page's contents
var imageSearchStub = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=imageinfo&iiprop=url";//Stub url to get images from selected Wikipedia page

var currentLevel = 0;//Current level we're playing on
var score = 0;//Player's score, based on how accurate your guesses are on the map

var playerMarker;//Marker for player's selection
var actualMarker;//Marker for where the actual location is
var lineBetweenPoints;//Line drawn on map between guess and actual marker

var finalLocationMarkers = [];//Array of all relevant markers/lines to draw on map at the end of the game.  At end of each round another set of markers and a line get pushed on

var submitted = false;//Whether guess has been submitted, determines whether markers can be added when clicking map

//Enum object used to check what edge mouse is over
var containerEdge = {
    topLeft: 0,
    topRight: 1,
    bottomLeft: 2,
    bottomRight: 3
};

//Class for map container, contains functions relevant for resizing/moving container
var mapCont = function(mainEl,barEl){
    this.resizing = false;//Whether being resized from corners
    this.moving = false;//Whether being moved with top bar
    this.edgeToResize = undefined;//What edge has been clicked and needs to be resized
    this.mainElement = mainEl;//Elements to manipulate
    this.moveBar = barEl;
    
    this.initialClickPos = undefined;//Initial x,y position of click on screen
    this.initialMovePos = undefined;//Initial x,y position of container
    
    //Call function to update what x and y pos of element are for future calculations, also clamp pos within window
    this.updateCurrentPos = function(){
        var boundingRect = this.mainElement.getBoundingClientRect();//Get bounding rect of main element, can use for distance in px from edges of window in all 4 directions
        
        this.currentPos = {
            x:boundingRect.left,
            y:boundingRect.top
        }
        
        //Make sure map stays in bounds
        if(this.currentPos.x + this.mainElement.clientWidth > window.innerWidth-30){
            this.currentPos.x = window.innerWidth-(this.mainElement.clientWidth+30);
            this.mainElement.style.left = this.currentPos.x + "px";
        }
        else if(this.currentPos.x < 15){
            this.currentPos.x = 15;
            this.mainElement.style.left = this.currentPos.x + "px";
        }
        
        if(this.currentPos.y + this.mainElement.clientHeight > window.innerHeight-15){
            this.currentPos.y = window.innerHeight-(this.mainElement.clientHeight+15);
            this.mainElement.style.top = this.currentPos.y + "px";
        }
        else if(this.currentPos.y < 15){
            this.currentPos.y = 15;
            this.mainElement.style.top = this.currentPos.y + "px";
        }
    };
    
    //Initialize position to be bottom right of the screen
    this.mainElement.style.left = window.innerWidth + "px";
    this.mainElement.style.top = window.innerHeight + "px";
    
    //Initialize width to 20% window width, height is 1.25x larger
    this.mainElement.style.width = (window.innerWidth * .2) + "px";
    this.mainElement.style.height = (window.innerWidth * .25) + "px";
    
    this.mainElement.style.fontSize = mapContainer.clientWidth/360 + "em";//Semi-arbitrary number but it works out nice to make the font size grow/shrink appropriately
    
    this.updateCurrentPos();
    
    //Call when user initially clicks move bar, stores initial positions of mouse and element
    this.startMove = function(mouse){
        this.moving = true;
        
        this.initialClickPos = mouse;
        this.initialMovePos = this.currentPos;
    };
    
    //When user is clicking and dragging on the move bar, take mouse pos and change position of element accordingly
    this.move = function(mouse){     
        var newX = (this.initialMovePos.x-this.initialClickPos.x) + mouse.x;//Maintain relative position of mouse from where it was when clicked
        var newY = (this.initialMovePos.y-this.initialClickPos.y) + mouse.y;
        
        this.mainElement.style.left = newX + "px";
        this.mainElement.style.top = newY + "px";
        
        this.updateCurrentPos();
    };
    
    //Call when user initially clicks a resize region
    this.initResize = function(mouse){
        this.resizing = true;
        
        this.initialSize = {width:this.mainElement.clientWidth,height:this.mainElement.clientHeight};//Store initial size of element
        
        this.initialClickPos = mouse;//Store initial pos of mouse click
        
        var boundingRect = this.mainElement.getBoundingClientRect();    
        
        //Change positioning attributes based on what corner was clicked so that the edges opposite to the corner will stay stationary, this makes resizing feel a lot better
        switch(this.edgeToResize){
            case containerEdge.topLeft:
                this.mainElement.removeAttribute("left");//Left and top always take precedent in css which is super annoying, so remove those attribs when necessary
                this.mainElement.style.right = boundingRect.right + "px";
                this.mainElement.removeAttribute("top");
                this.mainElement.style.bottom = boundingRect.bottom + "px";
                break;
            case containerEdge.topRight:
                this.mainElement.style.left = boundingRect.left + "px";
                this.mainElement.style.right = "auto";
                this.mainElement.removeAttribute("top");
                this.mainElement.style.bottom = boundingRect.bottom + "px";
                break;
            case containerEdge.bottomLeft:
                this.mainElement.removeAttribute("left");
                this.mainElement.style.right = boundingRect.right + "px";
                this.mainElement.style.top = boundingRect.top + "px";
                this.mainElement.style.bottom = "auto";
                break;
            case containerEdge.bottomRight:
                this.mainElement.style.left = boundingRect.left + "px";
                this.mainElement.style.right = "auto";
                this.mainElement.style.top = boundingRect.top + "px";
                this.mainElement.style.bottom = "auto";
                break;
        }
        
    };
    
    //Call each frame while resizing based on mouse pos
    this.resize = function(mouse){
        
        var xChange,yChange;//Difference in pixels to change size by
        
        var boundingRect = this.mainElement.getBoundingClientRect();
        
        //Positioning attribs to keep element in proper place on screen after changing width/height
        var elementPos = {
            left:boundingRect.left,
            right:boundingRect.right,
            top:boundingRect.top,
            bottom:boundingRect.bottom
        }
        
        //Calculate changes to make based on what region is being resized from
        switch(this.edgeToResize){
            case containerEdge.topLeft:
                xChange = this.initialClickPos.x-mouse.x;
                yChange = this.initialClickPos.y-mouse.y;
                
                elementPos.left = mouse.x;
                elementPos.top = mouse.y;
                
                break;
            case containerEdge.topRight:
                xChange = mouse.x-this.initialClickPos.x;
                yChange = this.initialClickPos.y-mouse.y;
                
                elementPos.right = window.innerWidth-mouse.x;
                elementPos.top = mouse.y;
                    
                break;
            case containerEdge.bottomLeft:
                xChange = this.initialClickPos.x-mouse.x;
                yChange = mouse.y-this.initialClickPos.y;
                
                elementPos.left = mouse.x;
                elementPos.bottom = window.innerHeight-mouse.y;
                break;
            case containerEdge.bottomRight:
                xChange = mouse.x-this.initialClickPos.x;
                yChange = mouse.y-this.initialClickPos.y;
                
                elementPos.right = window.innerWidth-mouse.x
                elementPos.bottom = window.innerHeight-mouse.y;
                break;
            default:
                xChange=yChange=0;
                break;
        }
        
        var newWidth,newHeight;//New width and height of element
        
        //Change the width/height based on which direction the mouse was moved in more, then maintain the ratio for the other axis
        if(xChange > yChange)
        {
            newWidth = xChange + this.initialSize.width;
            newHeight = newWidth*1.25;
        }
        else
        {
            newHeight = yChange + this.initialSize.height;
            newWidth = newHeight*.8;
        }
        
        //Clamp width/height to max dimensions to avoid some funky behavior (things still act a little weird but I'm satisfied enough with where it's at now)
        if(newWidth > 640){
            newWidth = 640;
            newHeight = 800;
            
            this.initialClickPos = mouse;
            this.initialSize = {width:640,height:800};
            
            elementPos = boundingRect;
        }
        
        //Set style attribs for width/height and proper positions
        this.mainElement.style.width = newWidth + "px";
        this.mainElement.style.height = newHeight + "px";
        
        this.mainElement.style.top = elementPos.top + "px";
        this.mainElement.style.bottom = elementPos.bottom + "px";
        this.mainElement.style.left = elementPos.left + "px";
        this.mainElement.style.right = elementPos.right + "px";
        
        this.mainElement.style.fontSize = mapContainer.clientWidth/360 + "em";//Update font size

        this.updateCurrentPos();
    };    
}; 

//Initialize Google map
function initMap(){
    
    var mapOptions = {
        center: {lat:0, lng:0},
        zoom: 1,
        streetViewControl: false,
        mapTypeControl: false,
        mapTypeId: 'roadmap',
    };
         
    map = new google.maps.Map(document.getElementById('map'),mapOptions);
    
    //Make a custom marker using a little flag icon I made rather than Google's default
    var markerImage = {
        url: 'Assets/FinishFlagMarker.png',
        size: new google.maps.Size(24,32),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(7,30)
    };
    
    //Show this marker at the "actual" target location at end of each round
    actualMarker = new google.maps.Marker({
        position:{lat:0,lng:0},
        map:null,
        icon:markerImage                                     
    });
    
    //Set up array that contains markers/lines to display on final screen for each location
    for(var i = 0; i < numLocations; i++){
        finalLocationMarkers[i] = {
            guess:new google.maps.Marker({
                position:{lat:0,lng:0},
                map:null
            }),
            actual:new google.maps.Marker({
                position:{lat:0,lng:0},
                map:null,
                icon:markerImage
            }),
            line:undefined
        };
    }
    
    //Place a marker where the player clicks on map
    google.maps.event.addListener(map,"click",function(e){             
        placeMarker(e.latLng);
    });
 
    //Initialize everything in the game that isn't the map
    initGame();
}


//Initialize/load all locations
function initGame(){
    
    //Hook up menu buttons
    document.querySelector("#submitButton").onclick = submitGuess;
    document.querySelector("#continueButton").onclick = continueFromResultsPage;
    document.querySelector("#replayButton").onclick = restartGame;
    
    //When on mobile, click this button to show the map for guesses
    document.querySelector("#mobilePopupButton").onclick = function(){
        showMobileMap.call(this);
    };
    
    //Show dropdown menu that contains a summary of locations and points gotten for each
    document.querySelector("#dropdownButton").onclick = function(){
        showFinalDropdown.call(this);
    };
    
    //Set up map container
    var mapContainer = new mapCont(document.querySelector("#mapContainer"),document.querySelector("#moveBar"));
    
    //Hook up move bar so clicking on it sets up stuff for moving the container
    mapContainer.moveBar.onmousedown = function(e){
        if(mapContainer.resizing || window.innerWidth < 800) return;//If already resizing the map or on mobile, just return early - honestly this shouldn't happen but juuuuuust in case
        
        mapContainer.startMove({x:e.clientX,y:e.clientY});//Give position of click so we can move container
        document.body.className = "noSelect";//Prevent contents of page being highlighted while we move because otherwise it's super annoying
    };
      
    //Get array of all resize regions
    var resizeRegions = document.querySelectorAll(".resizeArea");
    
    //Set up all resize regions so clicking on them sets up resizing
    for(var i = 0; i < resizeRegions.length; i++){
        resizeRegions[i].onmousedown = function(e){
            if(mapContainer.moving || window.innerWidth < 800) return;//If moving map container or on mobile, don't resize
            
            mapContainer.edgeToResize = containerEdge[this.id];
            mapContainer.initResize({x:e.clientX,y:e.clientY});
            document.body.className = "noSelect";
        };
    }
    
    //If user releases mouse button, stop moving/resizing
    window.onmouseup = function(e){
        if(mapContainer.moving){
            mapContainer.moving = false;
            document.body.className = "";
        }
        
        if(mapContainer.resizing){
            mapContainer.resizing = false;
            google.maps.event.trigger(map, 'resize');
            document.body.className = "";
        }
    }
    
    //If user moves mouse, update map container if moving/resizing
    window.onmousemove= function(e){  
        var mouse = {x:e.clientX,y:e.clientY};
        
        if(mapContainer.moving)
            mapContainer.move(mouse);
        else if(mapContainer.resizing)
            mapContainer.resize(mouse);
    };
    
    //If window is resized, update the map container so its position is still correct and it stays within window
    window.onresize = function(){
        if(window.innerWidth > 800){
            mapContainer.mainElement.style.transform = "none";
            
            mapContainer.updateCurrentPos();
        }
        else
        {
            mapContainer.mainElement.style.transform = "translateY(95%)";        
        }
    }
    
    updateLoadingScreen();//Fire up the loading screen, it'll check each frame if next location is loaded and then fade out when page is ready
    
    //Start the process of loading 5 locations - these run async and keep searching for articles until they settle on a good one which then gets added to locations array
    for(var i = 0; i < numLocations; i++){
        getGeoData();
    } 
}
        
//Search for an article near a random location on the globe
function getGeoData(){
    
    var coords = generateCoords();//Generate random lat/long coords
    
    var url = encodeURI(geoSearchStub + "&gscoord="+coords.lat+"|"+coords.lng);//Use geosearch feature to search for a WikiPedia article with a location within 10km of the random coords - 10km isn't much, kinda annoying limit
               
    //Get json for geosearch
    $.ajax({
        dataType:"jsonp",
        url:url,
        success:wikiGeoJsonLoaded,//Call wikiGeoJsonLoaded when successfully load
        error:function(obj,errorType,error){
            console.log(errorType+ ": " + error);
            getGeoData();//Try to get another location since this didn't work out
        }
    });          
}
            
//Call when ajax has loaded geosearch results, checks if resulting JSON has a usable wiki page
function wikiGeoJsonLoaded(obj){                                
    var selection = null;
                
    var results = obj.query.geosearch;//Get returned json info
    
    //Search through results for something usable, we only want cities because they have more defined positions on a map
    for(var i = 0; i < results.length; i++){
        if(results[i].type === "city"){
            selection = results[i];
            break;
        }
    }
           
    //If we got a valid selection, hooray!
    if(selection){   
        selection.country = getCountryName(selection.country);//Convert country to usable string for censoring from article
        
        selection.loaded = false;//Set to true when location is fully loaded and page is ready to display
        locations.push(selection);//Add this selection onto the locations array
        
        getWikiPage(selection);//Get the wiki page for this selection
    }
    else
        getGeoData();//If we don't have a valid selection, go back to square one and search for another
}

//Load the actual Wikipedia page for a given location from wikiGeoJsonLoaded
function getWikiPage(locationToLoad){
    
    var url = encodeURI(wikiPageStub + "&titles="+locationToLoad.title);//Set up url to search for wiki page with the title of the location we picked
    
    $.ajax({
        dataType:"jsonp",
        url:url,
        success:wikiPageJsonLoaded,//If we succeed, move on to use the info from loaded wiki page
        error:function(obj,errorType,error){
            console.log(errorType+ ": " + error);
            getGeoData();//Try to get another location since this didn't work out
        }
    });  
}

//Take contents of Wikipedia page, discard if too short or set up for final use on page otherwise
function wikiPageJsonLoaded(data){
    
    var pageData = data.query.pages[Object.keys(data.query.pages)[0]];//Get the object for this page's data - particularly interested in "title" and "extract"
    
    //Find location in array by matching title
    var locationIndex = 0;
    
    //Find this location in the locations array - things are happening async so we'll get it this way to be safe and store the index for future use
    for(var i = 0; i < locations.length; i++){
        if(pageData.title == locations[i].title){
            locationIndex = i;
            break;
        }
    }
    
    //If the page has too little content, it's basically useless so let's just discard it by removing from the locations array and starting over
    if(pageData.extract.length < 750){
        
        locations.splice(locationIndex,1);
        getGeoData();
        
        return;
    }  
    
    var countryName = locations[currentLevel].country;//Get country name to censor from page
    var emptyCountry;
    var title = pageData.title;
    
    //If the country name isn't null, scrub it from the page - this doesn't always work and I suspect it's a failing of the ISOtoCountry.js script, if I keep working on this I'll have to find an alternative
    if(countryName){
        emptyCountry = countryName.replace(new RegExp("[a-zA-Z]","g"),"_");//Prevent cheating by inspecting page source to see the country!
    
        title = title.replace(new RegExp(countryName,"gi"),"<span class='censored noSelect'>"+emptyCountry+"</span>");

        pageData.extract = pageData.extract.replace(new RegExp(countryName,"gi"),"<span class='censored noSelect'>"+emptyCountry+"</span>");
    }
    
    var contents = pageData.extract.split(new RegExp("={2,}","g"));//Split contents into sections, headers are signified with '==TITLE==' so every other element should be considered a header
    //Using RexExp because SOME people have no decency and randomly use 3 or even 4 equals signs for headers.  The regex gets all instances of 2 or more '=' in a row
    
    //Sometimes contents have empty sections so remove those, otherwise set up formatting so line breaks are displayed correctly
    for (var i = 0; i < contents.length; i++){
        var trimmedContent = contents[i].trim();
        
        //If this section is empty, remove its title too
        if(trimmedContent === ""){
            contents.splice(i-1,2);
            i--;
        }            
        else{
            contents[i] = contents[i].replace(new RegExp("(\n){1,}"),"");//Delete the series of line breaks at start so it doesn't make formatting look bad
            contents[i] = contents[i].replace(new RegExp("(\n){1,}","g"),"<br/>");//Replace groups of line breaks with <br/> so that the formatting will show correctly in HTML
        }
    }
    
    var pageContent = "";//String holds contents of page in html styled format, just need to put in innerHTML of content div   
        
    for(var i = 0; i < contents.length;i++){        
        if(i%2 == 1)            
            pageContent += "<h3>"+contents[i]+"</h3>";
        else
            pageContent += "<p>"+contents[i]+"</p>";
    }
    
    //Check if page has any images we can load
    var images = [];
    if(pageData.images){
        for(var i = 0; i < pageData.images.length; i++){
            if(pageData.images[i].title.includes(".jpg") || pageData.images[i].title.includes(".png")){//Only accept jpg or png files, there's often junk files in other formats that we don't want to display
                images.push(pageData.images[i].title)//If valid image, add it to array
            }
        }
    }
    
    //Store this location's info in its array object
    locations[locationIndex].loadedPage = {
        title: title,
        content: pageContent,
        images:images
    }
    
    //Indicate that this location is now loaded and ready to be displayed when the game gets to it
    locations[locationIndex].loaded = true;
}

//Display a loaded page in the mainPage div!
function displayLoadedPage(locationPage){
    document.querySelector("#mainPageHead").innerHTML = "<h1>" + locationPage.title + "</h1>";//Put title in header
    
    var contentDiv = document.querySelector("#pageContents");
    
    contentDiv.innerHTML = locationPage.content;//Set page contents innerHTML to formatted HTML from location
    
    //If there are any images for the page, load them and add them to the bottom of the page
    if(locationPage.images.length > 0){
        contentDiv.innerHTML += "<br/><div id='images'><h3>Images</h3></div>"
        
        for(var i = 0; i < locationPage.images.length; i++)
            getPageImage(locationPage.images[i]);
    }
}


//Get info for a given image file from a wiki page
function getPageImage(imgFile){
    
    var url = encodeURI(imageSearchStub + "&titles=" + imgFile);//Search for image from wiki page
    
    $.ajax({
        dataType:"jsonp",
        url:url,
        success:getImageToDisplay
    });
}

//Use the url from searched image to display it in an <img> tag
function getImageToDisplay(data){
    var imageUrl = data.query.pages[Object.keys(data.query.pages)[0]].imageinfo[0].url;//Get url
    document.querySelector("#images").innerHTML += "<img src='" + imageUrl + "' alt='Image loaded from page'/>";//Add img to page
}
                       
//Place a marker on the map at a given point
function placeMarker(position){        
    if(submitted) return;//Don't add a marker if already submitted guess
    
    //If the marker already exists, set its position to given point
    if(playerMarker){
        playerMarker.setPosition(position);
    }
    //Otherwise, create a new marker
    else{
        playerMarker = new google.maps.Marker({position:position,map:map});
    }
}

//Show the marker where the location actually was
function showActualMarker(){
    actualMarker.setMap(map);
    actualMarker.setPosition({lat:locations[currentLevel].lat, lng:locations[currentLevel].lon});
}

//Submit a guess for the location the player indicated
function submitGuess(){
    if(!playerMarker) return;//Return early if there is not player marker yet
    
    //If we're on the mobile version, hide the map container
    if(window.innerWidth < 800){
        hideMobileMap.call(document.querySelector("#mobilePopupButton"));
    }
    
    submitted = true;
    
    showActualMarker();//Show actual marker
    
    var guessedPos = playerMarker.getPosition();
    var actualPos = actualMarker.getPosition();    
    
    if(lineBetweenPoints){
        lineBetweenPoints.setMap(null);
        lineBetweenPoints.path = null;
    }
    
    //Draw a line beween the guess and actual locations
    lineBetweenPoints = new google.maps.Polyline({
        path: [
            {lat:guessedPos.lat(),lng:guessedPos.lng()},
            {lat:actualPos.lat(),lng:actualPos.lng()}
        ],
        geodesic:false,
        strokeColor: '#E41',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    
    lineBetweenPoints.setMap(map);
    
    //Add marker info about this level to finalLocationMarkers array
    finalLocationMarkers[currentLevel].guess.setPosition(playerMarker.getPosition());
    finalLocationMarkers[currentLevel].actual.setPosition(actualMarker.getPosition());
    finalLocationMarkers[currentLevel].line = lineBetweenPoints;    
    
    
    //Calculate the score for this round and display it
    var dist = google.maps.geometry.spherical.computeDistanceBetween(guessedPos,actualPos)*0.000621371;//Calculate dist between pts in miles (computeDistanceBetween returns in meters)
    var roundScore = calculateScoreFromDist(dist);
    score += roundScore;
    locations[currentLevel].score = roundScore;
    
    document.querySelector("#guessPoints").innerHTML = "You got " + roundScore + " points";
    document.querySelector("#guessDist").innerHTML = "Your guess was " + dist.toFixed(2) + " miles from " + locations[currentLevel].title;
    
    //Increment the current level if we're not at the end
    if(currentLevel < numLocations){
        currentLevel++;
        document.querySelector("#currentScore").innerHTML = "Score: " + score;
        document.querySelector("#roundCount").innerHTML = "Round: " + (currentLevel + 1) + " / " + numLocations;
    }
    
    //Fade in loading screen for transition to round end screen
    $("#loadingScreen").fadeIn(500,function(){
        document.querySelector("#roundEndScreen").style.display = "flex";
        $("#map").appendTo("#roundEndScreen");
        
        google.maps.event.trigger(map, 'resize');//Resize the map

        //Zoom map to fit bounds around the two markers
        var mapBounds = new google.maps.LatLngBounds();

        mapBounds.extend(playerMarker.getPosition());
        mapBounds.extend(actualMarker.getPosition());
        map.fitBounds(mapBounds);

        document.querySelector("#mainPage").style.display = "none";//Hide the main page div
        setTimeout(doneLoadingLevel(),300);//Pause briefly before fading back out so it doesn't look weird
    });
    
}

//Continue from the results page to next location or final screen
function continueFromResultsPage(){    
    if(currentLevel == numLocations){
        goToFinalScreen();
    }
    else{
        $("#loadingScreen").fadeIn(500,function(){
            document.querySelector("#roundEndScreen").style.display = "none";
            updateLoadingScreen();
            
            resetMap();
        });
    }
}

//Reset map to display on next location page
function resetMap(){

    document.querySelector("#mainPage").style.display = "block";//Make main page visible
    
    //Move map back to map container
    $("#map").insertBefore("#submitButton");
    google.maps.event.trigger(map, 'resize');//Resize the map so it'll fit
    
    //Reset map stuff
    lineBetweenPoints.setMap(null);
    lineBetweenPoints.path = null;

    if(playerMarker){
        playerMarker.setMap(null);
        playerMarker = null;
    }

    actualMarker.setMap(null);
    map.setCenter({lat:0,lng:0});
    map.setZoom(1);
    
    submitted = false;
}

//Check whether page loaded yet each frame
function updateLoadingScreen(){
    var id = requestAnimationFrame(updateLoadingScreen);
    
    //If the page is ready, stop this animation loop and fade out the loading screen
    if( locations.length > currentLevel && locations[currentLevel].loaded){     
        displayLoadedPage(locations[currentLevel].loadedPage);
        
        setTimeout(doneLoadingLevel(),500);
        
        cancelAnimationFrame(id);
        return;
    }
}

//Fade out loading screen
function doneLoadingLevel(){
    $("#loadingScreen").fadeOut(500);
}

//Calculate score based on distance in miles
function calculateScoreFromDist(dist){
    //If within a mile give perfect score
    if(dist <= 1){
        return 5000;
    }
    //If beyond 5000 miles then don't bother with math, score is 0
    else if(dist > 5000){
        return 0;
    }
    
    return Math.floor(5000*Math.pow(.999,dist));//Exponential decay function to calculate score - 0 miles is 5000 pts, it decays from there
}

//Go to final screen to display results of game
function goToFinalScreen(){
    
    //Fade in loading screen to hide transition
    $("#loadingScreen").fadeIn(500,function(){
        document.querySelector("#roundEndScreen").style.display = "none";//Hide round end screen, show final screen
        document.querySelector("#gameEndScreen").style.display = "block";
        
        //Insert map in new spot on final screen
        $("#map").insertBefore("#scoreResults");
        google.maps.event.trigger(map, 'resize');//Resize the map so it'll fit
        
        lineBetweenPoints.setMap(null);
        lineBetweenPoints.path = null;

        if(playerMarker){
            playerMarker.setMap(null);
            playerMarker = null;
        }
        actualMarker.setMap(null);

        map.setCenter({lat:0,lng:0});

        var mapBounds = new google.maps.LatLngBounds();    
        
        //Loop through all markers and put them on the map
        for(var i = 0; i < finalLocationMarkers.length; i++){        
            finalLocationMarkers[i].guess.setMap(map);
            finalLocationMarkers[i].actual.setMap(map);
            finalLocationMarkers[i].line.setMap(map);

            mapBounds.extend(finalLocationMarkers[i].guess.getPosition());//Extend bounds of map to fit these markers
            mapBounds.extend(finalLocationMarkers[i].actual.getPosition());
        }

        map.fitBounds(mapBounds);//Zoom to fit all markers
        
        //Fade out loading screen and sit width of score bar so it'll animate when you're on the final screen
        $("#loadingScreen").fadeOut(500,function(){
            var scoreBarWidth = 100*score/(numLocations * 5000);
            document.querySelector("#scoreBarFill").style.width = scoreBarWidth + "%";
        });
    });
    
    //Get the player's stored high score
    var highScore = localStorage.getItem('mapSeek_highscore');
    
    //If no high score exists or this game's score is better, store this game's score as high score
    if(highScore==null || score > highScore){
        highScore = score;
        localStorage.setItem('mapSeek_highscore',score);
    }
    
    document.querySelector("#finalScore").innerHTML = "Final score: <b>" + score + "</b>";
    document.querySelector("#highScore").innerHTML = "High score: <b>" + highScore + "</b>";  
    
    //Element holds breakdown of game results in a hidden drop down section
    var breakdown = document.querySelector("#dropdownContents");
    
    var breakdownText = "";
    
    //Add all location results to the breakdown
    for(var i = 0; i < numLocations; i++){
        if(i%2 == 0){
            breakdownText += "<div class='odd'>";
        }
        else{
            breakdownText += "<div class='even'>";
        }
        
        breakdownText += "<b>"+locations[i].title+"</b>";
        
        breakdownText += "<div class='score'>"+locations[i].score + " points</div></div>"
    }
    
    breakdown.innerHTML = breakdownText;
}

//Restart new game from game end screen
function restartGame(){
    
    document.querySelector("#scoreBarFill").style.width = "0";
    
    locations = [];//Empty locations array
    
    //Reset score and level
    score = 0;
    currentLevel = 0;
    
    document.querySelector("#currentScore").innerHTML = "Score: " + score;
    document.querySelector("#roundCount").innerHTML = "Round: " + (currentLevel + 1) + " / " + numLocations;
    
    //Load 5 new locations
    for(var i = 0; i < numLocations; i++){
        getGeoData();
    }
    
    $("#loadingScreen").fadeIn(500,function(){
        document.querySelector("#gameEndScreen").style.display = "none";//Hide game end screen

        //Reset map and remove other markers
        resetMap();
        
        for(var i = 0; i < finalLocationMarkers.length; i++){        
            finalLocationMarkers[i].guess.setMap(null);
            finalLocationMarkers[i].actual.setMap(null);
            finalLocationMarkers[i].line.setMap(null);
        }
        
        //Start updating loading screen until first location is loaded
        updateLoadingScreen();
    });    
}

//Show dropdown to reveal summary of locations in game - hook up this button so that clicking again will hide this dropdown
function showFinalDropdown(){
    document.querySelector("#dropdownArrow").style.transform = "rotate(0)";
    $("#dropdownContents").slideDown(500,function(){
        this.onclick = hideFinalDropdown.bind(this);                                           
    }.bind(this));
}

//Hide the dropdown of the game summary - hook up this button so clicking again will show dropdown again
function hideFinalDropdown(){
    document.querySelector("#dropdownArrow").style.transform = "rotate(180deg)";
    $("#dropdownContents").slideUp(500,function(){
        this.onclick = showFinalDropdown.bind(this);
    }.bind(this));    
}

//Slide up map container when on mobile
function showMobileMap(){
    
    document.querySelector("#mapContainer").style.transform = "translateY(0)";
    document.querySelector("#mapArrow").style.transform = "rotate(180deg)";
    
    this.onclick = hideMobileMap.bind(this);
}

//Slide map container back down on mobile
function hideMobileMap(){
    document.querySelector("#mapContainer").style.transform = "translateY(95%)";
    document.querySelector("#mapArrow").style.transform = "rotate(0)";
    
    this.onclick = showMobileMap.bind(this);
}

//Return random coordinates somewhere on the globe
function generateCoords(){    
    return {
        lat: getRandomInRange(-60,85,2),//Ignore lat on north and south poles to improve probability of finding a location
        lng: getRandomInRange(-180,180,2)
    };
}

//Helper function that generates a random number between given min and max w/ given number of decimal pts for accuracy
function getRandomInRange(min,max,numDecimals){
    return(Math.random() * (max-min)+min).toFixed(numDecimals) * 1;
}