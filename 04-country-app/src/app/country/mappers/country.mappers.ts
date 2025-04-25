import { CountryResponse, Translation, Languages } from '../interfaces/country-response.interface';
import { Country } from "../interfaces/country.interface"

export class CountryMapper{

  static responseToCountry(resp: CountryResponse): Country {
    return {
  cca2: resp.cca2,
  flag: resp.flag,
  flagSvg: resp.flags.svg,
  name: resp.translations['spa'].common ?? 'No Spanish Translation',
  capital: resp.capital==undefined?'No capital':resp.capital[0],
  population: resp.population,
  region: resp.region,
  coatOfArms: resp.coatOfArms.svg
}
  }

  static mapReponseToCountries(resp: CountryResponse[]):Country[]{
    return resp.map(this.responseToCountry)
  }
  // static CountryResponse[] => Country
}
