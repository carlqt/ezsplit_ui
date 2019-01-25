import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  alert: {
    visible: false,
    state: 'success',
    body: '',
  }
});

export default function(state = initialState, action) {
  const { type, body } = action;

  switch (type) {
    case 'OPEN_ALERT': {
      return state.mergeDeep({
        alert: {
          visible: true,
          body,
        },
      })
    }
    case 'CLOSE_ALERT': {
      return state.setIn(['alert', 'visible'], false);
    }
    case 'LOGOUT': {
      return initialState;
    }
    default: {
      return state;
    }
  }
}

