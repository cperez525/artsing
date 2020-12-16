import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import NavBar from "./components/navbar/Navbar";
import HomePage from "./pages/homePage";
import SignIn from "./pages/signInPage";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path={["/"]}>
            <HomePage />
          </Route>
          <Route exact path={["/signin"]}>
            <SignIn />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
