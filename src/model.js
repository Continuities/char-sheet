/**
 * Character sheet model logic
 * @author mtownsend
 * @since 2023-09-04
 */

import { useReducer, useContext, createContext } from 'react';
import { v4 as uuid } from 'uuid';
import { ATTRIBUTE_LIST } from './consts';

const PartyContext = createContext([ {}, () => {} ]);

const partyReducer = (state, action) => {
  switch (action.type) {
    case 'increase-stat':
      return {
        ...state,
        [action.character]: {
          ...state[action.character],
          attributes: {
            ...state[action.character].attributes,
            [action.attribute]: state[action.character].attributes[action.attribute] + 1
          }
        }
      };
    case 'decrease-stat':
      return {
        ...state,
        [action.character]: {
          ...state[action.character],
          attributes: {
            ...state[action.character].attributes,
            [action.attribute]: state[action.character].attributes[action.attribute] - 1
          }
        }
      };
  }
  return state;
};

export const PartyProvider = ({ children }) => {
  const [ party, dispatch ] = useReducer(partyReducer, Party());

  return (
    <PartyContext.Provider value={[ party, dispatch ]}>
      {children}
    </PartyContext.Provider>
  );
};

export const useParty = () => useContext(PartyContext);

const Party = () => {
  const character = Character();
  return {
    [character.id]: character
  };
}

const Character = () => ({
  id: uuid(),
  attributes: Object.fromEntries(ATTRIBUTE_LIST.map(attr => [ attr, 10 ])),
  skills: {}
});