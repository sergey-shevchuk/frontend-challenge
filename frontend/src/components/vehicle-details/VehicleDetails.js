import React, { useState, useEffect, useContext } from 'react';
import styled from '@emotion/styled/macro';
import LabeledInput from '../common/LabeledInput';
import Button from '../common/Button';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import fadeIn from '../../animations/fade-in';
import ErrorMessageContext from '../../context/ErrorMessageContext';
import LoadingContext from '../../context/LoadingContext';
import parseError from '../../utils/parse-error';
import CheckMark from './CheckMark';
import VehicleCard from './VehicleCard';
import ServiceDetails from './ServiceDetails';
import StartServiceDialog from './StartServiceDialog';

const VehicleDetailsContainer = styled.div`
  display: flex;
  width: 100%;
  animation: ${fadeIn} 1s ease;
`;

export default function VehicleDetails({ isDealer }) {
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
    <VehicleDetailsContainer>
      <VehicleCard vehicleDetails={vehicleDetails} vin={vin} />
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
    </VehicleDetailsContainer>
  );
}
