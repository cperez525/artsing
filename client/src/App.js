import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/navbar/Navbar";
import HomePage from "./pages/homePage";
import SearchPage from "./pages/searchPage";
import SignIn from "./pages/signInPage";
import ProfilePage from "./pages/profilePage"
import Register from "./pages/registerPage";

function App() {

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/profile=:id" component={ProfilePage} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
