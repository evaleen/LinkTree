import React, { Component } from "react";
import "./index.scss";

const url = "https://linktr.ee/spicybeanbrgr";

export default class LinkBar extends Component {
  render() {
    return (
      <div className="link-bar header">
        <span className="link-label">{"My Bio Link:"}</span>
        <div className="user-link">
          <a className="link" href={url} target="_blank">
            {url}
          </a>
          <button className="copy-button btn-primary">
          <img className="copy-button-img" src="/images/copy.png" alt="Copy to clipboard" />
        </button>
        </div>
      </div>
    );
  }
}
