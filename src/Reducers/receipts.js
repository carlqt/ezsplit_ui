import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  byID: {},
  state: 'INIT',
});

export default function(state = initialState, action) {
  const { type, data } = action;

  switch (type) {
    case 'GET_RECEIPTS': {
      return state;
    }
    default: {
      return state;
    }
  }
}

