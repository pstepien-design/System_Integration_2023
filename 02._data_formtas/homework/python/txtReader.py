with open("../data/car.txt") as file:

  data = file.read()

  brand, price, availableColors = data.strip().split("\n")

  carObject = {
    "brand": brand,
    "price": price,
    "availableColors": availableColors.split(',')
  }

  print('TXT FILE')
  print(carObject)


