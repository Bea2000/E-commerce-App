import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

interface AlertBoxProps {
  message: string;
  severity: 'error' | 'success' | 'info' | 'warning';
  open: boolean;
  onClose: () => void;
}

export default function AlertBox({ message, severity, open, onClose } : AlertBoxProps) {

  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert
          severity={severity}
          sx={{ borderRadius: 0 }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={onClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          { message }
        </Alert>
      </Collapse>
    </Box>
  );
}
