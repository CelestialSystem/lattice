import React, { Component } from 'react';
// Material-UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PieChartIcon from '@material-ui/icons/PieChart';
import GridOnIcon from '@material-ui/icons/GridOn';
import MapIcon from '@material-ui/icons/Map';
import Box from '@material-ui/core/Box';

import LatticeMap from '@latticejs/map';
import Mapboxgl from 'mapbox-gl';
import '@latticejs/map/css/style.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { token } from './config';
import './css/style.css';

// Material icons
import DayIcon from '@material-ui/icons/WbSunnyOutlined';
import NightIcon from '@material-ui/icons/Brightness3Outlined';

import 'typeface-roboto';

// Custom Style
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  },
  appBar: {
    backgroundColor: theme.palette.primary[theme.palette.type],
    color: theme.palette.primary.contrastText
  },
  widget: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(4)
  },
  link: {
    color: theme.palette.text.secondary
  }
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`
  };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0
    };
  }

  handleNightModeChange = () => {
    const { updateTheme, nightMode } = this.props;
    updateTheme(!nightMode);
  };

  handleChange = (event, newTab) => {
    this.setState({
      selectedTab: newTab
    });
  };

  afterMapLoad = mapObj => {
    let navigation = new Mapboxgl.NavigationControl();
    mapObj.addControl(navigation, 'top-left');
    mapObj.addControl(
      new MapboxGeocoder({
        accessToken: Mapboxgl.accessToken,
        mapboxgl: Mapboxgl
      })
    );

    mapObj.on('render', function(evt) {
      let layers = ['country-label-lg', 'place-city-sm'];
      layers.map(layer => {
        mapObj.setLayoutProperty(layer, 'text-field', [
          'format',
          ['get', 'name_en'],
          {
            'font-scale': 1.2,
            'text-font': ['literal', ['Roboto Bold']]
          }
        ]);
        return null;
      });

      var zoomThreshold = 4;
      mapObj.addLayer(
        {
          id: 'state-population',
          source: {
            type: 'vector',
            url: 'mapbox://mapbox.660ui7x6'
          },
          'source-layer': 'state_county_population_2014_cen',
          maxzoom: zoomThreshold,
          type: 'fill',
          filter: ['==', 'isState', true],
          paint: {
            'fill-color': [
              'interpolate',
              ['linear'],
              ['get', 'population'],
              0,
              '#F2F12D',
              500000,
              '#EED322',
              750000,
              '#E6B71E',
              1000000,
              '#DA9C20',
              2500000,
              '#CA8323',
              5000000,
              '#B86B25',
              7500000,
              '#A25626',
              10000000,
              '#8B4225',
              25000000,
              '#723122'
            ],
            'fill-opacity': 0.75
          }
        },
        'waterway-label'
      );

      mapObj.addLayer(
        {
          id: 'county-population',
          source: {
            type: 'vector',
            url: 'mapbox://mapbox.660ui7x6'
          },
          'source-layer': 'state_county_population_2014_cen',
          minzoom: zoomThreshold,
          type: 'fill',
          filter: ['==', 'isCounty', true],
          paint: {
            'fill-color': [
              'interpolate',
              ['linear'],
              ['get', 'population'],
              0,
              '#F2F12D',
              100,
              '#EED322',
              1000,
              '#E6B71E',
              5000,
              '#DA9C20',
              10000,
              '#CA8323',
              50000,
              '#B86B25',
              100000,
              '#A25626',
              500000,
              '#8B4225',
              1000000,
              '#723122'
            ],
            'fill-opacity': 0.75
          }
        },
        'waterway-label'
      );

      var stateLegendEl = document.getElementById('state-legend');
      var countyLegendEl = document.getElementById('county-legend');
      mapObj.on('zoom', function() {
        if (mapObj.getZoom() > zoomThreshold) {
          stateLegendEl.style.display = 'none';
          countyLegendEl.style.display = 'block';
        } else {
          stateLegendEl.style.display = 'block';
          countyLegendEl.style.display = 'none';
        }
      });
    });
  };

  render() {
    const { classes, nightMode } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              Reacharts, Ag-Grid, Map Example
            </Typography>
            <Tooltip title="Toggle Night Mode" enterDelay={300}>
              <IconButton onClick={this.handleNightModeChange} color="inherit">
                {nightMode ? <DayIcon /> : <NightIcon />}
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.selectedTab}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            aria-label="scrollable force tabs example"
          >
            <Tab label="Rechart" icon={<PieChartIcon />} {...a11yProps(0)} />
            <Tab label="Ag-Grid" icon={<GridOnIcon />} {...a11yProps(1)} />
            <Tab label="Map" icon={<MapIcon />} {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.selectedTab} index={0}>
          Rechart
        </TabPanel>
        <TabPanel value={this.state.selectedTab} index={1}>
          Ag-Grid
        </TabPanel>
        <TabPanel value={this.state.selectedTab} index={2}>
          <Grid>
            <LatticeMap
              //-98, 38.88
              //30.0222, -1.9596
              longitude={-98}
              latitude={38.88}
              minZoom={3}
              zoom={3}
              accessToken={token}
              afterMapComplete={this.afterMapLoad}
              height={91}
              width={100}
            />
            <div id="state-legend" className="legend">
              <h4>Population</h4>
              <div>
                <span style={{ 'background-color': '#723122' }}></span>25,000,000
              </div>
              <div>
                <span style={{ 'background-color': '#8B4225' }}></span>10,000,000
              </div>
              <div>
                <span style={{ 'background-color': '#A25626' }}></span>7,500,000
              </div>
              <div>
                <span style={{ 'background-color': '#B86B25' }}></span>5,000,000
              </div>
              <div>
                <span style={{ 'background-color': '#CA8323' }}></span>2,500,000
              </div>
              <div>
                <span style={{ 'background-color': '#DA9C20' }}></span>1,000,000
              </div>
              <div>
                <span style={{ 'background-color': '#E6B71E' }}></span>750,000
              </div>
              <div>
                <span style={{ 'background-color': '#EED322' }}></span>500,000
              </div>
              <div>
                <span style={{ 'background-color': '#F2F12D' }}></span>0
              </div>
            </div>
            <div id="county-legend" className="legend" style={{ display: 'none' }}>
              <h4>Population</h4>
              <div>
                <span style={{ 'background-color': '#723122' }}></span>1,000,000
              </div>
              <div>
                <span style={{ 'background-color': '#8B4225' }}></span>500,000
              </div>
              <div>
                <span style={{ 'background-color': '#A25626' }}></span>100,000
              </div>
              <div>
                <span style={{ 'background-color': '#B86B25' }}></span>50,000
              </div>
              <div>
                <span style={{ 'background-color': '#CA8323' }}></span>10,000
              </div>
              <div>
                <span style={{ 'background-color': '#DA9C20' }}></span>5,000
              </div>
              <div>
                <span style={{ 'background-color': '#E6B71E' }}></span>1,000
              </div>
              <div>
                <span style={{ 'background-color': '#EED322' }}></span>100
              </div>
              <div>
                <span style={{ 'background-color': '#F2F12D' }}></span>0
              </div>
            </div>
          </Grid>
        </TabPanel>
      </div>
    );
  }
}

export default withStyles(styles)(App);
