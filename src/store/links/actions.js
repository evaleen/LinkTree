import actions from "./actionTypes";
import { getLinks } from "./api.js";

function fetchingLinks() {
  return {
    type: actions.FETCHING_LINKS
  };
}

function fetchLinksSuccess() {
  return {
    type: actions.FETCH_LINKS_SUCCESS
  };
}

function storeLinks(links) {
  return {
    type: actions.LINKS,
    links
  };
}

function fetchLinksFail(error) {
  return {
    type: actions.FETCH_LINKS_FAILURE,
    error
  };
}

const addLink = link => {
  return {
    type: actions.ADD_LINK,
    link
  };
};

const updateLink = (link, index) => {
  return {
    type: actions.UPDATE_LINK,
    link,
    index
  };
};

const removeLink = index => {
  return {
    type: actions.REMOVE_LINK,
    index
  };
};

const repositionLinks = links => {
  return {
    type: actions.REPOSITION_LINKS,
    links
  };
};

export const fetch = () => {
  return dispatch => {
    dispatch(fetchingLinks());
    getLinks()
      .then(links => {
        dispatch(fetchLinksSuccess());
        dispatch(storeLinks(links));
      })
      .catch(({ status }) => {
        dispatch(fetchLinksFail(status));
      });
  };
};

export function create(links) {
  let id = links.length === 0 ? 0 :
    links.reduce(({ id }, highest) => {
      return highest < id ? id : highest;
    }).id + 1;
  const position = links.length === 0 ? 0 : links[links.length - 1].position + 1;
  const newLink = {
    id,
    deleted: 0,
    active: 1,
    highlight: "wobble",
    unsafe: 1,
    url: "",
    title: "",
    position,
    account: {},
    schedule_start: "",
    schedule_start_timezone: "",
    schedule_end: "",
    schedule_end_timezone: "",
    clicks: [],
    click_count: 0,
    created_at: new Date().toString()
  };
  return dispatch => {
    dispatch(addLink(newLink));
  };
}

export function update(links, id, updates) {
  const index = links.findIndex(link => {
    return link.id === id;
  });
  return dispatch => {
    if (index >= 0) {
      dispatch(updateLink({ ...links[index], ...updates }, index));
    }
  };
}

export function remove(links, id) {
  const index = links.findIndex(link => {
    return link.id === id;
  });
  return dispatch => {
    if (index >= 0) {
      dispatch(removeLink(index));
    }
  };
}

export function reposition(links, prevIndex, newIndex) {
  const clonedLinks = Array.from(links);
  const [removed] = clonedLinks.splice(prevIndex, 1);
  clonedLinks.splice(newIndex, 0, removed);
  return dispatch => {
    dispatch(
      repositionLinks(
        clonedLinks.map((link, index) => {
          return { ...link, position: index };
        })
      )
    );
  };
}
