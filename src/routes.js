import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./containers/Home/Home";
import Advertising from "./containers/Advertising/Advertising";
import Wishlist from "./containers/Wishlist/Wishlist";

const routes = () => {
  return (
    <>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/ad/:slug" component={Advertising} />
        <Route path="/wishlist" component={Wishlist} />
      </Switch>
    </>
  );
};

export default routes;
