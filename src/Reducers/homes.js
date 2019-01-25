import Immutable from 'immutable';
import membersReducer from 'Reducers/members';

const initialState = Immutable.fromJS({
  members: [],
});

export default function(state = initialState, action) {
  const { type, data } = action;

  switch (type) {
    case 'GET_HOME_MEMBERS': {
      return state.merge({ members: data }); 
    }
    case 'GET_CURRENT_HOME': {
      // return Immutable.fromJS(data);
      const { currentProfile, ...rest } = data;

      return Immutable.fromJS({
        ...rest,
        members: membersReducer(Immutable.Map(), {type: 'SET_MEMBERS', data: data.members}),
      })
    }
    case 'LOGOUT': {
      return initialState;
    }
    default: {
      return state;
    }
  }
}

