import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  alert: {
    visible: false,
    variant: 'success',
    body: '',
  }
});

export default function(state = initialState, action) {
  const { type, body, variant } = action;

  switch (type) {
    case 'OPEN_ALERT': {
      return state.mergeDeep({
        alert: {
          visible: true,
          body,
          variant,
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

