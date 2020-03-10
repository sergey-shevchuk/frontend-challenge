import React from 'react';
import styled from '@emotion/styled/macro';
import Button from '../common/Button';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

const DialogContentText = styled.div`
  display: flex;
  flex-direction: column;
  color: rgba(0, 0, 0, 0.7);
`;

export default function StartServiceDialog({
  onClose,
  moreDetailsSelected,
  maintenanceDetails,
  open
}) {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="more-details-dialog"
      open={open}
    >
      <DialogTitle id="more-details-dialog">Maintenance Details</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {moreDetailsSelected && maintenanceDetails[moreDetailsSelected].title}
          <ul>
            {moreDetailsSelected &&
              maintenanceDetails[
                moreDetailsSelected
              ].details.map(maintenance => (
                <li key={maintenance}>{maintenance}</li>
              ))}
          </ul>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
