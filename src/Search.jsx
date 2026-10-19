import { useContext, useState, useMemo } from "react";
import BookCard from "./BookCard";
import useBooks from "./useBooks";
import useBasket from "./useBasket";
import { SearchContext } from "./SearchContext";
import useFavorities from "./useFavorites";
function Search() {
  const { books } = useBooks();
  const { info } = useContext(SearchContext);
  const searchQuery = info || "";

  const visible = useMemo(() => {
    return books.filter((book) =>
      book.title.toLowerCase().includes(searchQuery.trim().toLowerCase()),
    );
  }, [books, searchQuery]);
  const [selectedGaners, setSelectedGaners] = useState([]);
  const [selectedCovers, setSelectedCovers] = useState([]);
  const [selectedAuthor, setselectedAuthor] = useState([]);
  const [selectedSeries, setselectedSeries] = useState([]);
  const [minimakCost, minCost] = useState([]);
  const [maximalmakCost, maxCost] = useState([]);
  const { buyitem, toggleBuy, storageError } = useBasket();
  const { favorities, toggleFavorites, storageErrorFavorites } =
    useFavorities();
  const ganer = books.reduce((ganer, book) => {
    (ganer[book.ganer] = ganer[book.ganer] || []).push(book);
    return ganer;
  }, {});
  const series = books.reduce((series, book) => {
    (series[book.series] = series[book.series] || []).push(book);
    return series;
  }, {});
  const cost = books.reduce((cost, book) => {
    (cost[book.cost] = cost[book.cost] || []).push(book);
    return cost;
  }, {});
  const author = books.reduce((author, book) => {
    (author[book.author] = author[book.author] || []).push(book);
    return author;
  }, {});
  const coverType = books.reduce((coverType, book) => {
    (coverType[book.coverType] = coverType[book.coverType] || []).push(book);
    return coverType;
  }, {});
  const filtredBooks = useMemo(() => {
    let filterResult = visible;

    if (selectedGaners.length > 0) {
      filterResult = filterResult.filter((book) =>
        selectedGaners.includes(book.ganer),
      );
    }
    if (selectedCovers.length > 0) {
      filterResult = filterResult.filter((book) =>
        selectedCovers.includes(book.coverType),
      );
    }
    if (selectedAuthor.length > 0) {
      filterResult = filterResult.filter((book) =>
        selectedAuthor.includes(book.author),
      );
    }
    if (selectedSeries.length > 0) {
      filterResult = filterResult.filter((book) =>
        selectedSeries.includes(book.series),
      );
      if (minimakCost > 0 || maximalmakCost > 0) {
        if (filterResult.filter)
          filterResult = filterResult.filter((book) =>
            selectedSeries.includes(book.series),
          );
      }
    }
    return filterResult;
  }, [visible, selectedGaners, selectedCovers, selectedAuthor, selectedSeries]);
  const toggleGaner = (ganer) => {
    setSelectedGaners((prev) =>
      prev.includes(ganer) ? prev.filter((g) => g !== ganer) : [...prev, ganer],
    );
  };
  const toggleCover = (coverType) => {
    setSelectedCovers((prev) =>
      prev.includes(coverType)
        ? prev.filter((c) => c !== coverType)
        : [...prev, coverType],
    );
  };

  const toggleAuthor = (author) => {
    setselectedAuthor((prev) =>
      prev.includes(author)
        ? prev.filter((a) => a !== author)
        : [...prev, author],
    );
  };

  const toggleSeries = (series) => {
    setselectedSeries((prev) =>
      prev.includes(series)
        ? prev.filter((s) => s !== series)
        : [...prev, series],
    );
  };
  return (
    <div className="GlobalSearch">
      <div className="filters">
        <div className="filter">
          <h4>Жанр</h4>
          {Object.entries(ganer).map(([ganer]) => (
            <div>
              <input
                type="checkbox"
                checked={selectedGaners.includes(ganer)}
                onChange={() => toggleGaner(ganer)}
              ></input>
              <label>{ganer}</label>
            </div>
          ))}
        </div>

        <div className="filter">
          <h4>Автор</h4>
          {Object.entries(author).map(([author]) => (
            <div>
              <input
                type="checkbox"
                checked={selectedAuthor.includes(author)}
                onChange={() => toggleAuthor(author)}
              ></input>
              <label>{author}</label>
            </div>
          ))}
        </div>
        <div className="filter">
          <h4>Серия</h4>
          {Object.entries(series).map(([series]) => (
            <div>
              <input
                type="checkbox"
                checked={selectedSeries.includes(series)}
                onChange={() => toggleSeries(series)}
              ></input>
              <label>{series}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="search-cards">
        <h2>Все книги</h2>
        <div className="search-card">
          {filtredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              liked={favorities.includes(book.id)}
              buying={buyitem.includes(book.id)}
              onToggleBuying={toggleBuy}
              onToggleFavorites={toggleFavorites}
            />
          ))}
        </div>
      </div>
      ;
    </div>
  );
}

export default Search;
