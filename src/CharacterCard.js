/**
 * UI for a single character sheet
 * @author mtownsend
 * @since 2023-09-04
 */

import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { ATTRIBUTE_LIST } from './consts';
import { useParty, modifier } from './model';
import ClassList from './ClassList';

const CharacterCard = ({ character }) => {
  const [, dispatch] = useParty();
  const increment = (attr) => dispatch({
    type: 'increase-stat',
    character: character.id,
    attribute: attr
  });
  const decrement = (attr) => dispatch({
    type: 'decrease-stat',
    character: character.id,
    attribute: attr
  });
  return (
    <Card>
      <CardContent>
        <Stack direction='row'>
          <Stack spacing={1}>
            { ATTRIBUTE_LIST.map(attr => (
              <AttributeRow 
                key={attr} 
                attribute={attr}
                onIncrement={increment}
                onDecrement={decrement}
                value={character.attributes[attr]} 
              />
            ))}
          </Stack>
          <ClassList character={character} />
        </Stack>
      </CardContent>
    </Card>
  );
};

const AttributeRow = ({ attribute, value, onIncrement, onDecrement }) => (
  <Stack direction='row' alignItems='center' spacing={2}>
    <Typography>
      {attribute}
    </Typography>
    <Typography>
      {value}
    </Typography>
    <Typography>
      ({modifier(value)})
    </Typography>
    <ButtonGroup variant='contained' size='small'>
      <Button onClick={() => onIncrement(attribute)}>+</Button>
      <Button onClick={() => onDecrement(attribute)}>-</Button>
    </ButtonGroup>
  </Stack>
);

export default CharacterCard;