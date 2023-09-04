/**
 * Character sheet model logic
 * @author mtownsend
 * @since 2023-09-04
 */

import { useReducer, useContext, createContext, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { ATTRIBUTE_LIST, MAX_ATTRIBUTES } from './consts';

const PartyContext = createContext([ {}, () => {} ]);

const partyReducer = (state, action) => {
  switch (action.type) {
    case 'hydrate':
      return action.data;
    case 'increase-stat':
      if (attributeTotal(state[action.character]) >= MAX_ATTRIBUTES) {
        return state;
      }
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
      if (state[action.character].attributes[action.attribute] <= 1) {
        return state;
      }
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
    case 'increase-skill':
      if (spentPoints(state[action.character]) >= skillpoints(state[action.character])) {
        return state;
      }
      return {
        ...state,
        [action.character]: {
          ...state[action.character],
          skills: {
            ...state[action.character].skills,
            [action.skill]: (state[action.character].skills[action.skill] ?? 0) + 1
          }
        }
      };
    case 'decrease-skill':
      if ((state[action.character].skills[action.skill] ?? 0) <= 0) {
        return state;
      }
      return {
        ...state,
        [action.character]: {
          ...state[action.character],
          skills: {
            ...state[action.character].skills,
            [action.skill]: (state[action.character].skills[action.skill] ?? 0) - 1
          }
        }
      };
  }
  return state;
};

export const PartyProvider = ({ children }) => {
  const [ party, dispatch ] = useReducer(partyReducer, {});

  const json = JSON.stringify(party);
  useEffect(() => {
    fetch('https://recruiting.verylongdomaintotestwith.ca/api/{continuities}/character')
      .then(r => r.json())
      .then(data => dispatch({
        type: 'hydrate',
        data: Object.values(data.body).length == 0 ? Party() : data.body
      }));
  }, []);
  useEffect(() => {
    if (json === '{}') {
      return;
    }
    fetch('https://recruiting.verylongdomaintotestwith.ca/api/{continuities}/character', {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      body: json
    });
  }, [json]);

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

export const meetsRequirements = (character, requirements) => {
  return !Boolean(
    Object
      .entries(requirements)
      .find(([ attr, req ]) => character.attributes[attr] < req)
  );
};

const spentPoints = (character) => Object.values(character.skills).reduce((p, c) => p + c, 0);
const attributeTotal = (character) => Object.values(character.attributes).reduce((p, c) => p + c, 0);

export const modifier = (value) => {
  return Math.floor((value - 10) / 2);
};

export const skillpoints = (character) => 10 + 4 * modifier(character.attributes['Intelligence']);