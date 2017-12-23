const projects = {
  asteroids: {
    name: 'Asteroids',
    pathName: 'asteroids',
    date: 'September 2015',
    description: 'A clone of the classic arcade game asteroids made using Processing, ' +
            "a Java-based language focused on making graphical output easy in a similar way to JavaScript's Canvas API. " +
            'This was a class project for Interactive Media Development, Fall 2015.',
    technologies: '<a href="https://processing.org/" class="fade-hover">Processing</a>',
    links: 'Download and play it <a href="../../downloads/Geyer_Asteroids.zip" class="fade-hover">here</a> ' +
            'or look at the source code on GitHub <a href="https://github.com/Gyanreyer/Asteroids" class="fade-hover">here</a>.',
  },
  mapseek: {
    name: 'MapSeek',
    pathName: 'mapseek',
    date: 'December 2016',
    description: 'A web game based on the Google Maps and MediaWiki APIs in which the player ' +
            'must read WikiPedia articles about locations in the world and try to locate them as ' +
            'accurately as possible on a map. This game was heavily inspired by GeoGuessr and was ' +
            'made as a class project for Rich Media Web App Development I, Fall 2016.',
    technologies: 'JavaScript, <a href="https://developers.google.com/maps/" class="fade-hover">Google Maps API</a>, ' +
            '<a href="https://www.mediawiki.org/wiki/API:Main_page" class="fade-hover">MediaWiki API</a>, HTML, CSS',
    links: 'Play the game <a href="/MapSeek" class="fade-hover">here</a> ' +
            'or look at the source code on GitHub <a href="https://github.com/Gyanreyer/MapSeek">here</a>.',
  },
  painter: {
    name: 'Painter',
    pathName: 'painter',
    date: 'February 2017',
    description: 'A web application that procedurally generates paintings, pixel by pixel. ' +
            'This project started as a fun one-day experiment in trying to randomly generate art ' +
            'using the Canvas API. However, because of the nature of canvas and how it handles pixel-by-pixel  ' +
            'manipulation,it ran far slower than I wanted, leading me to do a great deal of research ' +
            'on optimization techniques and ultimately porting it to WebGL using the Three.js library. ' +
            'This was my first experience with WebGL and was an excellent learning experience, I plan to use it more in future projects.',
    technologies: 'JavaScript, <a href="https://threejs.org/" class="fade-hover">Three.js</a>, HTML, CSS',
    links: 'Play around with it <a href="/Painter" class="fade-hover">here</a> or check out the source code ' +
            'on GitHub <a href="https://github.com/Gyanreyer/Painter" class="fade-hover">here</a>.',
  },
  reef: {
    name: 'Reef',
    pathName: 'reef',
    date: 'November 2015',
    description: 'An ocean life simulation of a shark hunting a school of fish based on steering behaviors such as ' +
            'flocking, wandering, and pursuit/avoidance. I personally made all 3D models and textures with AutoDesk Maya ' +
            'and Adobe Photoshop, and the simulation was made using the Unity game engine. This was a class project for Interactive Media Development, Fall 2015.',
    technologies: 'C#, Unity Engine',
    links: 'Download and play it <a href="../../downloads/Geyer_Reef.zip" class="fade-hover">here</a> ' +
            'or look at the source code on GitHub <a href="https://github.com/Gyanreyer/Reef" class="fade-hover">here</a>.',
  },
  rocketkick: {
    name: 'RocketKick',
    pathName: 'rocketkick',
    date: 'October 2016',
    description: 'A local multiplayer platformer fighting game in which players must use rocket-propelled flying kicks to kill their opponents. ' +
            'This game was made in a team with 3 other students in which I served as team lead and lead programmer. It was made over ' +
            'the course of a month and was a class project for Game Design and Development II, Fall 2016.',
    technologies: 'C#, Unity Engine',
    links: 'Download and play the game <a href="../../downloads/RocketKick_0_1.zip" class="fade-hover">here</a> ' +
            'or look at the source code on GitHub <a href="https://github.com/Gyanreyer/RocketKick" class="fade-hover">here</a>.',
  },
  soundwaves: {
    name: 'Soundwaves',
    pathName: 'soundwaves',
    date: 'September 2016',
    description: 'A web app that visualizes frequency and wavelength data from songs using the ' +
            '<a href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API" class="fade-hover">Canvas</a> ' +
            'and <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API" class="fade-hover">Web Audio</a> ' +
            'APIs. This was made as a class project for Rich Media Web App Development I, Fall 2016.',
    technologies: 'JavaScript, HTML, CSS',
    links: 'Play around with it <a href="http://rgeyer.com/Soundwaves" class="fade-hover">here</a> ' +
            'or check out the source code on GitHub <a href="https://github.com/Gyanreyer/Soundwaves" class="fade-hover">here</a>.',
  },
  subtractus: {
    name: 'Subtractus',
    pathName: 'subtractus',
    date: 'Summer 2016',
    description: 'A simple puzzle game for Android about subtracting numbers on a grid, heavily inspired by Threes. ' +
            'Players must swipe up, down, left, or right to move the numbered tiles, pushing the tiles together to ' +
            'subtract their numbers until they have all been subtracted down to 0 to clear the board. This game was a ' +
            'personal project made in the Unity engine that I worked on throughout the summer of 2016.',
    technologies: 'C#, Unity Engine',
    links: 'Download the APK to play on Android <a href="../../downloads/Subtractus_0_2.apk" class="fade-hover">here</a> ' +
            'or check out the source code on GitHub <a href="https://github.com/Gyanreyer/Subtractus" class="fade-hover">here</a>.',
  },
  westernquad: {
    name: 'Western Quadrant',
    pathName: 'westernquad',
    date: 'Spring 2015',
    description: 'An isometric shooter in which the player must try to stay alive as long as possible against an ' +
            'onslaught of enemies. This game was made over the course of a whole semester in a group with 2 other students ' +
            'on which I served as a gameplay programmer. This was a class project for Game Development and Algorithmic Problem Solving II, Spring 2015.',
    technologies: 'C#, <a href="http://www.monogame.net/" class="fade-hover">MonoGame</a>',
    links: 'Download and play it <a href="../../downloads/Geyer_WesternQuadrant.zip" class="fade-hover">here</a> ' +
            'or look at the source code on GitHub <a href="https://github.com/Gyanreyer/WesternQuadrantGame" class="fade-hover">here</a>.',
  },
  whitehat: {
    name: 'White Hat',
    pathName: 'whitehat',
    date: 'November-December 2016',
    description: 'A top-down sci-fi stealth game in which players must reach the end of each level while ' +
            'avoiding being detected by enemies or cameras. This game was made in a team with 3 other students ' +
            'in which I served as team lead and lead programmer. It was made over the course of a month and was a ' +
            'class project for Game Design and Development II, Fall 2016.',
    technologies: 'C#, Unity Engines',
    links: 'Download and play the game <a href="../../downloads/WhiteHat_Final.zip" class="fade-hover">here</a> ' +
            'or look at the source code on GitHub <a href="https://github.com/Gyanreyer/WhiteHat" class="fade-hover">here</a>.',
  },

};

const getProjectPage = (req, res) => {
  // If no name provided, return not found
  if (!req.params.name) {
    return res.status(404).render('notFound');
  }

  // Parse received name into lowercase string
  const parsedName = `${req.params.name}`.toLowerCase();

  // Check if the requested project exists, if not return not found
  if (!projects[parsedName]) {
    return res.status(404).render('notFound');
  }

  // Render project page with data for this project
  return res.render('project', projects[parsedName]);
};

module.exports = getProjectPage;