import React from 'react';
import { Alert as MuiAlert } from '@mui/material';
import { isEmpty } from 'lodash';

const Alert = ({ alert, type }) => {
  if (isEmpty(alert)) {
    return null
  }
  
  const { severity, message } = alert

  if (type === 'plain') {
    return (<div style={{color:'red', marginTop:10}}>{message}</div>)
  }

  return <MuiAlert role='alert' severity={severity}>{message}</MuiAlert>
};

export default Alert;