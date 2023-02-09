import csv
with open("../data/car.csv") as file:

  data = csv.DictReader(file)

  carObject = [
        {
            "brand": row["brand"],
            "price": row["price"],
            "availableColors": row["availableColors"].split(","),
        }
        for row in data
    ]
      
  print('CSV FILE')
  print(carObject)