import React, { useState, useEffect, useContext } from 'react';
import styled from '@emotion/styled/macro';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import fadeIn from '../../animations/fade-in';
import ErrorMessageContext from '../../context/ErrorMessageContext';
import LoadingContext from '../../context/LoadingContext';
import parseError from '../../utils/parse-error';
import VehicleCard from './VehicleCard';
import ServiceDetails from './ServiceDetails';
import StartServiceDialog from './StartServiceDialog';
import MoreDetailsDialog from './MoreDetailsDialog';

const VehicleDetailsContainer = styled.div`
  display: flex;
  width: 100%;
  animation: ${fadeIn} 1s ease;
`;

export default function VehicleDetails({ isDealer }) {
  let { vin } = useParams();

  const [isStartServiceDialogOpen, setStartServiceDialogOpen] = React.useState(
    false
  );
  const [isMoreDetailsDialogOpen, setMoreDetailsDialogOpen] = React.useState(
    false
  );
  const [vehicleDetails, setVehicleDetails] = useState();
  const [currentMaintenance, setCurrentMaintenance] = React.useState();
  const [moreDetailsSelected, setMoreDetailsSelected] = React.useState();
  const setErrorMessage = useContext(ErrorMessageContext);
  const setLoading = useContext(LoadingContext);

  const openStartServiceDialog = () => {
    setStartServiceDialogOpen(true);
  };

  const openMoreDetailsDialog = () => {
    setMoreDetailsDialogOpen(true);
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
    handleStartServiceDialogClose();
  };

  const handleStartServiceDialogClose = value => {
    setStartServiceDialogOpen(false);
  };
  const handleMoreInfoDialogClose = value => {
    setMoreDetailsDialogOpen(false);
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
        openMoreDetailsDialog={openMoreDetailsDialog}
        setMoreDetailsSelected={setMoreDetailsSelected}
        isDealer={isDealer}
      />
      <StartServiceDialog
        open={isStartServiceDialogOpen}
        onClose={handleStartServiceDialogClose}
        currentMaintenance={currentMaintenance}
        onServiceConfirm={onServiceConfirm}
        maintenanceDetails={vehicleDetails.maintenanceDetails}
        vin={vin}
      />
      <MoreDetailsDialog
        open={isMoreDetailsDialogOpen}
        onClose={handleMoreInfoDialogClose}
        maintenanceDetails={vehicleDetails.maintenanceDetails}
        moreDetailsSelected={moreDetailsSelected}
      />
    </VehicleDetailsContainer>
  );
}
