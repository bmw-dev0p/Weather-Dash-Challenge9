import fs from 'fs/promises';

// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;
  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
   private async read() {
    return await fs.readFile('db/searchHistory.json', {
      flag: 'a+',
      encoding: 'utf8',
    });
   }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    const newFile = await fs.writeFile('db/searchHistory.json', JSON.stringify(cities, null, '\t')); // '\t' is for tab spacing
    return newFile;
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    const cities = await this.read();
    let emptyCity: City[] = [];
    const parsedCities = emptyCity.concat(JSON.parse(cities));
    return parsedCities;
}
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(name: string, id: string) {
    const newCity: City = {
      name: name,
      id: id,
    };
    const existingCities = await this.getCities();
    const totalCities = existingCities.concat(newCity);
    await this.write(totalCities);
  }

  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    console.log('id: ', id);
    let existingCities = await this.getCities()
    existingCities = existingCities.filter((city) => city.id != id);
    console.log('existingCities: ', existingCities);
    await this.write(existingCities);
  }
}


export default new HistoryService();
