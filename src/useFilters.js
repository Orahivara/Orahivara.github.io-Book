import { useContext } from "react";
import BookCard from "./BookCard";

import { SearchContext } from "./SearchContext";
import useBooks from "./useBooks";
export default function useFilter() {
  const { books } = useBooks();
  const { info } = useContext(SearchContext);
  const filtred = books.filter(
    (book) => book.series && book.title.include(info),
  );
  return filtred;
}
