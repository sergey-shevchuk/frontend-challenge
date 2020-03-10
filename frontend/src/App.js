import React, { useState, useEffect, useContext } from 'react';
import styled from '@emotion/styled/macro';
import './App.css';
import Backdrop from '@material-ui/core/Backdrop';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorBoundary from './ErrorBoundary';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import ErrorMessageContext from './context/ErrorMessageContext';
import LoadingContext from './context/LoadingContext';
import Home from './components/Home';
import VehicleDataSearch from './components/search/VehicleDataSearch';
import DealerSearch from './components/search/DealerSearch';
import VehicleDetails from './components/vehicle-details/VehicleDetails';

const useStyles = makeStyles(theme => ({
  loader: {
    zIndex: theme.zIndex.drawer + 200,
    color: '#fff'
  }
}));

const AppContainer = styled('div')`
  display: flex;
`;

function App() {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleErrorClose = () => {
    setErrorMessage('');
  };

  const classes = useStyles();

  return (
    <ErrorBoundary>
      <ErrorMessageContext.Provider value={setErrorMessage}>
        <LoadingContext.Provider value={setLoading}>
          <Backdrop className={classes.loader} open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <Router>
            <AppContainer className="App">
              <Snackbar
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={!!errorMessage}
                autoHideDuration={6000}
                onClose={handleErrorClose}
                message={errorMessage}
              >
                <MuiAlert
                  elevation={6}
                  variant="filled"
                  onClose={handleErrorClose}
                  severity="error"
                >
                  {errorMessage}
                </MuiAlert>
              </Snackbar>
              <Switch>
                <Route exact path="/dealer">
                  <DealerSearch />
                </Route>
                <Route path="/dealer/:vin">
                  <VehicleDetails isDealer />
                </Route>

                <Route exact path="/vehicle-data">
                  <VehicleDataSearch />
                </Route>

                <Route path="/vehicle-data/:vin">
                  <VehicleDetails />
                </Route>

                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </AppContainer>
          </Router>
        </LoadingContext.Provider>
      </ErrorMessageContext.Provider>
    </ErrorBoundary>
  );
}

export default App;
