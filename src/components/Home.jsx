import {
    Navbar,
    Home,
    About,
    Teacher,
    Contact,
    Courses,
    Footer,
    ImageGallery
  } from "./index";
  
  
  
  function App() {
  
    return (
      <div className="font-Poppins bg-white">
       
        <Home />
        <About />
        <Courses />
        <Teacher />
        <ImageGallery />
        <Contact />
        <Footer />
      </div>
    );
  }
  
  export default App;
  