import { FiPenTool } from "react-icons/fi";
import { FaLaptopCode } from "react-icons/fa";
import { BsBarChartLine } from "react-icons/bs";
import { MdOutlineScience } from "react-icons/md";

import courses1 from "./assets/courses1.jpg";
import courses2 from "./assets/courses2.jpg";
import courses3 from "./assets/courses3.jpg";
import courses4 from "./assets/courses4.jpg";
import courses5 from "./assets/courses5.jpg";
import courses6 from "./assets/courses6.jpg";
import courses7 from "./assets/courses7.jpg";
import courses8 from "./assets/courses8.jpg";

import logo1 from "./assets/logo1.png";
import logo2 from "./assets/logo2.png";
import logo3 from "./assets/logo3.png";
import logo4 from "./assets/logo4.png";
import logo5 from "./assets/logo5.png";
import logo6 from "./assets/logo6.png";

export const navLinks = [
  {
    id: 1,
    href: "home",
    link: "Home",
  },
  {
    id: 2,
    href: "about",
    link: "About Me",
  },
  {
    id: 3,
    href: "courses",
    link: "Projects",
  },
  {
    id: 4,
    href: "teacher",
    link: "Skills",
  },
  {
    id: 5,
    href: "contact",
    link: "Contact",
  },
];

export const categories = [
  {
    id: 1,
    icon: <FiPenTool />,
    category: "Design",
  },
  {
    id: 2,
    icon: <FaLaptopCode />,
    category: "Development",
  },
  {
    id: 3,
    icon: <BsBarChartLine />,
    category: "Business",
  },
  {
    id: 4,
    icon: <MdOutlineScience />,
    category: "Science",
  },
];

export const courses = [
  {
    id: 1,
    image: courses1,
    category: "PHANTOM APP ",
    title: " Is project hellp passengers to track buses movement",
    
  },
  {
    id: 2,
    image: courses2,
    category: "Discipline CONNECT",
    title: "Software helps to track Disciplene on High scools",
   
  },
  {
    id: 3,
    image: courses3,
    category: "Tega Bus",
    title: "is Software used to book bus ticket",
    
  },
  {
    id: 4,
    image: courses4,
    category: "Web Design",
    title: "UI/UX Design ",
    
  },
  {
    id: 5,
    image: courses5,
    category: "Finance MS",
    title: "Software used to manage finance transactions",
  },
 
];

export const logos = [logo1, logo2, logo3, logo4, logo5, logo6];

export const accordions = [
  {
    id: 1,
    title: "Front-end Development",
    description: "I am an experienced frontend developer skilled in React, Redux, Tailwind, TypeScript  HTML5, CSS3, Sass, Vue.js, WordPress and more. I have a strong understanding of these technologies and have delivered high-quality projects using them.",
  },
  {
    id: 2,
    title: "Back-end Development",
    description: "I am an experienced in Node.js backend developer with expertise in Express and database integration, PHP, Postgres, Laravel, MySQL,Yii and more. I have a strong understanding of the core concepts and ability to build robust, scalable applications.",
  },
  {
    id: 3,
    title: "Mobile Developer",
    description: "I have comprehensive knowledge in React Native, a framework for cross-platform mobile app development. My expertise includes building apps, using widgets, streams, animations, APIs and backend services, stateful/stateless widgets, architecture patterns, Dart and Flutter CLI. I am confident in delivering top-notch results in any React Native project.",
  },
  {
    id: 4,
    title: "UI/UX Design:",
    description: "Figma, Piktochart, Adobe Photoshop, AI, AAE",
  },
  {
    id: 5,
    title: "Tools and Platform",
    description: " Git, Github, Heroku, Netlify, Firebase, Trello",
  },
];
