import React, { Component } from "react";
import PropTypes from "prop-types";
import "./index.scss";

export default class LinkInput extends Component {
  constructor() {
    super();
    this.state = {
      isEditing: false,
      hasError: false
    };
  }

  toggleEditMode = () => {
    this.setState(prevState => ({
      isEditing: !prevState.isEditing
    }));
  };

  onChange = ({ target: { value } }) => {
    const { type, id, update, regex } = this.props;
    const hasError = value && regex && !value.match(regex);
    this.setState({ hasError });
    update(id, {
      [type]: value,
      ...(regex && { unsafe: hasError ? 1 : 0 })
    });
  };

  render() {
    const { value, placeholder } = this.props;
    const { isEditing, hasError } = this.state;
    return (
      <div
        className={`link-input ${!value && "link-input-empty"} ${hasError &&
          "link-input-error"}`}
        data-test="LinkInput"
      >
        {isEditing ? (
          <input
            className="link-data-edit link-data-edit-input"
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={this.onChange}
            onBlur={this.toggleEditMode}
            data-test="LinkInput-input"
          />
        ) : (
          <div className="link-data-edit link-data-edit-text" data-test="LinkInput-text">
            {value ? value : placeholder}
          </div>
        )}
        {!isEditing && (
          <img
            src="/images/edit.png"
            alt={`Edit ${value}`}
            className="edit-image"
            onClick={this.toggleEditMode}
            data-test="LinkInput-edit-button"
          />
        )}
      </div>
    );
  }
}

LinkInput.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  update: PropTypes.func.isRequired,
  regex: PropTypes.instanceOf(RegExp)
};
