import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  alert: {
    visible: false,
    state: 'success',
    body: '',
  }
});

export default function(state = initialState, action) {
  const { type, body, visible } = action;

  switch (type) {
    case 'OPEN_ALERT': {
      return state.mergeDeep({
        alert: {
          body,
          visible,
        },
      })
    }
    case 'CLOSE_ALERT': {
      return state.setIn(['alert', 'visible'], false);
    }
    default: {
      return state;
    }
  }
}

