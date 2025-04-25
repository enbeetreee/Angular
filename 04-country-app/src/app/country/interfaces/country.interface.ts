import { Flags, Name } from "./country-response.interface";

export interface Country {
  cca2: string;
  flag: string;
  flagSvg: string;
  name: string;
  capital: string;
  population: number;
  region: string;
  coatOfArms: string|undefined,

 }
