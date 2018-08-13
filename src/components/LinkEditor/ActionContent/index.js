import React, { Component } from "react";
import PropTypes from "prop-types";
import "./index.scss";

const UpgradeButton = () => {
  return <button className="btn-primary btn-med">{"Find out more"}</button>;
};

const ActionButton = ({ name, onClick, primary }) => {
  return (
    <button
      className={`action-content-action-button ${primary &&
        "action-content-action-button-primary"}`}
      onClick={onClick}
      data-test="ActionButton"
    >
      {name}
    </button>
  );
};

export default class ActionContent extends Component {
  onClose = () => {
    this.props.onClose();
  };

  onClick = () => {
    const { id, action, onClose } = this.props;
    action(id);
    onClose();
  };

  render() {
    const { content, action } = this.props;
    return (
      <div className="action-content">
        <div className="action-content-header" data-test="ActionContent-header">
          <h5>{content.title}</h5>
          <button
            className="action-content-close-button"
            onClick={this.onClose}
            data-test="ActionContent-close-button"
          >
            {"X"}
          </button>
        </div>
        <div className="action-content-body" data-test="ActionContent-body">
          <p>{content.description}</p>
          {action ? (
            <div className="action-content-buttons" data-test="ActionContent-ActionButtons">
              <ActionButton name="Cancel" onClick={this.onClose} />
              <ActionButton
                primary
                name={content.title}
                onClick={this.onClick}
              />
            </div>
          ) : (
            <UpgradeButton data-test="ActionContent-UpgradeButton" />
          )}
        </div>
      </div>
    );
  }
}

ActionContent.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  action: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  id: PropTypes.number.isRequired
};
