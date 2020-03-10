import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/macro';
import { useHistory } from 'react-router-dom';

import Button from '../common/Button';
import LabeledInput from '../common/LabeledInput';
import carServiceImage from '../../images/car-service.png';
import fadeIn from '../../animations/fade-in';

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

export default function CommonSearch({
  headerText,
  redirectPath,
  buttonColor = '#0093fe'
}) {
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
        <Button onClick={handleSearch} color={buttonColor}>
          Search
        </Button>
      </SearchControls>
    </SearchWrapper>
  );
}

CommonSearch.propTypes = {
  headerText: PropTypes.string.isRequired,
  redirectPath: PropTypes.string.isRequired
};
