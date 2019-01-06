import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  members: [],
  state: 'INIT',
});

export default function(state = initialState, action) {
  const { type, data } = action;

  switch (type) {
    case 'GET_HOME_MEMBERS': {
      return state.merge({ members: data }); 
    }
    default: {
      return state;
    }
  }
}

