import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "/src/Pages/LoginPage";
import SignupPage from "/src/Pages/SignupPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/SignupPage" component={SignupPage} />
        <Route path="/" component={LoginPage} />
      </Switch>
    </Router>
  );
}

export default App;
