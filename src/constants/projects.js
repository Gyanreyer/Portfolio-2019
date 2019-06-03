export default [
  {
    name: "waymark",
    displayName: "Waymark",
    shortDesc:
      "A Detroit-based art and technology startup that empowers anyone to make exceptional video ads in seconds.",
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    technologies: ["JavaScript", "React", "CSS", "Python", "Django"],
    primaryLink: "http://waymark.com",
    image: require("../images/thumbnails/waymark.jpg"),
    primaryColor: "#CCC",
    textTheme: "dark"
  },
  {
    name: "painter",
    displayName: "Painter",
    shortDesc:
      "An experimental web app that procedurally generates art using PixiJS.",
    desc: "A painting application",
    technologies: [
      "JavaScript",
      "GLSL",
      { text: "Pixi.js", url: "https://github.com/pixijs/pixi.js" }
    ],
    primaryLink: "http://rgeyer.com/Painter",
    githubLink: "https://github.com/Gyanreyer/Painter-2",
    image: require("../images/thumbnails/painter.jpg"),
    primaryColor: "#CC6765",
    textTheme: "light"
  },
  {
    name: "rocketkick",
    displayName: "RocketKick",
    shortDesc:
      "A local multiplayer fighting game in which players use rocket-propelled kicks to kill their opponents",
    desc:
      "A local multiplayer platformer fighting game in which players must use rocket-propelled flying kicks to kill their opponents. This game was made in a team with 3 other students in which I served as team lead and lead programmer. It was made over the course of a month and was a class project for Game Design and Development II, Fall 2016.",
    technologies: [
      "C#",
      {
        text: "Unity Engine",
        url: "https://unity.com/"
      }
    ],
    primaryLink: "https://github.com/Gyanreyer/RocketKick",
    image: require("../images/thumbnails/rocketkick.jpg"),
    primaryColor: "#c8c86e",
    textTheme: "dark"
  }
];
