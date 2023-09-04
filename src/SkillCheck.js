/**
 * UI for completing a skill check
 * @author mtownsend
 * @since 2023-09-04
 */

import React, {useState} from 'react';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { SKILL_LIST } from './consts';

const SkillCheck = () => {
  const [skill, setSkill] = useState();
  return (
    <Stack>
      <Select>
        {SKILL_LIST.map(({ name }) => (
          <MenuItem key={name} value={name}>{name}</MenuItem>
        ))}
      </Select>
    </Stack>
  );
};

export default SkillCheck;