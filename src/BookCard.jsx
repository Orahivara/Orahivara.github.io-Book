import { useState } from "react";
import FullBookInfo from "./FullBookInfo";
import useBooks from "./useBooks";
import useFavorities from "./useFavorites";
import useBasket from "./useBasket";
export default function BookCard({
  book,
  liked,
  buying,
  onToggleBuying,
  onToggleFavorites,
}) {
  false;
  const [modalOpen, setIsModalOpen] = useState(false);
  const { buyitem, toggleBuy, storageError } = useBasket();
  const { favorities, toggleFavorites, storageErrorFavorites } =
    useFavorities();
  return (
    <>
      <article className="book">
        <div className="up">
          <div className="picture">
            <img
              onClick={() => setIsModalOpen(true)}
              src={book.cover}
              alt={book.title}
              style={{ width: "auto", height: "300px" }}
            />
          </div>
        </div>
        <div className="book-info">
          <p className="coverType">{book.coverType}</p>
          <p className="price">{book.cost} ₽</p>
          <p className="title" onClick={() => setIsModalOpen(true)}>
            {book.title}
          </p>
          <p className="author">{book.author}</p>
          <div className="reacts">
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
      </article>
      {modalOpen && (
        <div
          className="book-modal-overlay"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <FullBookInfo
              key={book.id}
              book={book}
              buying={buying}
              liked={liked}
              onToggleBuying={onToggleBuying}
              onToggleFavorites={onToggleFavorites}
            />
          </div>
        </div>
      )}
    </>
  );
}
