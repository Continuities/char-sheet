/**
 * View for available character classes
 * @author mtownsend
 * @since 2023-09-04
 */

import React from 'react';
import { CLASS_LIST } from './consts';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { meetsRequirements } from './model';

const ClassList = ({ character }) => {
  return (
    <Stack spacing={1}>
      {Object.entries(CLASS_LIST).map(([ className, requirements ]) => (
        <Typography 
          key={className}
          color={ meetsRequirements(character, requirements) ? 'success.main' : 'error.main'}
        >
          {className}
        </Typography>
      ))}
    </Stack>
  );
};

export default ClassList;