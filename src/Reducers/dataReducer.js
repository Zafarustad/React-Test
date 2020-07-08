import { SET_USERS, SHOW_APPS, CLOSE_APPS } from '../Actions/dataAction';

const initialState = {
  users: null,
  userApps: null,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS: {
      return {
        ...state,
        users: action.payload,
      };
    }

    case SHOW_APPS: {
      return {
        ...state,
        userApps: action.payload,
      };
    }

    case CLOSE_APPS: {
      return {
        ...state,
        userApps: null,
      };
    }

    default:
      return state;
  }
};

export default dataReducer;
