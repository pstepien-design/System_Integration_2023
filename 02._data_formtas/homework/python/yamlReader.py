import yaml
with open("../data/car.yaml") as file:

  carObject = yaml.load(file, Loader=yaml.FullLoader)

  print('YAML FILE')
  print(carObject)
