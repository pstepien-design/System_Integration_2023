import * as fs from "fs";

//read file
fs.readFile("../data/car.txt", "utf-8", (err, data) => {
  if (err) {
    throw err;
  } else {
    // converting data to strings
    const stringData = data;

    //assigning data to the variables
    const [brand, price, availableColors] = stringData
      .split("\n")
      .map((line) => line.trim());

    // creating the car object
    const carDetails = {
      brand,
      price,
      availableColors: availableColors.split(","),
    };

    console.log("TEXT FILE");
    console.log(carDetails);
  }
});
