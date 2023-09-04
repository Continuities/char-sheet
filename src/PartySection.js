/**
 * UI for a party of character sheets
 * @author mtownsend
 * @since 2023-09-04
 */

import React from 'react';
import { useParty } from './model';
import CharacterCard from './CharacterCard';

const Party = () => {
  const [ party ] = useParty();
  return (
    <main>
      { Object.values(party).map(character => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </main>
  );
};

export default Party;