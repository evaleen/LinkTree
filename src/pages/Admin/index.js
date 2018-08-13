import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getLinks } from "../../store/links/selectors";
import {
  fetch,
  create,
  update,
  remove,
  reposition
} from "../../store/links/actions";
import NavBar from "../../components/NavBar";
import LinkBar from "../../components/LinkBar";
import LinksManager from "../../components/LinksManager";
import LivePreview from "../../components/LivePreview";
import "./index.scss";

class Admin extends Component {
  componentDidMount() {
    this.props.fetchLinks();
  }

  render() {
    const {
      links,
      createLink,
      updateLink,
      removeLink,
      repositionLink
    } = this.props;
    return (
      <div className="admin">
        <div className="links-manager-section">
          <NavBar />
          <LinksManager
            links={links}
            create={createLink}
            update={updateLink}
            remove={removeLink}
            reposition={repositionLink}
          />
        </div>
        <div className="live-preview-section">
          <LinkBar />
          <LivePreview />
        </div>
      </div>
    );
  }
}

Admin.propTypes = {
  links: PropTypes.array.isRequired,
  fetchLinks: PropTypes.func.isRequired,
  createLink: PropTypes.func.isRequired,
  updateLink: PropTypes.func.isRequired,
  removeLink: PropTypes.func.isRequired,
  repositionLink: PropTypes.func.isRequired
};

const mapStateToProps= state => {
  return {
    links: getLinks(state)
  };
}

const mergeProps = (stateProps, { dispatch }, ownProps) => {
  return {
    ...stateProps, ...ownProps,
    fetchLinks: () => dispatch(fetch()),
    createLink: () => dispatch(create(stateProps.links)),
    updateLink: (id, updates) => dispatch(update(stateProps.links, id, updates)),
    removeLink: id => dispatch(remove(stateProps.links, id)),
    repositionLink: (prevIndex, newIndex) =>
      dispatch(reposition(stateProps.links, prevIndex, newIndex))
  }
};


export default connect(
  mapStateToProps,
  null,
  mergeProps
)(Admin);
