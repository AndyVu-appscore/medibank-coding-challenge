import axios from "axios";

// get cats
export const getPets = async () => {
  let femaleOwnerPets = [];
  let maleOwnerPets = [];

  await axios
    .get(
      "https://gist.githubusercontent.com/medibank-digital/a1fc81a93200a7b9d5f8b7eae0fac6f8/raw/de10a4fcf717e6c431e88c965072c784808fd6b2/people.json"
    )
    .then((res) => {
      if (res.data?.length > 0) {
        res.data.forEach((owner) => {
          if (owner.pets && owner.pets.length > 0) {
            if (owner.gender === "Male") {
              maleOwnerPets = [...maleOwnerPets, ...owner.pets];
            } else {
              femaleOwnerPets = [...femaleOwnerPets, ...owner.pets];
            }
          }
        });
      }
    })
    .catch((err) => console.log(err));

  femaleOwnerPets = femaleOwnerPets.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  maleOwnerPets = maleOwnerPets.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  return {
    femaleOwnerPets: femaleOwnerPets,
    maleOwnerPets: maleOwnerPets,
  };
};
