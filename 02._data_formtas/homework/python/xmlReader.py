import xml.etree.ElementTree as ET
with open("../data/car.xml") as file:

    data = ET.fromstring(file.read())

carObject = {
"brand": data.find("brand").text,
"price": data.find("price").text,
"availableColors": [color.text for color in data.find("availableColors")],
}

print('XML FILE')
print(carObject)
