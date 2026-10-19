import { useState } from "react";
import { useContext } from "react";
import Basket from "./Basket";
import BanersScrolling from "./BanersScroling";
import BookCard from "./BookCard";
import useBooks from "./useBooks";
import useBaners from "./useBaners";
import Banners from "./Baners";
import useBasket from "./useBasket";
import { Link } from "react-router-dom";
import useFavorities from "./useFavorites";
function Home() {
  const { books } = useBooks();
  const { baners } = useBaners();
  const [query, setQuery] = useState("");
  const { buyitem, toggleBuy, storageError } = useBasket();
  const { favorities, toggleFavorites, storageErrorFavorites } =
    useFavorities();
  const visible = books.filter((book) =>
    book.title.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const bloks = books.reduce((series, book) => {
    (series[book.series] = series[book.series] || []).push(book);
    return series;
  }, {});
  return (
    <main className="home">
      <div className="mainpage">
        <div className="burger-menu">
          <ul>
            <li className="menuItem">
              <a>Книги</a>
            </li>
            <li className="menuItem">
              <a>Канцтовары</a>
            </li>
            <li className="menuItem">
              <a>Подборки</a>
            </li>
            <li className="menuItem">
              <a>Издательство</a>
            </li>
          </ul>
        </div>

        <BanersScrolling>
          {baners.map((baner) => (
            <Banners key={baner.id} baner={baner} />
          ))}
        </BanersScrolling>

        <div className="cards">
          <div className="head-series-card">
            <h2>Все книги</h2>
            <Link to="/search">
              <button className="watchall">Смотреть всё ➦</button>
            </Link>
          </div>
          <div className="none-seriescard">
            {visible.map((book) => (
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

        {Object.entries(bloks).map(([series]) => (
          <div className="series-card">
            <div className="head-series-card">
              <h2>{series}</h2>
              <Link to="/search">
                <button className="watchall">Смотреть всё ➦</button>
              </Link>
            </div>

            <div className="card">
              {visible
                .filter((book) => book.series === series)
                .map((book) => (
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
        ))}
        <div className="footer">
          <p>
            Лицензия № 46097 123308, г. Москва, Ул. Зорге, д.1, стр.1. +7 (495)
            411-68-86
          </p>
        </div>
      </div>
    </main>
  );
}
export default Home;
