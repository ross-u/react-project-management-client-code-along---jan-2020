import React from "react";
import "./App.css";

import { Route, Switch } from "react-router-dom";
import ProjectList from "./components/projects/ProjectList";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/projects" component={ProjectList} />
      </Switch>
    </div>
  );
}

export default App;
