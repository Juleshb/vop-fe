import {
    Navbar,
    Home,
    About,
    Teacher,
    Contact,
    Courses,
    Footer,
  } from "./index";
  
  
  
  function App() {
  
    return (
      <div className="font-Poppins bg-white">
       
        <Home />
        <About />
        <Courses />
        <Teacher />
        <Contact />
        <Footer />
      </div>
    );
  }
  
  export default App;
  