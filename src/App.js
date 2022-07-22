import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Auth from "./Components/Auth";
export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Auth />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


