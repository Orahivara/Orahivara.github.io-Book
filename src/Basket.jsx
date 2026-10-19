import { useState } from "react";
import { useContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import BanersScrolling from "./BanersScroling";
import BookCard from "./BookCard";
import useBooks from "./useBooks";

import useBasket from "./useBasket";

import useFavorities from "./useFavorites";
function Basket() {
  const { books } = useBooks();
  const [modalOpen, setIsModalOpen] = useState(false);
  const { buyitem, toggleBuy, storageError } = useBasket();
  const { favorities, toggleFavorites, storageErrorFavorites } =
    useFavorities();
  const visible = books.filter((book) => buyitem.includes(book.id));
  return (
    <>
      <div className="BusketPage">
        <div className="busketspace">
          <h2>Корзина</h2>
          <div className="cheklist">
            <div className="cards">
              <div className="none-seriescard">
                {visible.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    liked={favorities.includes(book.id)}
                    buying={buyitem.includes(book.id)}
                    onToggleBuying={toggleBuy}
                    ontoggleFavorites={toggleFavorites}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="score">
            <p>Колличество:{buyitem.length}</p>
            <p>Скидка</p>
            <p className="totalScore">
              Итог: {visible.reduce((sum, book) => sum + book.cost, 0)} ₽
            </p>
            <hr></hr>
            <button
              className="order"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Оформить заказ
            </button>
          </div>
        </div>
      </div>
      {modalOpen && (
        <div
          className="book-modal-overlay"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <div className="succsessWindow">
              <h4>Успешно</h4>
              <p>Спасибо за заказ. Ждём вас снова.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Basket;
