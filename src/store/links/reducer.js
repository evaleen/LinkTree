import actions from "./actionTypes";
import requestsStatuses from "../requestStatuses";

const INITIAL_STATE = {
  status: requestsStatuses.NOT_REQUESTED,
  links: []
};

export default function links(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.LINKS:
      return {
        ...state,
        links: action.links,
        status: requestsStatuses.NOT_REQUESTED
      };
    case actions.FETCH_LINKS:
    case actions.CREATE_LINK:
    case actions.UPDATE_LINK:
    case actions.REMOVE_LINK:
    case actions.REPOSITION_LINK:
      return { ...state, status: requestsStatuses.REQUESTED };
    case actions.FETCH_LINKS_SUCCESS:
    case actions.CREATE_LINK_SUCCESS:
    case actions.UPDATE_LINK_SUCCESS:
    case actions.REMOVE_LINK_SUCCESS:
    case actions.REPOSITION_LINK_SUCCESS:
      return { ...state, status: requestsStatuses.RETRIEVED };
    case actions.LINKS_REQUEST_FAILURE:
      return {
        ...state,
        status: requestsStatuses.REQUEST_ERROR,
        error: action.error
      };
    default:
      return state;
  }
}
