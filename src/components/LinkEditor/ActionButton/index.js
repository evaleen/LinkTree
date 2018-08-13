import React, { Component } from "react";
import PropTypes from "prop-types";
import "./index.scss";

export default class ActionButton extends Component {
  onClick = () => {
    const { onClick, type } = this.props;
    onClick(type);
  };
  render() {
    const { type, isActive } = this.props;
    return (
      <button
        onClick={this.onClick}
        className={`action-button ${isActive && "action-button-active"}`}
        data-test="ActionButton"
      >
        <img
          className="action-button-image"
          src={`/images/actions/${type}.png`}
          alt={type}
        />
      </button>
    );
  }
}

ActionButton.propTypes = {
  type: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};
