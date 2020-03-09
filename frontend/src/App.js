import React, { useState } from "react";
import logo from "./logo.svg";
import styled from "@emotion/styled/macro";
import LabeledInput from "./LabeledInput";
import "./App.css";
import Button from "./Button";
import camryImage from "./images/camry.png";
import homeImage from "./images/home.png";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useParams
} from "react-router-dom";

const data = {
  "2C3HD46R4WH170": {
    image: camryImage,
    model: "2020 Toyota Camry",
    milage: 32000,
    serviceHistory: [
      {
        title: "5,000 Miles or 6 Months",
        maintenancePerformed: [
          "Check installation of driver’s floor mat",
          "Inspect and adjust all fluid levels",
          "Inspect wiper blades",
          "Rotate tires",
          "Visually inspect brake linings/drums and brake pads"
        ]
      },
      {
        title: "10,000 Miles or 12 Months",
        maintenancePerformed: [
          "Check installation of driver’s floor mat",
          "Inspect and adjust all fluid levels",
          "Inspect wiper blades",
          "Replace cabin air filter",
          "Replace engine oil and oil filter",
          "Rotate tires",
          "Visually inspect brake linings/drums and brake pads/discs"
        ]
      },
      {
        title: "15,000 Miles or 18 Months",
        maintenancePerformed: [
          "Check installation of driver’s floor mat",
          "Inspect and adjust all fluid levels",
          "Inspect wiper blades",
          "Rotate tires",
          "Visually inspect brake linings/drums and brake pads/discs",
          "Inspect The Following Ball Joint and Dust Covers, Brake Lines and Hoses, Drive Shaft Boots, Engine Coolant, Exhaust Pipes and Mountings, Radiator and Condenser, Steering Gear, Steering Linkage and Boots"
        ]
      },
      {
        title: "20,000 Miles or 24 Months",
        maintenancePerformed: [
          "Check installation of driver’s floor mat",
          "Inspect and adjust all fluid levels",
          "Inspect wiper blades",
          "Replace cabin air filter",
          "Replace engine oil and oil filter",
          "Rotate tires",
          "Visually inspect brake linings/drums and brake pads/discs"
        ]
      },
      {
        title: "25,000 Miles or 30 Months",
        maintenancePerformed: [
          "Check installation of driver’s floor mat",
          "Inspect and adjust all fluid levels",
          "Inspect wiper blades",
          "Rotate tires",
          "Visually inspect brake linings/drums and brake pads/discs"
        ]
      },
      {
        title: "30,000 Miles or 36 Months",
        maintenancePerformed: [
          "Check installation of driver’s floor mat",
          "Inspect and adjust all fluid levels",
          "Inspect wiper blades",
          "Replace cabin air filter",
          "Replace engine oil and oil filter",
          "Rotate tires",
          "Replace engine air filter",
          "Inspect The Following: Automatic Transmission for Signs of Leakage, Ball Joints and Dust Covers, Brake Lines and Hoses, Brake Linings/Drums and Brake Pads/Discs,"
        ]
      }
    ]
  }
};

const AppContainer = styled("section")`
  display: flex;
`;

function ViewInfo() {}

const DealerSearchWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const SearchControls = styled.div``;

function DealerSearch() {
  let history = useHistory();
  let [vin, setVin] = useState();
  const handleInputChange = event => {
    setVin(event.target.value);
  };
  const handleClick = () => {
    history.push(`/dealer/${vin}`);
  };
  return (
    <DealerSearchWrapper>
      <img width={700} src={homeImage} />
      <SearchControls>
        <h3>Dealer Search</h3>
        <LabeledInput
          placeholder={"Input VIN here"}
          value={vin}
          onChange={handleInputChange}
        />
        <Button onClick={handleClick}>Search</Button>
      </SearchControls>
    </DealerSearchWrapper>
  );
}

const HeyPrettyCommon = styled.div`
  display: flex;
  position: relative;
  width: 80%;
  height: 70px;
  border-radius: 5px;
  margin: 10px;
`;

const HeyPretty = styled(HeyPrettyCommon)`
  border: solid 1.3px #0093fe;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px;
`;

const HeyPrettyCompleted = styled(HeyPretty)`
  border: solid 1.3px #37c392;
  background-color: #effaf7;
  box-shadow: inset rgba(0, 0, 0, 0.16) 0px 0px 1px 0px;
`;

const HeyPrettyLocked = styled(HeyPrettyCommon)`
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

const ActionContainer = styled.div`
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

function Dot({ type, index }) {
  switch (type) {
    case "completed":
      return (
        <DotCompleted>
          <CheckMark />
        </DotCompleted>
      );
    default:
      return <DotStart>{index}</DotStart>;
  }
}

const ServiceDetails = styled.div`
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

const CompletedLabel = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: #2e735c;
`;

const LockedLabel = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: #a8acad;
`;

const CarDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CarModel = styled.h2``;
const Vin = styled.p``;
const Milage = styled.p``;

function Dealer() {
  let { vin } = useParams();

  // if (!vin) {
  // }

  const carDetails = data[vin];
  return (
    <>
      <CarDetails>
        {/* <h3>Car details</h3> */}
        <img src={carDetails.image}></img>
        <CarModel>{carDetails.model}</CarModel>
        <Vin>VIN: {vin}</Vin>
        <Milage>{carDetails.milage} miles</Milage>
      </CarDetails>
      <ServiceDetails>
        <h3>Select a service</h3>
        {carDetails.serviceHistory.map((entry, index) => {
          if (index === 0) {
            return (
              <HeyPrettyCompleted>
                <DotCompleted></DotCompleted>
                <InfoContainer>
                  <TextCompleted>{entry.title}</TextCompleted>
                  <MoreInfoCompleted>More info</MoreInfoCompleted>
                </InfoContainer>
                <ActionContainer>
                  <CompletedLabel>Completed</CompletedLabel>
                </ActionContainer>
                {/* <ul>
              {entry.maintenancePerformed.map(maintenance => (
                <li>{maintenance}</li>
              ))}
            </ul> */}
              </HeyPrettyCompleted>
            );
          } else if (index === 1) {
            return (
              <HeyPretty>
                <DotStart>{index + 1}</DotStart>
                <InfoContainer>
                  <Text>{entry.title}</Text>
                  <MoreInfo>More info</MoreInfo>
                </InfoContainer>
                <ActionContainer>
                  <StartAction>Start</StartAction>
                </ActionContainer>
                {/* <ul>
              {entry.maintenancePerformed.map(maintenance => (
                <li>{maintenance}</li>
              ))}
            </ul> */}
              </HeyPretty>
            );
          }
          return (
            <HeyPrettyLocked>
              <DotLocked>{index + 1}</DotLocked>
              <InfoContainer>
                <TextLocked>{entry.title}</TextLocked>
                <MoreInfo>More info</MoreInfo>
              </InfoContainer>
              <ActionContainer>
                <LockedLabel>Locked</LockedLabel>
              </ActionContainer>
              {/* <ul>
            {entry.maintenancePerformed.map(maintenance => (
              <li>{maintenance}</li>
            ))}
          </ul> */}
            </HeyPrettyLocked>
          );
        })}
      </ServiceDetails>
    </>
  );
}

function FindByVin() {}

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  background-color: #f8f9fe;
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
    history.push("/dealer");
  };
  const onSearchTileClick = () => {
    history.push("/search");
  };
  return (
    <HomeWrapper>
      <img width={700} src={homeImage} />
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

function App() {
  return (
    <Router>
      <AppContainer className="App">
        <Switch>
          <Route exact path="/dealer">
            <DealerSearch />
          </Route>
          <Route path="/dealer/:vin">
            <Dealer />
          </Route>

          <Route path="/users">
            <ViewInfo />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </AppContainer>
    </Router>
  );
}

export default App;
