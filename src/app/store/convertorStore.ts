/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeObservable, observable, action } from "mobx";
import axios, { AxiosResponse } from "axios";

interface CurrencyRate {
  [key: string]: number;
}

interface CurrencyConversionValues {
  amount: string;
  fromCurrency: string;
  toCurrency: string;
}

export interface Currency {
  currency: string;
  value: number;
}

class ConvertorStore {
  result: string = "";
  error: string = "";
  currencyList: Currency[] = [];

  constructor() {
    makeObservable(this, {
      result: observable,
      error: observable,
      currencyList: observable,
      convertCurrency: action,
      fetchCurrencyData: action,
    });
  }

  convertCurrency = async (values: CurrencyConversionValues): Promise<void> => {
    try {
      const amount: number = Number(values.amount);
      if (isNaN(amount)) {
        throw new Error("Please enter a valid number for the amount.");
      }

      const response: AxiosResponse<any> = await axios.get(
        `https://api.exchangerate-api.com/v4/latest/USD`
      );
      const rates: CurrencyRate = response.data.rates;
      const fromCurrency: string = values.fromCurrency.toUpperCase();
      const toCurrency: string = values.toCurrency.toUpperCase();
      const convertedAmount: number = amount * rates[toCurrency];
      this.result = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(
        2
      )} ${toCurrency}`;
      this.error = "";
    } catch (error: any) {
      console.error("Error converting currency:", error);
      this.result = "";
      this.error =
        error.message || "Error converting currency. Please try again.";
    }
  };

  fetchCurrencyData = async (): Promise<void> => {
    try {
      const response: AxiosResponse<any> = await axios.get(
        "https://api.exchangerate-api.com/v4/latest/USD"
      );
      const currencyData: CurrencyRate = response.data.rates;
      const parsedCurrencies: Currency[] = this.parseCurrencyData(currencyData);
      this.currencyList = parsedCurrencies;
    } catch (error) {
      console.error("Error fetching currency data:", error);
    }
  };
  fetchCurrency = async ({ currency }: any): Promise<void> => {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `https://api.exchangerate-api.com/v4/latest/${currency}`
      );
      const currencyData: CurrencyRate = response.data.rates;
      const parsedCurrencies: Currency[] = this.parseCurrencyData(currencyData);
      this.currencyList = parsedCurrencies;
    } catch (error) {
      console.error("Error fetching currency data:", error);
    }
  };

  private parseCurrencyData = (currencyData: CurrencyRate): Currency[] => {
    const parsedCurrencies: Currency[] = [];
    for (const [currency, value] of Object.entries(currencyData)) {
      parsedCurrencies.push({ currency, value });
    }
    return parsedCurrencies;
  };
}

export const convertorStore: ConvertorStore = new ConvertorStore();
