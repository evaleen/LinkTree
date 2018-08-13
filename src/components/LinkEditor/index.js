import React, { Component } from "react";
import PropTypes from "prop-types";
import LinkInput from "./LinkInput";
import ActiveToggle from "./ActiveToggle";
import ActionButton from "./ActionButton";
import ActionContent from "./ActionContent";
import "./index.scss";

const URL_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/gm;

export const actionTypes = {
  priority: {
    title: "Priority Link",
    description:
      "With LinkTree PRO you can highlight your most important links with priority links."
  },
  schedule: {
    title: "Schedule Link",
    description:
      "With LinkTree PRO you can schedule your links to appear and disappear at specific times."
  },
  clicks: {
    title: "Link Clicks",
    description:
      "This link has been clicked 0 times. See a daily click breakdown with Linktree PRO. "
  },
  delete: {
    title: "Delete",
    description:
      "Are you sure you want to delete this link? This action cannot be undone."
  }
};

export default class LinkEditor extends Component {
  constructor() {
    super();
    this.state = {
      content: undefined
    };
  }

  setContent = content => {
    this.setState({ content });
  };

  render() {
    const { link, update, remove } = this.props;
    const { content } = this.state;
    return (
      <section className="link-editor">
        <div className="drag-section">
          <img
            className="drag-section-image"
            src="/images/drag-handle.png"
            alt="Drag Handle"
          />
        </div>
        <div className="edit-section">
          <div className="link-inputs">
            <LinkInput
              value={link.title}
              placeholder="Title"
              type="title"
              id={link.id}
              update={update}
            />
            <LinkInput
              value={link.url}
              placeholder="http://url"
              type="url"
              regex={URL_REGEX}
              id={link.id}
              update={update}
            />
          </div>
          <div className="link-actions">
            <ActiveToggle
              id={link.id}
              isActive={link.active === 1}
              isSafe={link.unsafe === 0}
              update={update}
              data-test="LinkEditor-ActiveToggle"
            />
            <div className="action-buttons">
              {Object.keys(actionTypes).map((type, index) => {
                return (
                  <ActionButton
                    key={index}
                    type={type}
                    isActive={type === content}
                    onClick={this.setContent}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className={`action-content-wrapper ${content ? "show" : "hide"}`}>
          {Object.keys(actionTypes).map((type, index) => {
            return (
              <ActionContent
                key={index}
                id={link.id}
                content={actionTypes[type]}
                onClose={this.setContent}
                isActive={content === type}
                action={content === "delete" && remove}
                data-test="LinkEditor-ActionContent"
              />
            );
          })}
        </div>
      </section>
    );
  }
}

LinkEditor.propTypes = {
  link: PropTypes.shape({
    id: PropTypes.number.isRequired,
    deleted: PropTypes.number.isRequired,
    active: PropTypes.number.isRequired,
    highlight: PropTypes.string.isRequired,
    unsafe: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
    schedule_start: PropTypes.string.isRequired,
    schedule_start_timezone: PropTypes.string.isRequired,
    schedule_end: PropTypes.string.isRequired,
    schedule_end_timezone: PropTypes.string.isRequired,
    clicks: PropTypes.array.isRequired,
    click_count: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired
  }),
  update: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired
};
