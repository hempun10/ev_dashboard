import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const baseUrl = 'http://localhost:8080/api';

export const returnOneOrZero = (value: boolean) => (value ? 1 : 0);

export const returnTrueOrFalse = (value: number) =>
  value === 1 ? true : false;
