import axios, { all, Axios, AxiosError, type AxiosResponse } from "axios";

export type CountryType = {
  name: string;
  flag: string;
  code: string;
  all? : string | null;
  cca2? : string | null;
  cca3? : string | null
};



export const activeCountries = (allCountries : CountryType[] , activeCode : string) : CountryType  =>{
    let countryData : CountryType = {
        name: "",
        flag:"",
        code: "",
        cca2: "",
        cca3: "",
        all: ""
    };

    for(let i = 0; i < allCountries.length; i++){
        if(allCountries[i].code == activeCode){
          console.log("allCountries[i] => ",allCountries[i])
            countryData = allCountries[i];
        }
    }

    return countryData;
}