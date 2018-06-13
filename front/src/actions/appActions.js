import * as types from './appActionTypes.js';
import axios from 'axios';

export function setActiveItem(activeItem) {
  return {
    activeItem: activeItem,
    type: types.ACTIVE_MENU_ITEM
  }
}