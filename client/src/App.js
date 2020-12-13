import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import HomePage from "./pages/homePage";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path={["/", "/home"]}>
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
