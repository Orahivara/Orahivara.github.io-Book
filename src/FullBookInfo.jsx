import useBasket from "./useBasket";

import useFavorities from "./useFavorites";

export default function FullBookInfo({
  book,
  liked,
  buying,
  onToggleBuying,
  onToggleFavorites,
}) {
  const { buyitem, toggle, setStorageError } = useBasket();
  const { favorities, toggleFavorites, storageErrorFavorites } =
    useFavorities();
  return (
    <div>
      <div className="fullbookinfo">
        <div className="fullpicture">
          <img
            src={book.cover}
            alt={book.title}
            style={{ width: "auto", height: "300px" }}
          />
        </div>
        <div className="bookInfo">
          <div className="information">
            <h2>{book.title}</h2>
            <p>{book.author}</p>
            <p>{book.description}</p>
            <p>{book.coverType}</p>
            <p>{book.pages} стр.</p>
            <p>{book.ganer}</p>
            <p>{book.category}</p>
            <p>{book.series}</p>
            <p>{book.year} год</p>
          </div>
          <div className="buyingZone">
            <p></p>
            <button
              className="busket"
              aria-pressed={buying}
              onClick={() => onToggleBuying(book.id)}
            >
              {buying ? "В корзине" : "Добавить в корзину"}
            </button>
            <button
              className="like"
              type="button"
              aria-pressed={liked}
              onClick={() => onToggleFavorites(book.id)}
            >
              {liked ? "♥" : "♡"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
