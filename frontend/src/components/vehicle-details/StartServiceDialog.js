import React, { useState, useContext } from 'react';
import styled from '@emotion/styled/macro';
import LabeledInput from '../common/LabeledInput';
import Button from '../common/Button';
import axios from 'axios';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import ErrorMessageContext from '../../context/ErrorMessageContext';
import LoadingContext from '../../context/LoadingContext';
import parseError from '../../utils/parse-error';

const DialogContentText = styled.div`
  display: flex;
  flex-direction: column;
  color: rgba(0, 0, 0, 0.7);
`;

export default function StartServiceDialog({
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
      aria-labelledby="start-service-dialog"
      open={open}
    >
      <DialogTitle id="start-service-dialog">Perform maintenance</DialogTitle>
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
