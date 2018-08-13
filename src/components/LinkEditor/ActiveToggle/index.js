import React, { Component } from "react";
import PropTypes from "prop-types";
import "./index.scss";

export default class ActiveToggle extends Component {
  update = () => {
    const { id, isActive, update } = this.props;
    update(id, { active: isActive ? 0 : 1 });
  };

  render() {
    const { isActive, isSafe } = this.props;
    return (
      <div className="active-toggle">
        {isActive &&
          !isSafe && (
            <img
              className="unsafe-warning"
              src="/images/unsafe-icon.png"
              alt="unsafe"
              data-test="ActiveToggle-unsafe-warning"
            />
          )}
        <div
          className={`toggle-bg toggle-bg-${
            !isActive ? "inactive" : isSafe ? "active" : "unsafe"
          }`}
          data-test="ActiveToggle-toggle-bg"
          onClick={this.update}
        >
          <div
            className={`toggle ${isActive ? "on" : "off"}`}
            data-test="ActiveToggle-toggle"
          />
        </div>
      </div>
    );
  }
}

ActiveToggle.propTypes = {
  id: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  isSafe: PropTypes.bool.isRequired,
  update: PropTypes.func.isRequired
};
