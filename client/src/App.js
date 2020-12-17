import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/navbar/Navbar";
import HomePage from "./pages/homePage";
import SearchPage from "./pages/searchPage";
import SignIn from "./pages/signInPage";
import ProfilePage from "./pages/profilePage"

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route exact path="/search">
            <SearchPage />
          </Route>
          <Route exact path="/user">
            <ProfilePage />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
