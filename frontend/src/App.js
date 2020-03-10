import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import styled from '@emotion/styled/macro';
import LabeledInput from './LabeledInput';
import './App.css';
import Button from './Button';
import axios from 'axios';
import carServiceImage from './images/car-service.png';
import Backdrop from '@material-ui/core/Backdrop';
import { keyframes } from '@emotion/core';
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
import { blue } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorBoundary from './ErrorBoundary';
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

const ErrorContext = React.createContext();
const LoadingContext = React.createContext();

const fadeIn = keyframes`
  0%   { opacity: 0; }
  100% { opacity: 1; }
`;

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AppContainer = styled('section')`
  display: flex;
`;

const SearchWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fe;
  animation: ${fadeIn} 1s ease;
`;

const SearchControls = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
`;

function VehicleDataSearch() {
  return <CommonSearch headerText="Customer" redirectPath="vehicle-data" />;
}

function DealerSearch() {
  return <CommonSearch headerText="Dealer Search" redirectPath="dealer" />;
}

function CommonSearch({ headerText, redirectPath }) {
  let history = useHistory();
  let [vin, setVin] = useState();
  const handleInputChange = LabeledInput.createInputHandler(setVin);

  const handleSearch = () => {
    history.push(`/${redirectPath}/${vin}`);
  };

  return (
    <SearchWrapper>
      <img height="500" src={carServiceImage} />
      <SearchControls>
        <h3>{headerText}</h3>
        <LabeledInput
          placeholder={'Input VIN here'}
          value={vin}
          onChange={handleInputChange}
        />
        <Button onClick={handleSearch}>Search</Button>
      </SearchControls>
    </SearchWrapper>
  );
}

CommonSearch.propTypes = {
  headerText: PropTypes.string.isRequired,
  redirectPath: PropTypes.string.isRequired
};

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
  TC2020: require('./images/camry.png')
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
  const setErrorMessage = useContext(ErrorContext);
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

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #f8f9fe;
  animation: ${fadeIn} 1s ease;
`;

const TileWrapper = styled.div`
  display: flex;
  width: 50%;
  justify-content: center;
`;

const Tile = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
  height: 150px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px;
  margin: 30px;
  border-radius: 10px;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 7px 6px;
  }
`;

function Home() {
  let history = useHistory();
  const onDealerTileClick = () => {
    history.push('/dealer');
  };
  const onSearchTileClick = () => {
    history.push('/vehicle-data');
  };
  return (
    <HomeWrapper>
      <img height="500" src={carServiceImage} />
      <TileWrapper>
        <Tile onClick={onDealerTileClick}>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAC40lEQVRoge2YTUhUURTHf+f6VCw3FS5kolo4EKGrjCjc265NFERSURSEY0nQThfSxyJMnDcQ7SJatgqCahX0sdDa9EGLDCRqUSAUuJGce1p4dT70zYcz45ux99u8efec+7/ncO68d+6DiIiIiIgQEAB8qyHHURkJIybsGKqFl3OXMBJSHOsjaydtmopsmkRyt1YD/+mFpHYg+ivsQCqiRTo8lLh7CL8lYQ6EHFJ5+HYa6OUvcYPQtTSqX0INal3ojPvRZTA2vjRGAybiYra2y6CuIsbMFJpRl6iLWYgbROJuuAETcTGrZFXEBiTi22mS9mWgWCn2lH1dwfw3gfPFbS0hnnkhNtOyyvGuxoBehD4mtHPdduVwBfMPBc6H1uUfBpgGIM2pVW7ZY011aJeVsSnB137Qp8ACyCjw0DkNoDoGK5WqV3szKkfceURHQMdWZQyKyiiC1KkdVEYYkuuZtj3TZ80Di8AUKuMMyXOXbD/oVWD57R+m3QPagTWOHr7Vhmoa8+LdNG18lEi94RV3Ae7pFhY4juhRoBvYAWwDFPgNzAEfQJ7QwiMuyp8N1WP5cxBknlr5T4GU7gZ9gbKnpKThB4vSx7DMrmmtll5evMW3luq4W/QzyHms9IDEaJc22qUNJIaVHlQuAF+BGJ69tWF6jsIVmdBOPP0GWNKyiyvys6BaUnciOgssIhJjUOZy7NXUK6siHgOAh/C46KIAQ/IdeAa0omv0RtXWy5EuiJ5dunCs/JelngMma6uXIbgiKT0I7C1vsRx6mNT9NdPLI7gi1p5GBERvM9h0rawl/fQdkGGMPQO8q4leHsEVETkBQNo8wE/fxLfzpNI3CiyW8Wky953IyZrplZwIbAfgsnwESQBb3TWALJ9L8j5HozZ6JSeSpalJYB7VZEU+tdLLIb+Nr7St32C94r1Wtc8oNTrz/Afdr/IKoW/lXqSbQflUUC2p+xDN9sl8r6q2XkRERERD8w8UB9m190Ui3gAAAABJRU5ErkJggg==" />
          <p>Dealer</p>
        </Tile>
        <Tile onClick={onSearchTileClick}>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAE6UlEQVRoge2YbYhUVRjHf/+z45q2S7VriCFioYVfKsiw0tIPkpbhB1NEytRI22V31grCDZd0SZAITGZ2ScNMJULEQKgVdJPyJSMqCKS+WK0oKr6Mmrut+bLn6cMdzWZn596Z2ZWg+cHMHe4553n+/3mewz0zUKJEiRIlShSOilq9zco4yQTEROTHgkYBo4DBwF3pWdev52+6XgaOgh3F3GEcBzjLd6yUL1RKYUZa7H7wdZjmACMKTZ7BKcw+p8x9SJ2+z3dxfkbW2BAG+XdBdYBL3+1AthdzPyGO4OgAurhGJzGuUcsFAD7gTq4RI0YlUIHnXozRyD8MmoIx+p9E9inmamnQxf43YiZabAcwE+jB7DOca6Ve+yLHyEXCngS/GGkeEAP2k9KUqO0W3UiLLcBsE3Aer+dYqoMFCQ4jaePBdgFVSPOo19Yoy1z4lDRm9cFVbwyYCYC4fkB6O52zJuqyaEZa7VFgPHCGSiJ9Q0UxiE+AbmAyrTYuypJoRnr8kuCDbWCR/ipQXnRe1R/ItgHg/ctRloQbWWNDkOYAhrmPihKYD+Y2BFctJGGDw6aHG4kxB7gD+IoG/VasvsjE9Q3wM2IYYmbY9HAjskUAmDYWLS5fpKAq2JLQqTc+tdp0vDUCjwAVGfOu4FRNnbr6T2UEWqwasxNAecZIF/AjaDVx7YLrFUna83hrAybT2wRA+y03AVCvFLAny0gFMBlsJwmbBTday5oAh2wVMQ0n7kS5yoEzwbAduQWy+8A6ABBHSKmMuBMxDUe2ikBzEwRHAYAxwRq3kVqdBuAKM4C7gyB6kaT9gmM33ZzkTf05oNrfs9sZygg8T4O9EGhjNFVMBXZTq9MkbWO6AGMDnwBJ/zVBW2Xjd+C+ARUeTi4Ne4m7KUFreS0GdhJsopvpIaanQLOBHUAHwRN3oOlO59oBmh1ooCdjThfQhtMrfYdJ2uskvZH0bQMmNV+SfidJb7TYa9mGY9luYrYwaDptYqWVU+3fAc0n80eU6MRox6uRpTpckMCEjcTZ+8A0jMqM0RNgW0i5FcDHYM/gbRGwNjNM9mN80ltgSLeBb0ZaFiLnHDE9SK2O52VirT1AmR0EqnJPtNWYa0YWnPPirpfu3E/2Bl1Gmg+A10TiTv96xTQSaAOquOrX5GUCoMxWp018QUwje8VHk4KJWkCDLucKFeX0q/T7hV4jtTqOU20wrmn5eEjHnApATDVZq5ktZx9EMGLbg6C2n6TNjRo4EkbQwleztHjS5mK2L517e1io7Jv9ZrrdcobaOGAq2FYSvh5pBRUcpJNheFsXJKM9Hw9pvgRmIVtHwmqo5CxdPIFZM1i6rWhHbnlYoPCKLFMnKU3DVAOcQkwC20OXXUJ2DHgWOIf0Vt42vBqBFDAD2TG67BLYniAHpzDVkNL0KOe8aL8QV8rToPU4jQE1AYcIHloXEdtxmkCdfs3byFIdJqaHMNsGXEzHPARqwmkMDVpfzJ92pB+GVniAASKHrtwVSdhjAyKoEFrs8VzDuTe77FuSRVS2P7HcDRK2R871n5Kiyakld0Xirjrr/et9muWoUBRhcXPs274qciJYaBN7B7txL79zVTQKzttHRWwLqBHsQO89kv5SZJsLUZqbwvNmN5JyK6j2gF4C7skYPY5sM2ddc1Ga/0t5S5QoUaLE/56/AbaUvPYr8tpxAAAAAElFTkSuQmCC" />
          <p>Search</p>
        </Tile>
      </TileWrapper>
    </HomeWrapper>
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
  const setErrorMessage = useContext(ErrorContext);
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
      <ErrorContext.Provider value={setErrorMessage}>
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
      </ErrorContext.Provider>
    </ErrorBoundary>
  );
}

export default App;
