import React, { Component } from "react";
import "./index.scss";

export default class SideBar extends Component {
  render() {
    return (
      <section className="sidebar">
        <img className="logo" src="/images/logo.png" alt="logo" />
        <div className="image-links">
          <img
            className="image-link"
            src="/images/support.png"
            alt="Contact Support"
          />
          <img className="image-link" src="/images/updates.png" alt="Updates" />
          <img className="image-link" src="/images/user.png" alt="Use" />
        </div>
      </section>
    );
  }
}
