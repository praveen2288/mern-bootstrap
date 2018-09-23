import React, { Component } from "react";
import NavBar from "../components/navbar.jsx";
import LoginPage from "../components/loginpage.jsx";

class MainPage extends Component {
  render() {
    return (
      <div className="container-fluid">
        <NavBar />
        <div className="content">
          <LoginPage />
        </div>
      </div>
    );
  }
}

export default MainPage;
