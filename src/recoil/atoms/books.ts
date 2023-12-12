import { IBook } from "@src/types/IBook";
import { atom } from "recoil";

export const bookState = atom<IBook[]>({
  key: "books", 
  default: [], 
});