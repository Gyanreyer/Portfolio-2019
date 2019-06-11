export default [
  {
    name: "waymark",
    displayName: "Waymark",
    shortDesc:
      "A Detroit-based art and technology company that empowers anyone to make exceptional video ads in seconds.",
    desc:
      "Waymark is a tech startup with a mission to empower businesses to spread their messages through beautiful templated video ads that can be made right in the browser, all in a matter of minutes. Our technology allows users to pick a pre-made video template which is guaranteed to look great and grab people's attention, and then edit their video to include their own images, text, colors, and more in real time. I have been working at Waymark as a full-stack software engineer since July 2018 and loving every minute of it.",
    technologies: ["JavaScript", "React", "CSS", "Python", "Django"],
    primaryLink: "http://waymark.com",
    image: require("../resources/thumbnails/waymark.png"),
    videos: [
      {
        src: require("../resources/videos/waymark.webm"),
        type: "video/webm"
      },
      {
        src: require("../resources/videos/waymark.mp4"),
        type: "video/mp4"
      }
    ],
    primaryColor: "#005ac3",
    textTheme: "light"
  },
  // {
  //   name: "painter",
  //   displayName: "Painter",
  //   shortDesc:
  //     "An experimental web app that procedurally generates art using PixiJS.",
  //   desc:
  //     "A web app that procedurally generates paintings, pixel by pixel. This project started as a fun one-day experiment in trying to randomly generate art using the Canvas API. However, because of the nature of canvas and how it handles pixel-by-pixel manipulation,it ran far slower than I wanted, leading me to do a great deal of research on optimization techniques and ultimately porting it to WebGL using the Three.js library. This was my first experience with WebGL and was an excellent learning experience, I plan to use it more in future projects.",
  //   technologies: [
  //     "JavaScript",
  //     "GLSL",
  //     { text: "Pixi.js", url: "https://github.com/pixijs/pixi.js" }
  //   ],
  //   primaryLink: "/painter",
  //   githubLink: "https://github.com/Gyanreyer/Painter-2",
  //   image: require("../resources/thumbnails/painter.jpg"),
  //   videos: [
  //     {
  //       src: require("../resources/videos/painter.webm"),
  //       type: "video/webm"
  //     },
  //     {
  //       src: require("../resources/videos/painter.mp4"),
  //       type: "video/mp4"
  //     }
  //   ],
  //   primaryColor: "#3bb583",
  //   textTheme: "light"
  // },
  {
    name: "painter",
    displayName: "Painter",
    shortDesc:
      "An experimental web app that procedurally generates watercolor-style art using WebGL.",
    desc:
      "A web app that procedurally generates paintings, pixel by pixel. This project started as a fun one-day experiment in trying to randomly generate art using the Canvas API. However, because of the nature of canvas and how it handles pixel-by-pixel manipulation,it ran far slower than I wanted, leading me to do a great deal of research on optimization techniques and ultimately porting it to WebGL using the Three.js library. I am currently actively working on a remake of this with significantly better performance using Pixi.js. Stay tuned!",
    technologies: [
      "JavaScript",
      "GLSL",
      { text: "Three.js", url: "https://threejs.org/" }
    ],
    primaryLink: "/painter",
    githubLink: "https://github.com/Gyanreyer/Painter",
    image: require("../resources/thumbnails/painter.jpg"),
    videos: [
      {
        src: require("../resources/videos/painter_legacy.webm"),
        type: "video/webm"
      },
      {
        src: require("../resources/videos/painter_legacy.mp4"),
        type: "video/mp4"
      }
    ],
    primaryColor: "#3bb583",
    textTheme: "light"
  },
  {
    name: "spookemup",
    displayName: "Spook 'em Up",
    shortDesc:
      "A simple first-person shooter game built from scratch with C++ and DirectX11.",
    desc:
      "A simple first-person shooter game built from scratch with C++ and DirectX11 in which the player must kill all enemies in the environment without being killed themselves. This game was made in a team with 2 other students in which I served as the primary gameplay programmer. It was made over the course of about 2 months as a class project for Foundations of Game Graphics Programming, Fall 2017.",
    technologies: ["C++", "DirectX11"],
    primaryLink: "https://github.com/Gyanreyer/GGP-Game-Engine/releases",
    githubLink: "https://github.com/Gyanreyer/GGP-Game-Engine",
    image: require("../resources/thumbnails/spookemup.jpg"),
    videos: [
      {
        src: require("../resources/videos/spookemup.webm"),
        type: "video/webm"
      },
      {
        src: require("../resources/videos/spookemup.mp4"),
        type: "video/mp4"
      }
    ],
    primaryColor: "#b8643d",
    textTheme: "light"
  },
  {
    name: "tickr",
    displayName: "Tickr",
    shortDesc:
      "A web app that allows users to search for and view visualizations of stock market data.",
    desc:
      "A web application that uses the free Alpha Vantage API to allow users to search thousands of stocks and view visualizations of realtime and historical stock price data from the last 5 years. This was made as a class project over the course of a month for Rich Media Web App Development II, Fall 2017.",
    technologies: [
      "JavaScript",
      {
        text: "Alpha Vantage API",
        url: "https://www.alphavantage.co/"
      },
      "HTML",
      "CSS"
    ],
    primaryLink: "https://get-tickr.herokuapp.com/",
    githubLink: "https://github.com/Gyanreyer/Tickr",
    image: require("../resources/thumbnails/tickr.png"),
    videos: [
      {
        src: require("../resources/videos/tickr.webm"),
        type: "video/webm"
      },
      {
        src: require("../resources/videos/tickr.mp4"),
        type: "video/mp4"
      }
    ],
    primaryColor: "#469e46",
    textTheme: "light"
  },
  {
    name: "mapseek",
    displayName: "MapSeek",
    shortDesc:
      "A web game where players must find random locations on a map based on WikiPedia articles.",
    desc:
      "A web game based on the Google Maps and MediaWiki APIs in which the player must read WikiPedia articles about locations in the world and try to locate them as accurately as possible on a map. This game was heavily inspired by GeoGuessr and was made as a class project for Rich Media Web App Development I, Fall 2016.",
    technologies: [
      "JavaScript",
      { text: "Google Maps API", url: "https://developers.google.com/maps/" },
      {
        text: "MediaWiki API",
        url: "https://www.mediawiki.org/wiki/API:Main_page"
      },
      "HTML",
      "CSS"
    ],
    primaryLink: "/mapseek",
    githubLink: "https://github.com/Gyanreyer/MapSeek",
    image: require("../resources/thumbnails/mapseek.jpg"),
    videos: [
      {
        src: require("../resources/videos/mapseek.webm"),
        type: "video/webm"
      },
      {
        src: require("../resources/videos/mapseek.mp4"),
        type: "video/mp4"
      }
    ],
    primaryColor: "#1c682a",
    textTheme: "light"
  },
  {
    name: "rocketkick",
    displayName: "RocketKick",
    shortDesc:
      "A local multiplayer fighting game in which players use rocket-propelled kicks to kill their opponents.",
    desc:
      "A local multiplayer platformer fighting game in which players must use rocket-propelled flying kicks to kill their opponents. This game was made in a team with 3 other students in which I served as team lead and lead programmer. It was made over the course of a month and was a class project for Game Design and Development II, Fall 2016.",
    technologies: [
      "C#",
      {
        text: "Unity Engine",
        url: "https://unity.com/"
      }
    ],
    primaryLink: "https://github.com/Gyanreyer/RocketKick/releases",
    githubLink: "https://github.com/Gyanreyer/RocketKick",
    image: require("../resources/thumbnails/rocketkick.jpg"),
    videos: [
      {
        src: require("../resources/videos/rocketkick.webm"),
        type: "video/webm"
      },
      {
        src: require("../resources/videos/rocketkick.mp4"),
        type: "video/mp4"
      }
    ],
    primaryColor: "#923e75",
    textTheme: "light"
  },
  {
    name: "whitehat",
    displayName: "White Hat",
    shortDesc:
      "A top-down 80s sci-fi themed stealth game in which players must sneak past enemies to the end of every level.",
    desc:
      "A top-down 80s sci-fi themed stealth game in which players must reach the end of each level while avoiding being detected by enemies or cameras. This game was made in a team with 3 other students in which I served as team lead and lead programmer. It was made over the course of a month and was a class project for Game Design and Development II, Fall 2016.",
    technologies: [
      "C#",
      {
        text: "Unity Engine",
        url: "https://unity.com/"
      }
    ],
    primaryLink: "https://github.com/Gyanreyer/WhiteHat/releases",
    githubLink: "https://github.com/Gyanreyer/WhiteHat",
    image: require("../resources/thumbnails/whitehat.jpg"),
    videos: [
      {
        src: require("../resources/videos/whitehat.webm"),
        type: "video/webm"
      },
      {
        src: require("../resources/videos/whitehat.mp4"),
        type: "video/mp4"
      }
    ],
    primaryColor: "#621E7D",
    textTheme: "light"
  },
  {
    name: "soundwaves",
    displayName: "Soundwaves",
    shortDesc:
      "A web app that visualizes frequency and wavelength data from songs.",
    desc:
      "A web app that visualizes frequency and wavelength data from songs using the Canvas and Web Audio APIs. This was made as a class project for Rich Media Web App Development I, Fall 2016.",
    technologies: ["JavaScript", "HTML", "CSS"],
    primaryLink: "/soundwaves",
    githubLink: "https://github.com/Gyanreyer/Soundwaves",
    image: require("../resources/thumbnails/soundwaves.jpg"),
    videos: [
      {
        src: require("../resources/videos/soundwaves.webm"),
        type: "video/webm"
      },
      {
        src: require("../resources/videos/soundwaves.mp4"),
        type: "video/mp4"
      }
    ],
    primaryColor: "#d09a50",
    textTheme: "light"
  },
  {
    name: "subtractus",
    displayName: "Subtractus",
    shortDesc:
      "A casual puzzle game for Android about pushing numbered tiles together on a grid to subtract them down to zero.",
    desc:
      "A simple puzzle game for Android about subtracting numbers on a grid, heavily inspired by Threes. Players must swipe up, down, left, or right to move the numbered tiles, pushing the tiles together to subtract their numbers until they have all been subtracted down to 0 to clear the board. This game was a personal project made in the Unity engine that I worked on throughout the summer of 2016.",
    technologies: [
      "C#",
      {
        text: "Unity Engine",
        url: "https://unity.com/"
      }
    ],
    primaryLink: "https://github.com/Gyanreyer/Subtractus/releases",
    githubLink: "https://github.com/Gyanreyer/Subtractus",
    image: require("../resources/thumbnails/subtractus.png"),
    videos: [
      {
        src: require("../resources/videos/subtractus.webm"),
        type: "video/webm"
      },
      {
        src: require("../resources/videos/subtractus.mp4"),
        type: "video/mp4"
      }
    ],
    primaryColor: "#da860e",
    textTheme: "light"
  },
  {
    name: "reef",
    displayName: "Reef",
    shortDesc:
      "A steering behavior simulation of a shark chasing a school of fish around an ocean environment.",
    desc:
      "An ocean life simulation of a shark hunting a school of fish based on steering behaviors such as flocking, wandering, and pursuit/avoidance. I personally made all 3D models and textures with AutoDesk Maya and Adobe Photoshop, and the simulation was made using the Unity game engine. This was a class project for Interactive Media Development, Fall 2015.",
    technologies: [
      "C#",
      {
        text: "Unity Engine",
        url: "https://unity.com/"
      }
    ],
    primaryLink: "https://github.com/Gyanreyer/Reef/releases",
    githubLink: "https://github.com/Gyanreyer/Reef",
    image: require("../resources/thumbnails/reef.png"),
    videos: [
      {
        src: require("../resources/videos/reef.webm"),
        type: "video/webm"
      },
      {
        src: require("../resources/videos/reef.mp4"),
        type: "video/mp4"
      }
    ],
    primaryColor: "#1579A2",
    textTheme: "light"
  },
  {
    name: "asteroids",
    displayName: "Asteroids",
    shortDesc:
      "A clone of the classic arcade game Asteroids made using Processing",
    desc:
      "A clone of the classic arcade game asteroids made using Processing, a Java-based language focused on making graphical output easy in a similar way to JavaScript's Canvas API. This was a class project for Interactive Media Development, Fall 2015.",
    technologies: [{ text: "Processing", url: "https://processing.org/" }],
    primaryLink: "https://github.com/Gyanreyer/Asteroids/releases",
    githubLink: "https://github.com/Gyanreyer/Asteroids",
    image: require("../resources/thumbnails/asteroids.png"),
    videos: [
      {
        src: require("../resources/videos/asteroids.webm"),
        type: "video/webm"
      },
      {
        src: require("../resources/videos/asteroids.mp4"),
        type: "video/mp4"
      }
    ],
    primaryColor: "#c46741",
    textTheme: "light"
  },
  {
    name: "westernquadrant",
    displayName: "Western Quadrant",
    shortDesc:
      "An isometric shooter in which the player must survive against large numbers of enemies.",
    desc:
      "An isometric shooter in which the player must try to stay alive as long as possible against an onslaught of enemies. This game was made over the course of a whole semester in a group with 2 other students on which I served as a gameplay programmer. This was a class project for Game Development and Algorithmic Problem Solving II, Spring 2015.",
    technologies: ["C#", { text: "MonoGame", url: "http://www.monogame.net/" }],
    primaryLink: "https://github.com/Gyanreyer/WesternQuadrantGame/releases",
    githubLink: "https://github.com/Gyanreyer/WesternQuadrantGame",
    image: require("../resources/thumbnails/westernquadrant.jpg"),
    videos: [
      {
        src: require("../resources/videos/westernquadrant.webm"),
        type: "video/webm"
      },
      {
        src: require("../resources/videos/westernquadrant.mp4"),
        type: "video/mp4"
      }
    ],
    primaryColor: "#940435",
    textTheme: "light"
  }
];
