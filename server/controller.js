const projects = {
  spookemup: {
    name: `Spook 'em Up`,
    pathName: 'spookemup',
    date: 'Fall 2017',
    shortDesc: 'A simple first-person shooter game built with C++ and DirectX11',
    description: 'A simple first-person shooter game built from scratch with C++ and DirectX11 in which ' +
        'the player must kill all enemies in the environment without being killed themselves. This game was made in a team with 2 other students ' +
        'in which I served as the primary gameplay programmer. It was made over the course of about 2 ' +
        'months as a class project for Foundations of Game Graphics Programming, Fall 2017.',
    technologies: 'C++, DirectX11',
    links: 'Check it out on GitHub <a href="https://github.com/Gyanreyer/GGP-Game-Engine" class="fade-hover">here</a>.'
  },
  tickr: {
    name: 'Tickr',
    pathName: 'tickr',
    date: 'October 2017',
    shortDesc: 'A web app that allows users to search for and view visualizations of stock market data',
    description: 'A web application that uses the free Alpha Vantage API to allow users to search thousands of stocks and view visualizations of ' +
        'realtime and historical stock price data from the last 5 years. This was made as a class project over the course ' +
        'of a month for Rich Media Web App Development II, Fall 2017.',
    technologies: 'Node.js, <a href="https://www.alphavantage.co/">Alpha Vantage API</a>, JavaScript, HTML, CSS',
    links: 'Try it out <a href="https://get-tickr.herokuapp.com/">here</a> ' +
        'or check out the source code on GitHub <a href="https://github.com/Gyanreyer/Tickr" class="fade-hover">here</a>.'
  },
  painter: {
    name: 'Painter',
    pathName: 'painter',
    date: 'February 2017',
    shortDesc: 'An experimental web app that procedurally generates watercolor-style art using WebGL',
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
  mapseek: {
    name: 'MapSeek',
    pathName: 'mapseek',
    date: 'December 2016',
    shortDesc: 'A web game where players must find random locations on a map based on WikiPedia articles',
    description: 'A web game based on the Google Maps and MediaWiki APIs in which the player ' +
            'must read WikiPedia articles about locations in the world and try to locate them as ' +
            'accurately as possible on a map. This game was heavily inspired by GeoGuessr and was ' +
            'made as a class project for Rich Media Web App Development I, Fall 2016.',
    technologies: 'JavaScript, <a href="https://developers.google.com/maps/" class="fade-hover">Google Maps API</a>, ' +
            '<a href="https://www.mediawiki.org/wiki/API:Main_page" class="fade-hover">MediaWiki API</a>, HTML, CSS',
    links: 'Play the game <a href="/MapSeek" class="fade-hover">here</a> ' +
            'or look at the source code on GitHub <a href="https://github.com/Gyanreyer/MapSeek">here</a>.',
  },
  whitehat: {
    name: 'White Hat',
    pathName: 'whitehat',
    date: 'November 2016',
    shortDesc: 'A top-down 80s sci-fi themed stealth game in which players must sneak past enemies to the end of every level',
    description: 'A top-down 80s sci-fi themed stealth game in which players must reach the end of each level while ' +
            'avoiding being detected by enemies or cameras. This game was made in a team with 3 other students ' +
            'in which I served as team lead and lead programmer. It was made over the course of a month and was a ' +
            'class project for Game Design and Development II, Fall 2016.',
    technologies: 'C#, Unity Engine',
    links: 'Check it out on GitHub <a href="https://github.com/Gyanreyer/WhiteHat" class="fade-hover">here</a>.',
    },
  rocketkick: {
    name: 'RocketKick',
    pathName: 'rocketkick',
    date: 'October 2016',
    shortDesc: 'A local multiplayer fighting game in which players use rocket-propelled kicks to kill their opponents',
    description: 'A local multiplayer platformer fighting game in which players must use rocket-propelled flying kicks to kill their opponents. ' +
            'This game was made in a team with 3 other students in which I served as team lead and lead programmer. It was made over ' +
            'the course of a month and was a class project for Game Design and Development II, Fall 2016.',
    technologies: 'C#, Unity Engine',
    links: 'Check it out on GitHub <a href="https://github.com/Gyanreyer/RocketKick" class="fade-hover">here</a>.',
  },
  soundwaves: {
    name: 'Soundwaves',
    pathName: 'soundwaves',
    date: 'September 2016',
    shortDesc: 'A web app that visualizes frequency and wavelength data from songs',
    description: 'A web app that visualizes frequency and wavelength data from songs using the ' +
            '<a href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API" class="fade-hover">Canvas</a> ' +
            'and <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API" class="fade-hover">Web Audio</a> ' +
            'APIs. This was made as a class project for Rich Media Web App Development I, Fall 2016.',
    technologies: 'JavaScript, HTML, CSS',
    links: 'Play around with it <a href="/Soundwaves" class="fade-hover">here</a> ' +
            'or check out the source code on GitHub <a href="https://github.com/Gyanreyer/Soundwaves" class="fade-hover">here</a>.',
  },
  subtractus: {
    name: 'Subtractus',
    pathName: 'subtractus',
    date: 'Summer 2016',
    shortDesc: 'A casual puzzle game for Android about pushing numbered tiles together on a grid to subtract them down to zero',
    description: 'A simple puzzle game for Android about subtracting numbers on a grid, heavily inspired by Threes. ' +
            'Players must swipe up, down, left, or right to move the numbered tiles, pushing the tiles together to ' +
            'subtract their numbers until they have all been subtracted down to 0 to clear the board. This game was a ' +
            'personal project made in the Unity engine that I worked on throughout the summer of 2016.',
    technologies: 'C#, Unity Engine',
    links: 'Check it out on GitHub <a href="https://github.com/Gyanreyer/Subtractus" class="fade-hover">here</a>.',
  },
  reef: {
    name: 'Reef',
    pathName: 'reef',
    date: 'November 2015',
    shortDesc: 'A steering behavior simulation of a shark chasing a school of fish around an ocean environment',
    description: 'An ocean life simulation of a shark hunting a school of fish based on steering behaviors such as ' +
            'flocking, wandering, and pursuit/avoidance. I personally made all 3D models and textures with AutoDesk Maya ' +
            'and Adobe Photoshop, and the simulation was made using the Unity game engine. This was a class project for Interactive Media Development, Fall 2015.',
    technologies: 'C#, Unity Engine',
    links: 'Check it out on GitHub <a href="https://github.com/Gyanreyer/Reef" class="fade-hover">here</a>.',
  },
  asteroids: {
    name: 'Asteroids',
    pathName: 'asteroids',
    date: 'September 2015',
    shortDesc: 'A clone of the classic arcade game Asteroids made using Processing',
    description: 'A clone of the classic arcade game asteroids made using Processing, ' +
            "a Java-based language focused on making graphical output easy in a similar way to JavaScript's Canvas API. " +
            'This was a class project for Interactive Media Development, Fall 2015.',
    technologies: '<a href="https://processing.org/" class="fade-hover">Processing</a>',
    links: 'Check it out on GitHub <a href="https://github.com/Gyanreyer/Asteroids" class="fade-hover">here</a>.',
  },
  westernquad: {
    name: 'Western Quadrant',
    pathName: 'westernquad',
    date: 'Spring 2015',
    shortDesc: 'An isometric shooter in which the player must survive against large numbers of enemies',
    description: 'An isometric shooter in which the player must try to stay alive as long as possible against an ' +
            'onslaught of enemies. This game was made over the course of a whole semester in a group with 2 other students ' +
            'on which I served as a gameplay programmer. This was a class project for Game Development and Algorithmic Problem Solving II, Spring 2015.',
    technologies: 'C#, <a href="http://www.monogame.net/" class="fade-hover">MonoGame</a>',
    links: 'Check it out on GitHub <a href="https://github.com/Gyanreyer/WesternQuadrantGame" class="fade-hover">here</a>.',
  },
};

const renderProjectPage = (req, res) => {
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

const renderHomePage = (req, res) => {
    const projectList = Object.values(projects);

    res.render('home', {projects: projectList});
};

module.exports = {
    renderProjectPage,
    renderHomePage
};