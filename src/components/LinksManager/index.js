import React, { Component } from "react";
import PropTypes from "prop-types";
import LinksDnD from "../LinksDnD";
import "./index.scss";

const AddNewLinkButton = ({ onClick }) => {
  return (
    <button className="btn-primary btn-large add-new-button" onClick={onClick} data-test="AddNewLinkButton">
      {"+ Add New Button / Link"}
    </button>
  );
};

export default class LinksManager extends Component {
  render() {
    const { links, create, reposition, update, remove } = this.props;
    return (
      <section className="links-manager">
        <div className="links-manager-content">
          <AddNewLinkButton onClick={create} />
          <h3 className="link-title">{"My Links"}</h3>
          <LinksDnD
            links={links}
            reposition={reposition}
            update={update}
            remove={remove}
          />
        </div>
      </section>
    );
  }
}

LinksManager.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),
  create: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  reposition: PropTypes.func.isRequired
};
