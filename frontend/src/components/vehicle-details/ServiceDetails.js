import React from 'react';
import styled from '@emotion/styled/macro';
import CheckMark from './CheckMark';

const ServiceCommon = styled.div`
  display: flex;
  position: relative;
  width: 80%;
  height: 70px;
  border-radius: 5px;
  margin: 10px;
`;

const ServiceScheduled = styled(ServiceCommon)`
  border: solid 1.3px #feb100;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px;
`;

const ServiceScheduledDealer = styled(ServiceScheduled)`
  border: solid 1.3px #0093fe;
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

const DotScheduled = styled(DotContainerCommon)`
  background-color: white;
  color: #feb100;
  border: solid 1.3px #feb100;
`;

const DotScheduledDealer = styled(DotContainerCommon)`
  background-color: white;
  color: #0093fe;
  border: solid 1.3px #0093fe;
`;

const DotCompletedContainer = styled(DotContainerCommon)`
  background-color: #21c08c;
  border: solid 1.3px #21c08c;
`;

const DotLocked = styled(DotContainerCommon)`
  background-color: white;
  border: solid 1.3px #a8acad;
  color: #a8acad;
`;

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

function DotCompleted() {
  return (
    <DotCompletedContainer>
      <CheckMark />
    </DotCompletedContainer>
  );
}

export default function ServiceDetails({
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
                <ServiceScheduledDealer key={entry.id}>
                  <DotScheduledDealer>{index + 1}</DotScheduledDealer>
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
                </ServiceScheduledDealer>
              );
            } else {
              return (
                <ServiceScheduled key={entry.id}>
                  <DotScheduled>{index + 1}</DotScheduled>
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
