/**
 * View for available character classes
 * @author mtownsend
 * @since 2023-09-04
 */

import React, { useState } from 'react';
import { CLASS_LIST } from './consts';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import { meetsRequirements } from './model';

const ClassList = ({ character }) => {
  return (
    <Stack spacing={1}>
      {Object.entries(CLASS_LIST).map(([ className, requirements ]) => (
        <ClassRow 
          key={className}
          className={className} 
          available={meetsRequirements(character, requirements)} />
      ))}
    </Stack>
  );
};

const ClassRow = ({ className, available }) => {
  const [ el, setEl ] = useState(null);
  return (
    <>
      <Typography 
        key={className}
        color={ available ? 'success.main' : 'error.main'}
        onClick={(e) => {
          setEl(e.currentTarget)
        }}
      >
        {className}
      </Typography>
      <Popover
        id={el ? 'simple-popover' : undefined}
        open={Boolean(el)}
        anchorEl={el}
        onClose={() => setEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <Stack>
          {Object.entries(CLASS_LIST[className]).map(([attr, req]) => (
            <Typography key={attr}>
              {attr}: {req}
            </Typography>
          ))}
        </Stack>
      </Popover>
    </>
  );
};

export default ClassList;