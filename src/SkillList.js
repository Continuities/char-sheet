/**
 * View for character skills
 * @author mtownsend
 * @since 2023-09-04
 */

import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { SKILL_LIST } from './consts';
import { useParty, modifier } from './model';

const SkillList = ({ character }) => {
  const [, dispatch] = useParty();
  const onIncrement = (skill) => {
    dispatch({
      type: 'increase-skill',
      character: character.id,
      skill
    });
  };
  const onDecrement = (skill) => {
    dispatch({
      type: 'decrease-skill',
      character: character.id,
      skill
    });
  };
  return (
    <Stack spacing={1}>
      {SKILL_LIST.map((skill) => (
        <Stack key={skill.name} direction='row' spacing={1}>
          <Typography>
            {skill.name} ({skill.attributeModifier})
          </Typography>
          <Typography>
            points: {character.skills[skill.name] ?? 0}
          </Typography>
          <Typography>
            total: {modifier(character.attributes[skill.attributeModifier]) + (character.skills[skill.name] ?? 0)}
          </Typography>
          <ButtonGroup variant='contained' size='small'>
            <Button onClick={() => onIncrement(skill.name)}>+</Button>
            <Button onClick={() => onDecrement(skill.name)}>-</Button>
          </ButtonGroup>
        </Stack>
      ))}
    </Stack>
  );
};

export default SkillList;