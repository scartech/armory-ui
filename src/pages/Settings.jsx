import { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { PasswordTab, ProfileTab, MfaTab, DisplayTab } from '../components';

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  container: {
    marginTop: theme.spacing(4),
  },
}));

function Settings() {
  const classes = useStyles();

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Typography className={classes.title} variant="h5">
        Settings
      </Typography>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
      >
        <Tab label="Profile" />
        <Tab label="Display" />
        <Tab label="Multi-Factor Auth" />
        <Tab label="Change Password" />
      </Tabs>
      <Box className={classes.container}>
        <Box hidden={tabValue !== 0}>
          <ProfileTab />
        </Box>
        <Box hidden={tabValue !== 1}>
          <DisplayTab />
        </Box>
        <Box hidden={tabValue !== 2}>
          <MfaTab />
        </Box>
        <Box hidden={tabValue !== 3}>
          <PasswordTab />
        </Box>
      </Box>
    </>
  );
}

export default Settings;
