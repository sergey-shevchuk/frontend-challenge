import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled/macro';

import carServiceImage from '../images/car-service.png';
import fadeIn from '../animations/fade-in';

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
export default function Home() {
  let history = useHistory();

  const handleDealerTileClick = () => {
    history.push('/dealer');
  };

  const handleSearchTileClick = () => {
    history.push('/vehicle-data');
  };
  return (
    <HomeWrapper>
      <img height="500" src={carServiceImage} />
      <TileWrapper>
        <Tile onClick={handleDealerTileClick}>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAC40lEQVRoge2YTUhUURTHf+f6VCw3FS5kolo4EKGrjCjc265NFERSURSEY0nQThfSxyJMnDcQ7SJatgqCahX0sdDa9EGLDCRqUSAUuJGce1p4dT70zYcz45ux99u8efec+7/ncO68d+6DiIiIiIgQEAB8qyHHURkJIybsGKqFl3OXMBJSHOsjaydtmopsmkRyt1YD/+mFpHYg+ivsQCqiRTo8lLh7CL8lYQ6EHFJ5+HYa6OUvcYPQtTSqX0INal3ojPvRZTA2vjRGAybiYra2y6CuIsbMFJpRl6iLWYgbROJuuAETcTGrZFXEBiTi22mS9mWgWCn2lH1dwfw3gfPFbS0hnnkhNtOyyvGuxoBehD4mtHPdduVwBfMPBc6H1uUfBpgGIM2pVW7ZY011aJeVsSnB137Qp8ACyCjw0DkNoDoGK5WqV3szKkfceURHQMdWZQyKyiiC1KkdVEYYkuuZtj3TZ80Di8AUKuMMyXOXbD/oVWD57R+m3QPagTWOHr7Vhmoa8+LdNG18lEi94RV3Ae7pFhY4juhRoBvYAWwDFPgNzAEfQJ7QwiMuyp8N1WP5cxBknlr5T4GU7gZ9gbKnpKThB4vSx7DMrmmtll5evMW3luq4W/QzyHms9IDEaJc22qUNJIaVHlQuAF+BGJ69tWF6jsIVmdBOPP0GWNKyiyvys6BaUnciOgssIhJjUOZy7NXUK6siHgOAh/C46KIAQ/IdeAa0omv0RtXWy5EuiJ5dunCs/JelngMma6uXIbgiKT0I7C1vsRx6mNT9NdPLI7gi1p5GBERvM9h0rawl/fQdkGGMPQO8q4leHsEVETkBQNo8wE/fxLfzpNI3CiyW8Wky953IyZrplZwIbAfgsnwESQBb3TWALJ9L8j5HozZ6JSeSpalJYB7VZEU+tdLLIb+Nr7St32C94r1Wtc8oNTrz/Afdr/IKoW/lXqSbQflUUC2p+xDN9sl8r6q2XkRERERD8w8UB9m190Ui3gAAAABJRU5ErkJggg==" />
          <p>Dealer</p>
        </Tile>
        <Tile onClick={handleSearchTileClick}>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAE70lEQVRoge3YX4xdVRXH8c/aHaYltlFbEoJpCBDU8KImYlBaoSbEgWLnjkpBHxAwYkrgQX2xSmNpJBJf1BcTMPgHYgyZ0Dp3SpsAEkCwxiipCfGpyjSQVhtkhLaWzuCc5cPcIXXmzv03HeLD/SY35+Tstdf6/e7e+5x9Dn369OnTp0/vxFI656gVBl0hbKh4f3ChcKG0Eu9thM0d//X2MUxJLycvFw4pnveCP8Q9qnfUSO7xgWrAnZG24oJei8/jWIa9hZ/EsD9227krIznq3GrQ9yPcidK4PJHp2RL+LByWJqxwUnFC5T+u9zrY5z2KAZU1ZqwWLpYuqtJHImzCRW/XCb8qA+6IzY6fdSOZIseNYRgzye7Cj6Pmt53maJl/zCcrbo/wRQzguTho01KmW/NCdbdUdVnVTeaYK89q8v+tc3k17rWqLrPuC532K+1DGgW4CyJ8I0Yc6EVkJ0TNn6LynUbNbZ3268hIjvsYLser1nikN4ldMO2XOIWrc4/LOunSkZGKr0LyYHzK6d4Vdkbc6I1Mo1AVX+6kT1sjOercxm02S+WnS9TYMSU8CBFuzf1Wto1vm3HQVrwbT8dn/W3JCjskan6Hv+A8bxluF99+RIrbIPjZ0uV1RzRGJRtTu2Xs3EnWXZtsx0exel7cdExZFzc6eVaVtiH3WJcrHMXgvKaTeCHSfTHicRpGctznG4trsRHaV2o+s2yKW1DV7cd1izUHW6NmT4FMO1CSe2PG+aUm4h8G8Sokh98R1U3INNE4PRwHrSg1ETPOT+5taN5BY0SquhNYHeGSGJ7tmHuNZOXXjSRvRPi29IRV/h5D/r2s4h/3LqddIHw60/fM3mxEMRRbPAE57uJML+FkqVkzZ+QZXL1I3pdwyXIK74BWGp4tNZsKRHG7sJ8Fi3kmiqsi3CCNYcLsE3e5OYUJaSzCDVFchZl5MSexL/jKollyzNeruqzG7VtGsV1R1e2v6jLHfa1Z+0CzixluhUi/yFGD1UrfDW628CXqBJ6MYntscagXgbnb+hzwQwxhzbzmoxkeLqftxM+T6zLdhh/Nz9P0faSqS4hzrKqm7YrwzZZqwmSED8UWR7oyUffBDAektS3juK+cY1e+NbvPK7WFuls+2WOzqQg3Q6QNpSbO/EWxHvuktVXlB92YmBPYMPFYFOsX5GcjBLfEZlOtcnWy+51z//qChi2ORLqjETTUpQ+4BqLY1nQ0Y2HNxWi/10qPQhbP5ZibuhDZCQmmF06VHHNTmn2NzpjV0Iqmi/1MSrg7uUy6JsMjVd1dEXZa44BJ52Vxf0POk926wG/wuRxwf+62zVr/dMKVmXYlG+fyltPubquzXUDUnIiDhiJtwzFszPRUHvdmDnhF2ixMBt/q1kUU2/Ears8Br+Rxb2Z6yuzaOBZpWxx0bSeb1Y7eEOMeVYx4IKZcGrP7shfNPrSO49FIV0TNX7s2ssWhKD6cjDZyncKLkXbElEtjxANL+orS+FqSPSdYJlrpajkiOe7jyyOpe3KvT7Rqb7nYM/2+qp9dQb2SbSZY6zUSJs+ilqXRRkvLESnD1jW7PjdPm20VlkK7vK3W7WIjchSybsP8hjOudbWv6pCe6y62+3040vbk+flrZO4vyfRQr2oXYyl1mxopp+2sVhHpS3jfvOYjmR4q03YtUff/Td0+ffr06dPnv5mT1SttLEiIAAAAAElFTkSuQmCC" />
          <p>Vehicle Data</p>
        </Tile>
      </TileWrapper>
    </HomeWrapper>
  );
}
