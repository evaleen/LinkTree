import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configure";
import Admin from "./pages/Admin";
import SideBar from "./components/SideBar";
import "../src/styles/index.scss";

const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="app">
            <Route path="/" component={SideBar} />
            <Route exact path="/" component={Admin} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
