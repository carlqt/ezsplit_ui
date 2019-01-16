import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  groups: [],
});

export default function(state = initialState, action) {
  const { type, data } = action;

  switch (type) {
    case 'GET_ACCOUNT': {
      return Immutable.fromJS(data);
    }
    default: {
      return state;
    }
  }
}

