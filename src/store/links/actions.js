import actions from "./actionTypes";
import {
  getLinks,
  addLink,
  updateLink,
  removeLink,
  repositionLink
} from "./api.js";

const fetchingLinks = () => {
  return {
    type: actions.FETCH_LINKS
  };
};

const fetchLinksSuccess = () => {
  return {
    type: actions.FETCH_LINKS_SUCCESS
  };
};

const creatingLink = () => {
  return {
    type: actions.CREATE_LINK
  };
};

const createLinkSuccess = () => {
  return {
    type: actions.CREATE_LINK_SUCCESS
  };
};

const updatingLink = () => {
  return {
    type: actions.UPDATE_LINK
  };
};

const updateLinkSuccess = () => {
  return {
    type: actions.UPDATE_LINK_SUCCESS
  };
};

const removingLink = () => {
  return {
    type: actions.REMOVE_LINK
  };
};

const removeLinkSuccess = index => {
  return {
    type: actions.REMOVE_LINK_SUCCESS,
    index
  };
};

const repositioningLink = () => {
  return {
    type: actions.REPOSITION_LINK
  };
};

const repositionLinkSuccess = () => {
  return {
    type: actions.REPOSITION_LINK_SUCCESS
  };
};

const storeLinks = links => {
  return {
    type: actions.LINKS,
    links
  };
};

const linksRequestFail = error => {
  return {
    type: actions.LINKS_REQUEST_FAILURE,
    error
  };
}

export const fetch = () => {
  return dispatch => {
    dispatch(fetchingLinks());
    getLinks()
      .then(links => {
        dispatch(fetchLinksSuccess());
        dispatch(storeLinks(links));
      })
      .catch(({ status }) => {
        dispatch(linksRequestFail(status));
      });
  };
};

export const create = links => {
  return dispatch => {
    dispatch(creatingLink());
    addLink(links)
      .then(links => {
        dispatch(createLinkSuccess());
        dispatch(storeLinks(links));
      })
      .catch(({ status }) => {
        dispatch(linksRequestFail(status));
      });
  };
};

export const update = (links, id, updates) => {
  return dispatch => {
    dispatch(updatingLink());
    updateLink(links, id, updates)
      .then(links => {
        dispatch(updateLinkSuccess());
        dispatch(storeLinks(links));
      })
      .catch(({ status }) => {
        dispatch(linksRequestFail(status));
      });
  };
};

export const remove = (links, id) => {
  return dispatch => {
    dispatch(removingLink());
    removeLink(links, id)
      .then(links => {
        dispatch(removeLinkSuccess());
        dispatch(storeLinks(links));
      })
      .catch(({ status }) => {
        dispatch(linksRequestFail(status));
      });
  };
};

export const reposition = (links, prevIndex, newIndex) => {
  return dispatch => {
    dispatch(repositioningLink());
    repositionLink(links, prevIndex, newIndex)
      .then(links => {
        dispatch(repositionLinkSuccess());
        dispatch(storeLinks(links));
      })
      .catch(({ status }) => {
        dispatch(linksRequestFail(status));
      });
  };
};
