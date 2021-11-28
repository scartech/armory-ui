import { useState, useEffect } from 'react';
import zxcvbn from 'zxcvbn';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  title: {
    paddingRight: theme.spacing(2),
    fontWeight: 'bold',
  },
}));

function PasswordStrength({ password }) {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (password) {
      const result = zxcvbn(password);

      switch (result?.score) {
        case 0:
        case 1:
          setTitle('Poor');
          break;
        case 2:
          setTitle('Weak');
          break;
        case 3:
          setTitle('OK');
          break;
        case 4:
          setTitle('Strong');
          break;
        default:
          setTitle('');
          break;
      }

      if (result?.feedback?.suggestions?.length > 0) {
        setMessage(result.feedback.suggestions.join(' '));
      } else {
        setMessage('');
      }
    } else {
      setTitle('');
      setMessage('');
    }
  }, [password]);

  return (
    <>
      <Typography variant="caption" display="inline" className={classes.title}>
        {title}
      </Typography>
      <Typography variant="caption">{message}</Typography>
    </>
  );
}

PasswordStrength.propTypes = {
  password: PropTypes.string.isRequired,
};

export default PasswordStrength;
