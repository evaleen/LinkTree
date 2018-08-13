import actions from "./actionTypes";
import requestsStatuses from "../requestStatuses";

const INITIAL_STATE = {
  status: requestsStatuses.NOT_REQUESTED,
  links: []
};

export default function links(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.FETCHING_LINKS:
      return { ...state, status: requestsStatuses.REQUESTED };
    case actions.FETCH_LINKS_SUCCESS:
      return { ...state, status: requestsStatuses.RETRIEVED };
    case actions.LINKS:
      return {
        ...state,
        links: action.links,
        status: requestsStatuses.NOT_REQUESTED
      };
    case actions.FETCH_LINKS_ERROR:
      return {
        ...state,
        status: requestsStatuses.REQUEST_ERROR,
        error: action.error
      };
    case actions.ADD_LINK:
      return {
        ...state,
        links: [...state.links, action.link]
      };
    case actions.UPDATE_LINK:
      return {
        ...state,
        links: [
          ...state.links.slice(0, action.index),
          action.link,
          ...state.links.slice(action.index + 1)
        ]
      };
    case actions.REMOVE_LINK:
      return {
        ...state,
        links: [
          ...state.links.slice(0, action.index),
          ...state.links.slice(action.index + 1)
        ]
      };
      case actions.REPOSITION_LINKS:      
      return {
        ...state,
        links: action.links
      };
    default:
      return state;
  }
}
