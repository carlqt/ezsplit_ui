import Immutable from 'immutable';
import membersReducer from 'Reducers/members';

const initialState = Immutable.fromJS({
});

export default function(state = initialState, action) {
  const { type, data } = action;

  switch (type) {
    case 'GET_HOME_MEMBERS': {
      return state.merge({ members: data }); 
    }
    case 'GET_CURRENT_HOME': {
      // return Immutable.fromJS(data);
      return Immutable.fromJS({
        ...data,
        members: membersReducer(Immutable.Map(), {type: 'SET_MEMBERS', data: data.members}),
      })
    }
    default: {
      return state;
    }
  }
}

