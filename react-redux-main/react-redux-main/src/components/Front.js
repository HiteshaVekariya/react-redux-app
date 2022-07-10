import React from "react";
import FirstPage from "../components/firstpage/firstPage";
import Basket from "../components/basketview/Basket";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./front.css";
const Front = () => {
  return (
    <div className="page">
      <Router>
        <Switch>
          <Route exact path="/" component={FirstPage} />
          <Route path="/basket" component={Basket} />
        </Switch>
      </Router>
    </div>
  );
};

export default Front;
