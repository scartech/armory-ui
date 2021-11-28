import { useState, useEffect } from 'react';
import zxcvbn from 'zxcvbn';
import PropTypes from 'prop-types';
import { Typography, Chip } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  title: {
    marginRight: theme.spacing(2),
  },
}));

function PasswordStrength({ password }) {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [chipColor, setChipColor] = useState('default');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (password) {
      const result = zxcvbn(password);

      switch (result?.score) {
        case 0:
        case 1:
          setTitle('Poor');
          setChipColor('error');
          break;
        case 2:
          setTitle('Weak');
          setChipColor('warning');
          break;
        case 3:
          setTitle('OK');
          setChipColor('info');
          break;
        case 4:
          setTitle('Strong');
          setChipColor('success');
          break;
        default:
          setTitle('');
          setChipColor('default');
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
      {password.length > 0 && (
        <>
          <Chip label={title} color={chipColor} className={classes.title} />
          <Typography variant="caption">{message}</Typography>
        </>
      )}
    </>
  );
}

PasswordStrength.propTypes = {
  password: PropTypes.string.isRequired,
};

export default PasswordStrength;
