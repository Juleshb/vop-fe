import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Admin";
import Login from "./components/login";
import { AuthProvider } from "./components/context/AuthContext"; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="font-Poppins bg-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
