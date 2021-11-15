import { useState, useEffect } from 'react';
import {
  Button,
  Typography,
  Snackbar,
  IconButton,
  Alert,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Backdrop,
  Collapse,
  Chip,
  Link as MuiLink,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import CloseIcon from '@mui/icons-material/Close';
import QRCode from 'react-qr-code';
import OtpInput from 'react-otp-input';
import { useAuth } from '../hooks';
import { ProfileService } from '../services';

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  button: {
    marginBottom: theme.spacing(2),
  },
  fab: {
    position: 'relative',
    left: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(5),
  },
  mfaText: {
    margin: theme.spacing(2),
  },
  totpInput: {
    fontSize: '1.5em',
    borderRadius: '4px',
    height: '1.5rem',
    width: '1.5rem !important',
    border: '1px solid rbga(0, 0, 0, 0.3)',
  },
  totpInputContainer: {
    marginTop: '10px',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

function MfaTab() {
  const auth = useAuth();
  const classes = useStyles();

  const [validateFailure, setValidateFailure] = useState(false);
  const [codeToValidate, setCodeToValidate] = useState('');
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [refreshDialogOpen, setRefreshDialogOpen] = useState(false);
  const [validateDialogOpen, setValidateDialogOpen] = useState(false);
  const [refreshCompleteDialogOpen, setRefreshCompleteDialogOpen] =
    useState(false);
  const [totpEnabled, setTotpEnabled] = useState(false);
  const [totpValidated, setTotpValidated] = useState(false);
  const [totpUrl, setTotpUrl] = useState('');
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('error');
  const [message, setMessage] = useState('');

  const refreshToken = async () => {
    setShowBackdrop(true);

    const key = await ProfileService.refreshTotp(auth.user, auth.user?.id);
    setTotpValidated(false);
    setTotpUrl(key.totpUrl);
    setShowBackdrop(false);
    setRefreshCompleteDialogOpen(true);
  };

  useEffect(() => {
    async function fetchUser() {
      const user = await ProfileService.get(auth.user, auth.user?.id);
      if (user) {
        setTotpEnabled(user.totpEnabled === null ? false : user.totpEnabled);
        setTotpValidated(
          user.totpValidated === null ? false : user.totpValidated,
        );
        setTotpUrl(user.totpUrl);

        if (!user.totpKey) {
          const key = await ProfileService.refreshTotp(
            auth.user,
            auth.user?.id,
          );

          setTotpValidated(false);
          setTotpUrl(key.totpUrl);
        }
      }
    }

    fetchUser();
  }, [auth.user]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleMFAChecked = (event) => {
    setTotpEnabled(event.target.checked);
  };

  const handleValidateTotp = () => {
    setValidateFailure(false);
    setCodeToValidate('');
    setValidateDialogOpen(true);
  };

  const handleRefreshToken = () => {
    setRefreshDialogOpen(true);
  };

  const handleRefreshDialogClose = () => {
    setRefreshDialogOpen(false);
  };

  const handleRefreshDialogCloseRefresh = () => {
    setRefreshDialogOpen(false);
    refreshToken();
  };

  const handleRefreshDialogCompleteClose = () => {
    setRefreshCompleteDialogOpen(false);
  };

  const handleCodetoValidateChange = async (value) => {
    setCodeToValidate(value);

    if (value.length === 6) {
      const success = await ProfileService.validateTotp(auth.user, {
        code: value,
      });

      if (success) {
        setValidateDialogOpen(false);
        setTotpValidated(true);
        setSeverity('info');
        setMessage('Multi-Factor Authentication successfully validated.');
        setOpen(true);
      } else {
        setValidateFailure(true);
      }
    }
  };

  const handleValidateDialogClose = () => {
    setValidateDialogOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      totpEnabled,
    };

    setOpen(false);

    const success = await ProfileService.enableTotp(auth.user, data);
    if (success) {
      setSeverity('info');
      setMessage('Profile updated successfully.');
    } else {
      setSeverity('error');
      setMessage('Unable to update your profile.');
    }

    setOpen(true);
  };

  /* eslint-disable react/jsx-one-expression-per-line */
  return (
    <>
      <form noValidate autoComplete="off">
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={totpEnabled} onChange={handleMFAChecked} />
            }
            label="Enable Multi-Factor Authentication"
          />
        </FormGroup>
        <Box>
          {totpValidated && <Chip label="MFA Validated" color="primary" />}
          {!totpValidated && (
            <Chip
              label="MFA Validation Required"
              color="primary"
              variant="outlined"
            />
          )}
        </Box>
        <Typography variant="body2" className={classes.mfaText}>
          Use your phone as your second sign in step. Scan the following into an
          authenticator app such as{' '}
          <MuiLink href="https://authy.com/download/" target="_blank">
            Authy
          </MuiLink>{' '}
          or{' '}
          <MuiLink
            href="https://www.microsoft.com/en-us/security/mobile-authenticator-app"
            target="_blank"
          >
            Microsoft Authenticator
          </MuiLink>
          .
        </Typography>
        <Box>
          <Button onClick={handleRefreshToken}>Refresh Token</Button>
          {!totpValidated && (
            <Button onClick={handleValidateTotp}>Validate</Button>
          )}
        </Box>
        <QRCode value={totpUrl} size={150} className={classes.mfaText} />
        <Button
          variant="contained"
          onClick={(event) => handleSubmit(event)}
          fullWidth
          color="primary"
          className={classes.button}
        >
          Submit
        </Button>
      </form>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={5000}
        onClose={() => setOpen(false)}
        action={
          <>
            <IconButton size="small" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      <Dialog open={refreshDialogOpen} onClose={handleRefreshDialogClose}>
        <DialogTitle>Refresh TOTP Token?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to refresh your token? If so, you will need to
            reconfigure your authenticator app and re-validate.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRefreshDialogCloseRefresh} color="primary">
            Yes
          </Button>
          <Button onClick={handleRefreshDialogClose} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={refreshCompleteDialogOpen}
        onClose={handleRefreshDialogCompleteClose}
      >
        <DialogTitle>Token Refresh Complete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Be sure to validate your new TOTP token after you have setup your
            authenticator application. You will not be able to use multi-factor
            authentication until validation is complete.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRefreshDialogCompleteClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={validateDialogOpen} onClose={handleValidateDialogClose}>
        <DialogTitle>Enter verification code</DialogTitle>
        <DialogContent>
          <Box>
            <OtpInput
              containerStyle={classes.totpInputContainer}
              inputStyle={classes.totpInput}
              value={codeToValidate}
              onChange={handleCodetoValidateChange}
              numInputs={6}
              isInputNum
              shouldAutoFocus
            />
          </Box>
          <Collapse in={validateFailure}>
            <Alert severity="error">Validation failed.</Alert>
          </Collapse>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleValidateDialogClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop open={showBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
  /* eslint-enable react/jsx-one-expression-per-line */
}

export default MfaTab;
