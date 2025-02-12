import { registerEnumType } from '@nestjs/graphql';

export enum CurrencyType {
  EUR = 'EUR', // Euro
  USD = 'USD', // US Dollar
  XOF = 'XOF', // Franc CFA (UEMOA - Afrique de l'Ouest)
  XAF = 'XAF', // Franc CFA (CEMAC - Afrique Centrale)
  GBP = 'GBP', // British Pound Sterling
  JPY = 'JPY', // Japanese Yen
  CHF = 'CHF', // Swiss Franc
  CAD = 'CAD', // Canadian Dollar
  AUD = 'AUD', // Australian Dollar
  CNY = 'CNY', // Chinese Yuan
  HKD = 'HKD', // Hong Kong Dollar
  SGD = 'SGD', // Singapore Dollar
  INR = 'INR', // Indian Rupee
  RUB = 'RUB', // Russian Ruble
  BRL = 'BRL', // Brazilian Real
  ZAR = 'ZAR', // South African Rand
  NGN = 'NGN', // Nigerian Naira
  GHS = 'GHS', // Ghanaian Cedi
  KES = 'KES', // Kenyan Shilling
  MAD = 'MAD', // Moroccan Dirham
  EGP = 'EGP', // Egyptian Pound
  TND = 'TND', // Tunisian Dinar
  AED = 'AED', // UAE Dirham
  SAR = 'SAR', // Saudi Riyal
  MXN = 'MXN', // Mexican Peso
  KRW = 'KRW', // South Korean Won
  NZD = 'NZD', // New Zealand Dollar
  SEK = 'SEK', // Swedish Krona
  NOK = 'NOK', // Norwegian Krone
  DKK = 'DKK', // Danish Krone
}

registerEnumType(CurrencyType, {
  name: 'CurrencyType',
  description: 'Available currency types for transactions',
});