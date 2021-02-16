import React, { useEffect, useState } from "react";
import { getPets } from "./api/cats";
import styled, { keyframes } from "styled-components";

// style
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        oapcity: 1;
    }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
`;

const PetsWrapper = styled.div`
  animation: ${fadeIn} 1s ease;
`;

const OwnerGenderHeading = styled.h2`
  color: ${({ $blue }) => ($blue ? "#194260" : "#BB71A9")};
  margin-bottom: 0.5rem;
`;

const PetList = styled.ul`
  list-style: none;
  min-width: 300px;
  padding: 1rem;
  background: ${({ $blue }) => ($blue ? "#194260" : "#BB71A9")};
  color: white;
  margin: 0;

  li {
    padding: 0 1rem;
    &:not(:last-child) {
      border-bottom: 1px solid rgba(255, 255, 255, 0.5);
      margin-bottom: 0.5rem;
      padding-bottom: 0.5rem;
    }
  }
`;

const LoadingSpinner = styled.div`
  border: 7px solid #f3f3f3; /* Light grey */
  border-top: 7px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 35px;
  height: 35px;
  animation: ${spin} 1s linear infinite;
`;

function App() {
  const [pets, setPets] = useState(null);

  useEffect(() => {
    getPets().then((res) => setPets(res));
  }, []);

  return (
    <Wrapper>
      {pets ? (
        <PetsWrapper>
          {pets.femaleOwnerPets && pets.femaleOwnerPets.length > 0 && (
            <>
              <OwnerGenderHeading>Female</OwnerGenderHeading>

              <PetList>
                {pets.femaleOwnerPets.map(
                  (pet, index) =>
                    pet.type === "Cat" && <li key={index}>{pet.name}</li>
                )}
              </PetList>
            </>
          )}

          {pets.maleOwnerPets && pets.maleOwnerPets.length > 0 && (
            <>
              <OwnerGenderHeading $blue>Male</OwnerGenderHeading>

              <PetList $blue>
                {pets.maleOwnerPets.map(
                  (pet, index) =>
                    pet.type === "Cat" && <li key={index}>{pet.name}</li>
                )}
              </PetList>
            </>
          )}
        </PetsWrapper>
      ) : (
        <LoadingSpinner />
      )}
    </Wrapper>
  );
}

export default App;
