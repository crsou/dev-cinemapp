import React from "react";
import { Route, Switch } from "react-router-dom";
import Search from "../pages/Search";
import Favorites from "../pages/Favorites";

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Search} />
    <Route path="/favorites" component={Favorites} />
  </Switch>
);

export default Routes;
