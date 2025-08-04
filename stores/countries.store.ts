import { defineStore } from "pinia";
import axios from "axios";
import type { CountryType } from "~/helpers/data-countries";

interface State {
  allCountries: CountryType[];
  found: boolean;
}

const useCountryStore = defineStore("use-countries-store", {
  persist: true,

  state: (): State => ({
    allCountries: [],
    found: false,
  }),

  getters: {
    defaultCountry(): CountryType {
      return {
        name: "Cameroon",
        cca3: "CMR",
        cca2: "CM",
        flag: "",
        code: "+237",
        all: "(+237) CMR",
      };
    },
  },

  actions: {
    async getAllCountries() {
      try {
        const response = await axios.get(
          "https://restcountries.com/v3.1/subregion/Middle%20Africa"
        );

        const countries: CountryType[] = response.data.map((country: any) => ({
          name: country.name.common,
          cca2: country.cca2,
          cca3: country.cca3,
          flag: country.flags?.svg || "",
          code: (country.idd?.root || "") + (country.idd?.suffixes?.[0] || ""),
          all: `(${
            (country.idd?.root || "") + (country.idd?.suffixes?.[0] || "")
          }) ${country.cca3}`,
        }));

        this.allCountries = countries;
      } catch (error) {
        console.error("Failed to fetch countries", error);
      } finally {
        this.found = this.allCountries.length > 0;

        // Si vide, fallback sur default
        if (!this.found) {
          this.allCountries.push(this.defaultCountry);
        }
      }
    },

    getCountryFromCode(code: string) {
      const country = this.allCountries.find((u) => u.code == code);
      return country?.name ?? "Cameroon";
    },
  },
});

export default useCountryStore;
