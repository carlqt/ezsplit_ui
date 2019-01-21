import Immutable from 'immutable';

const initialState = Immutable.fromJS({
});

export default function(state = initialState, action) {
  const { type, data } = action;

  switch (type) {
    case 'SET_MEMBERS': {
      const members = data.reduce(reduceMember, {});

      return state.merge({ ...members }); 
    }
    default: {
      return state;
    }
  }
}

function reduceMember(mem, val) {
  mem[val.profileId] = val;
  return mem;
}
