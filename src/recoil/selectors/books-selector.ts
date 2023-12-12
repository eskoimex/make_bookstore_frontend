import { selector } from "recoil";
import { bookState } from "../atoms/books";

export const bookSelector = selector({
  key: "booksState", 
  get: ({ get }) => {
    const books = get(bookState);
    return books;
  },
});