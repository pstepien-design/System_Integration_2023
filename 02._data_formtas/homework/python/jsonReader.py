import json
with open("../data/car.json") as file:

  data = json.load(file)

  carObject = data

  print('JSON FILE')
  print(carObject)

