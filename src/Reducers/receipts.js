import Immutable from 'immutable';

const initialState = Immutable.fromJS([]);

export default function(state = initialState, action) {
  const { type, data } = action;

  switch (type) {
    case 'GET_RECEIPTS': {
      return Immutable.fromJS(data.receipts);
    }
    default: {
      return state;
    }
  }
}

