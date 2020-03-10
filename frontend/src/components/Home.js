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
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAE6UlEQVRoge2YbYhUVRjHf/+z45q2S7VriCFioYVfKsiw0tIPkpbhB1NEytRI22V31grCDZd0SZAITGZ2ScNMJULEQKgVdJPyJSMqCKS+WK0oKr6Mmrut+bLn6cMdzWZn596Z2ZWg+cHMHe4553n+/3mewz0zUKJEiRIlShSOilq9zco4yQTEROTHgkYBo4DBwF3pWdev52+6XgaOgh3F3GEcBzjLd6yUL1RKYUZa7H7wdZjmACMKTZ7BKcw+p8x9SJ2+z3dxfkbW2BAG+XdBdYBL3+1AthdzPyGO4OgAurhGJzGuUcsFAD7gTq4RI0YlUIHnXozRyD8MmoIx+p9E9inmamnQxf43YiZabAcwE+jB7DOca6Ve+yLHyEXCngS/GGkeEAP2k9KUqO0W3UiLLcBsE3Aer+dYqoMFCQ4jaePBdgFVSPOo19Yoy1z4lDRm9cFVbwyYCYC4fkB6O52zJuqyaEZa7VFgPHCGSiJ9Q0UxiE+AbmAyrTYuypJoRnr8kuCDbWCR/ipQXnRe1R/ItgHg/ctRloQbWWNDkOYAhrmPihKYD+Y2BFctJGGDw6aHG4kxB7gD+IoG/VasvsjE9Q3wM2IYYmbY9HAjskUAmDYWLS5fpKAq2JLQqTc+tdp0vDUCjwAVGfOu4FRNnbr6T2UEWqwasxNAecZIF/AjaDVx7YLrFUna83hrAybT2wRA+y03AVCvFLAny0gFMBlsJwmbBTday5oAh2wVMQ0n7kS5yoEzwbAduQWy+8A6ABBHSKmMuBMxDUe2ikBzEwRHAYAxwRq3kVqdBuAKM4C7gyB6kaT9gmM33ZzkTf05oNrfs9sZygg8T4O9EGhjNFVMBXZTq9MkbWO6AGMDnwBJ/zVBW2Xjd+C+ARUeTi4Ne4m7KUFreS0GdhJsopvpIaanQLOBHUAHwRN3oOlO59oBmh1ooCdjThfQhtMrfYdJ2uskvZH0bQMmNV+SfidJb7TYa9mGY9luYrYwaDptYqWVU+3fAc0n80eU6MRox6uRpTpckMCEjcTZ+8A0jMqM0RNgW0i5FcDHYM/gbRGwNjNM9mN80ltgSLeBb0ZaFiLnHDE9SK2O52VirT1AmR0EqnJPtNWYa0YWnPPirpfu3E/2Bl1Gmg+A10TiTv96xTQSaAOquOrX5GUCoMxWp018QUwje8VHk4KJWkCDLucKFeX0q/T7hV4jtTqOU20wrmn5eEjHnApATDVZq5ktZx9EMGLbg6C2n6TNjRo4EkbQwleztHjS5mK2L517e1io7Jv9ZrrdcobaOGAq2FYSvh5pBRUcpJNheFsXJKM9Hw9pvgRmIVtHwmqo5CxdPIFZM1i6rWhHbnlYoPCKLFMnKU3DVAOcQkwC20OXXUJ2DHgWOIf0Vt42vBqBFDAD2TG67BLYniAHpzDVkNL0KOe8aL8QV8rToPU4jQE1AYcIHloXEdtxmkCdfs3byFIdJqaHMNsGXEzHPARqwmkMDVpfzJ92pB+GVniAASKHrtwVSdhjAyKoEFrs8VzDuTe77FuSRVS2P7HcDRK2R871n5Kiyakld0Xirjrr/et9muWoUBRhcXPs274qciJYaBN7B7txL79zVTQKzttHRWwLqBHsQO89kv5SZJsLUZqbwvNmN5JyK6j2gF4C7skYPY5sM2ddc1Ga/0t5S5QoUaLE/56/AbaUvPYr8tpxAAAAAElFTkSuQmCC" />
          <p>Vehicle Data</p>
        </Tile>
      </TileWrapper>
    </HomeWrapper>
  );
}
