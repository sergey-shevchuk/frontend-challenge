import React from 'react';
import styled from '@emotion/styled/macro';

const carImages = {
  TC2020: require('../../images/camry.png'),
  TR2020: require('../../images/rav4.png'),
  TS2020: require('../../images/sequoia.png')
};

const VehicleCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
`;

const CardContainer = styled.div`
  display: flex;
`;

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

export default function VehicleCard({ vehicleDetails, vin }) {
  return (
    <VehicleCardContainer>
      <img src={carImages[vehicleDetails.id]}></img>
      <h2>{vehicleDetails.name}</h2>
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
    </VehicleCardContainer>
  );
}
