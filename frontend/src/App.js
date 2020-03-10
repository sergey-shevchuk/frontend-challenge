import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/macro';
import LabeledInput from './components/common/LabeledInput';
import './App.css';
import Button from './components/common/Button';
import axios from 'axios';
import carServiceImage from './images/car-service.png';
import Backdrop from '@material-ui/core/Backdrop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useParams
} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorBoundary from './ErrorBoundary';
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import fadeIn from './animations/fade-in';
import ErrorMessageContext from './context/ErrorMessageContext';
import LoadingContext from './context/LoadingContext';
import Home from './components/Home';
import VehicleDataSearch from './components/search/VehicleDataSearch';
import DealerSearch from './components/search/DealerSearch';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AppContainer = styled('section')`
  display: flex;
`;

const ServiceCommon = styled.div`
  display: flex;
  position: relative;
  width: 80%;
  height: 70px;
  border-radius: 5px;
  margin: 10px;
`;

const ServiceScheduled = styled(ServiceCommon)`
  border: solid 1.3px #0093fe;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px;
`;

const ServiceCompleted = styled(ServiceCommon)`
  border: solid 1.3px #37c392;
  background-color: #effaf7;
  box-shadow: inset rgba(0, 0, 0, 0.16) 0px 0px 1px 0px;
`;

const ServiceLocked = styled(ServiceCommon)`
  background-color: white;
`;

const Text = styled.p`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 5px;
`;

const TextCompleted = styled(Text)`
  color: #2e735c;
`;

const TextLocked = styled(Text)`
  color: #a8acad;
`;

const MoreInfo = styled.button`
  background-color: inherit;
  border: 0;
  padding: 0;
  cursor: pointer;

  color: #8e9398;
`;

const MoreInfoCompleted = styled(MoreInfo)`
  color: #3a9476;
`;

const InfoContainer = styled.div`
  width: 60%;
  margin-left: 30px;
`;

const StatusContainer = styled.div`
  width: 30%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const DotContainerCommon = styled.div`
  position: absolute;
  left: -10px;
  top: 32%;
  width: 20px;
  height: 20px;
  border-radius: 15px;
  text-align: center;
  font-size: 14px;
  line-height: 20px;
`;

const DotStart = styled(DotContainerCommon)`
  background-color: white;
  color: #0093fe;
  border: solid 1.3px #0093fe;
`;

const DotCompletedContainer = styled(DotContainerCommon)`
  background-color: #21c08c;
  border: solid 1.3px #21c08c;
`;

function DotCompleted() {
  return (
    <DotCompletedContainer>
      <CheckMark />
    </DotCompletedContainer>
  );
}

const DotLocked = styled(DotContainerCommon)`
  background-color: white;
  border: solid 1.3px #a8acad;
  color: #a8acad;
`;

function CheckMark() {
  return (
    <img
      width="10"
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABB0lEQVRIie3SsS4EQQAG4HGHS8RDUAiVENEoVRqFJ/A4nkGCAolEQnBExaNo0HAK1RHFp9nE5GzO7dmda/YvNzv/l38yIdSpU1IwjdXU6BTu8YGtlOidn3xhu1k1GkJohxDWo8+NEEKnSrSFG79zgEZV6CSuR4G2R4FejQK9TI1O4KIwinHsYWNI9DwH3f8LbeEs+/kTmwXQJk6Gut6cx9AdZHl2S6eFl0YFa3jvOdx3ebb0eKilPUUreBsEz9Cjf6NR4TI6/XA0cFgaGhUv4TUPxxh2S0cjfBEvPeVd3Oaggz2kAvgCnnOg8pfm4PN4SopG+Bwek6IRPoOHpGiEz2InKVqnrHwDVOz32v1Sc/0AAAAASUVORK5CYII="
    />
  );
}

const ServiceDetailsContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #eef5fd;
`;

const StartAction = styled.button`
  outline: 0;
  background-color: inherit;
  border: 0;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  color: #0093fe;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 600;
`;

const CompletedLabel = styled(Label)`
  color: #2e735c;
`;

const LockedLabel = styled(Label)`
  color: #a8acad;
`;

const ScheduledLabel = styled(Label)`
  color: #feb100;
`;

const CarDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
`;

const DetailsContainer = styled.div`
  display: flex;
  width: 100%;
  animation: ${fadeIn} 1s ease;
`;

const CarModel = styled.h2``;

const Card = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  width: 200px;
  height: 80px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px;
  margin: 30px;
  border-radius: 10px;
  padding: 20px;
`;
const CardTitle = styled.div`
  color: #636363;
`;
const CardValue = styled.div`
  margin-top: 10px;
  font-weight: 500;
`;

const CardContainer = styled.div`
  display: flex;
`;

const carImages = {
  TC2020: require('./images/camry.png'),
  TR2020: require('./images/rav4.png'),
  TS2020: require('./images/sequoia.png')
};

function parseError(error) {
  return (
    error && ((error.response && error.response.data.message) || error.message)
  );
}

function VehicleDetails({ isDealer }) {
  let { vin } = useParams();

  const [open, setOpen] = React.useState(false);
  const [vehicleDetails, setVehicleDetails] = useState();
  const [currentMaintenance, setCurrentMaintenance] = React.useState();
  const setErrorMessage = useContext(ErrorMessageContext);
  const setLoading = useContext(LoadingContext);

  const openStartServiceDialog = () => {
    setOpen(true);
  };

  const fetchMaintenanceHistory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:4000/api/maintenance-history/${vin}`
      );
      setVehicleDetails(response.data);
    } catch (error) {
      setErrorMessage(parseError(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaintenanceHistory();
  }, []);

  const onServiceConfirm = () => {
    fetchMaintenanceHistory();
    handleClose();
  };

  const handleClose = value => {
    setOpen(false);
  };

  if (!vehicleDetails) {
    return null;
  }
  return (
    <DetailsContainer>
      <CarDetails vehicleDetails={vehicleDetails} vin={vin} />
      <ServiceDetails
        maintenanceDetails={vehicleDetails.maintenanceDetails}
        maintenanceData={vehicleDetails.maintenanceData}
        openStartServiceDialog={openStartServiceDialog}
        setCurrentMaintenance={setCurrentMaintenance}
        isDealer={isDealer}
      />
      <StartServiceDialog
        open={open}
        onClose={handleClose}
        currentMaintenance={currentMaintenance}
        onServiceConfirm={onServiceConfirm}
        maintenanceDetails={vehicleDetails.maintenanceDetails}
        vin={vin}
      />
    </DetailsContainer>
  );
}

function CarDetails({ vehicleDetails, vin }) {
  return (
    <CarDetailsContainer>
      <img src={carImages[vehicleDetails.id]}></img>
      <CarModel>{vehicleDetails.name}</CarModel>
      <CardContainer>
        <Card>
          <CardTitle>VIN</CardTitle>
          <CardValue>{vin}</CardValue>
        </Card>
        <Card>
          <CardTitle>Last service at</CardTitle>
          <CardValue>{vehicleDetails.lastServiceMilage} miles</CardValue>
        </Card>
      </CardContainer>
    </CarDetailsContainer>
  );
}

function ServiceDetails({
  maintenanceData,
  maintenanceDetails,
  openStartServiceDialog,
  setCurrentMaintenance,
  isDealer
}) {
  const createHandleMaintenanceStart = id => () => {
    setCurrentMaintenance(id);
    openStartServiceDialog();
  };
  return (
    <ServiceDetailsContainer>
      {isDealer ? <h3>Select a service</h3> : <h3>Maintenance History</h3>}
      {maintenanceData.map((entry, index) => {
        const title = maintenanceDetails[entry.id].title;
        switch (entry.status) {
          case 'completed':
            return (
              <ServiceCompleted key={entry.id}>
                <DotCompleted></DotCompleted>
                <InfoContainer>
                  <TextCompleted>{title}</TextCompleted>
                  <MoreInfoCompleted>More info</MoreInfoCompleted>
                </InfoContainer>
                <StatusContainer>
                  <CompletedLabel>Completed</CompletedLabel>
                </StatusContainer>
              </ServiceCompleted>
            );
          case 'scheduled':
            if (isDealer) {
              return (
                <ServiceScheduled key={entry.id}>
                  <DotStart>{index + 1}</DotStart>
                  <InfoContainer>
                    <Text>{title}</Text>
                    <MoreInfo>More info</MoreInfo>
                  </InfoContainer>
                  <StatusContainer>
                    <StartAction
                      onClick={createHandleMaintenanceStart(entry.id)}
                    >
                      Start
                    </StartAction>
                  </StatusContainer>
                </ServiceScheduled>
              );
            } else {
              return (
                <ServiceScheduled key={entry.id}>
                  <DotStart>{index + 1}</DotStart>
                  <InfoContainer>
                    <Text>{title}</Text>
                    <MoreInfo>More info</MoreInfo>
                  </InfoContainer>
                  <StatusContainer>
                    <ScheduledLabel>Scheduled</ScheduledLabel>
                  </StatusContainer>
                </ServiceScheduled>
              );
            }

          case 'future':
            return (
              <ServiceLocked key={entry.id}>
                <DotLocked>{index + 1}</DotLocked>
                <InfoContainer>
                  <TextLocked>{title}</TextLocked>
                  <MoreInfo>More info</MoreInfo>
                </InfoContainer>
                <StatusContainer>
                  <LockedLabel>Locked</LockedLabel>
                </StatusContainer>
              </ServiceLocked>
            );
          default:
            throw new Error('Unsupported status');
        }
      })}
    </ServiceDetailsContainer>
  );
}

const useStyles = makeStyles(theme => ({
  loader: {
    zIndex: theme.zIndex.drawer + 200,
    color: '#fff'
  }
}));

function StartServiceDialog({
  onClose,
  currentMaintenance,
  onServiceConfirm,
  maintenanceDetails,
  open,
  vin
}) {
  const setErrorMessage = useContext(ErrorMessageContext);
  const setLoading = useContext(LoadingContext);

  const [milage, setMilage] = useState();

  const handleMilageChange = LabeledInput.createInputHandler(setMilage);

  const confirmService = async () => {
    setLoading(true);
    try {
      await axios.post(`http://localhost:4000/api/maintenance-history/${vin}`, {
        lastServiceMilage: milage,
        maintenanceHash: currentMaintenance
      });
      onServiceConfirm();
    } catch (error) {
      setErrorMessage(parseError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Perform maintenance</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {currentMaintenance && maintenanceDetails[currentMaintenance].title}
          <ul>
            {currentMaintenance &&
              maintenanceDetails[
                currentMaintenance
              ].details.map(maintenance => (
                <li key={maintenance}>{maintenance}</li>
              ))}
          </ul>
        </DialogContentText>
        <LabeledInput
          value={milage}
          onChange={handleMilageChange}
          label="Current service milage"
        ></LabeledInput>
      </DialogContent>
      <DialogActions>
        <Button type="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={confirmService}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}

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
                <Alert onClose={handleErrorClose} severity="error">
                  {errorMessage}
                </Alert>
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
