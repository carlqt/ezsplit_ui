import Immutable from 'immutable';

const initialState = Immutable.fromJS({
});

export default function(state = initialState, action) {
  const { type, data } = action;

  switch (type) {
    case 'GET_HOME_MEMBERS': {
      return state.merge({ members: data }); 
    }
    case 'GET_CURRENT_HOME': {
      return Immutable.fromJS(data);
    }
    default: {
      return state;
    }
  }
}

