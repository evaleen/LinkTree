import React, { Component } from "react";
import "./index.scss";

export default class LivePreview extends Component {
  render() {
    return (
      <section className="live-preview">
        <h4 className="preview-title">{'Live Preview'}</h4>
        <img className="preview-image" src="/images/preview.png" alt="Live Preview"/>
      </section>
    );
  }
}
