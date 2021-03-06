import React from 'react';
// Material-UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// Material icons
import DayIcon from '@material-ui/icons/WbSunnyOutlined';
import NightIcon from '@material-ui/icons/Brightness3Outlined';

import 'typeface-roboto';

// Lattice
import { Widget } from '@latticejs/widgets';

// Custom Style
const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: theme.palette.primary[theme.palette.type],
    color: theme.palette.primary.contrastText,
  },
  widget: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(4),
  },
  link: {
    color: theme.palette.text.secondary,
  },
});

const App = (props) => {
  const { classes, nightMode } = props;

  const handleNightModeChange = () => {
    const { updateTheme, nightMode } = props;
    updateTheme(!nightMode);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.flex}>
            Basic Example
          </Typography>
          <Tooltip title="Toggle Night Mode" enterDelay={300}>
            <IconButton onClick={handleNightModeChange} color="inherit">
              {nightMode ? <DayIcon /> : <NightIcon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Grid container>
        <Grid item xs={12}>
          <Grid container justify="space-around" spacing={Number('0')}>
            <Grid item>
              <Widget className={classes.widget} title="Introduction" border="bottom">
                <Typography variant="subtitle1">Welcome to Lattice</Typography>
              </Widget>
            </Grid>
            <Grid item>
              <Widget className={classes.widget} title="Material" border="bottom">
                <Typography variant="subtitle1">Material UI integration</Typography>
              </Widget>
            </Grid>
            <Grid item>
              <Widget className={classes.widget} title="Recharts" border="bottom">
                <Typography variant="subtitle1">with Material style</Typography>
              </Widget>
            </Grid>
            <Grid item>
              <Widget className={classes.widget} title="D3" border="bottom">
                <Typography variant="subtitle1">React + D3 integration</Typography>
              </Widget>
            </Grid>
            <Grid item>
              <Widget className={classes.widget} title="React Virtualized" border="bottom">
                <Typography variant="subtitle1">Infinite list support</Typography>
              </Widget>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" align="center">
            Want to learn more? Check the&nbsp;
            <a
              className={classes.link}
              href="https://github.com/latticejs/lattice"
              target="_blank"
              rel="noopener noreferrer"
            >
              docs
            </a>
            !
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(App);
