import React from "react"
import { Container, Row } from "react-bootstrap";
import { AuthProvider } from "./AuthContext";
import Signup from "./Signup";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from "./Dashboard"
import Login from "./Login"
import ForgotPassword from "./ForgotPassword";

function App() {
  return (
      <div className="d-flex allign-items-center justify-content-center" style={{ minheight: "100vh" }}>
        <Container>
          <Router>
            <AuthProvider>
              <Routes>
                <Route path="/login" element={<Login/>} />
                <Route exact path="/" element={<Dashboard/>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/forgotpassword" element={<ForgotPassword/>} />
              </Routes>
            </AuthProvider>
          </Router>
        </Container>
      </div>
  )
}

export default App;
