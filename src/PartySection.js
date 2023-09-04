/**
 * UI for a party of character sheets
 * @author mtownsend
 * @since 2023-09-04
 */

import React from 'react';
import { useParty } from './model';
import CharacterCard from './CharacterCard';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const Party = () => {
  const [ party, dispatch ] = useParty();
  return (
    <Stack spacing={4}>
      { Object.values(party).map(character => (
        <CharacterCard key={character.id} character={character} />
      ))}
      <Button onClick={() => dispatch({ type: 'add-character'})}>
        Add Character
      </Button>
    </Stack>
  );
};

export default Party;