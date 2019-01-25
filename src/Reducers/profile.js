import Immutable from 'immutable';

const initialState = Immutable.fromJS({
});

export default function(state = initialState, action) {
  const { type, data } = action;

  switch (type) {
    case 'SET_CURRENT_PROFILE': {
      return state.merge({ ...data })
    }
    case 'LOGOUT': {
      return initialState;
    }
    default: {
      return state;
    }
  }
}

