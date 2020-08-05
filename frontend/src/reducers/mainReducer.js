import { combineReducers } from 'redux';
import convo_reducer from './convoReducer';
import room_reducer from './roomReducer';
import communication_reducer from './communicationReducer';
import user_reducer from './userReducer';

export default combineReducers({
  convo_reducer,
  room_reducer,
  communication_reducer,
  user_reducer
})