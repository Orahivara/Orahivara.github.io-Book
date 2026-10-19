import { createContext, useContext, useState } from "react";
import Search from "./Search";
import Basket from "./Basket";
import { SearchContext } from "./SearchContext";
import Home from "./Home";
import useBuy from "./useBasket";
import Likes from "./Likes";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

export default function App() {
  const [info, setInfo] = useState("");

  return (
    <SearchContext.Provider value={{ info, setInfo }}>
      <div>
        <BrowserRouter>
          <Head />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/search" element={<Search />} />
            <Route path="/likes" element={<Likes />} />
          </Routes>
        </BrowserRouter>
      </div>
    </SearchContext.Provider>
  );
}

function Head() {
  const [quary, SetQuuary] = useState("");
  const navigate = useNavigate();
  const { setInfo } = useContext(SearchContext);
  return (
    <div className="header">
      <div className="logosearch">
        <Link to="/">
          <div className="logo">
            <img
              className="logoword"
              src="https://allwebs.ru/images/2026/10/16/4aa60c8f5ee74ad0b98a5b2e62400442.png"
            ></img>

            <p className="alterlogo">Читай вместе с нами</p>
          </div>
        </Link>

        <div className="searchinstrument">
          <Link to="/search">
            <button className="catalog">Каталог</button>
          </Link>
          <span className="search">
            <input
              className="stroke"
              id="stroke"
              placeholder="Найти книгу"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setInfo(e.target.value);
                  navigate("/search");
                }
              }}
              onChange={(event) => SetQuuary(event.target.value)}
            ></input>
            <svg
              onClick={() => {
                setInfo(quary);
                navigate("/search");
              }}
              className="loop"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="20"
              viewBox="0 0 50 50"
            >
              <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
            </svg>
          </span>
        </div>
      </div>
      <nav className="icons">
        <Link to="/likes">
          <svg
            width="40"
            height="40"
            version="1.1"
            id="_x32_"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 512 512"
            xml:space="preserve"
          >
            <style type="text/css"></style>
            <g>
              <path
                class="st0"
                d="M379.59,0.078c-44.845,2.717-58.493,43.527-52.997,89.682c13.586,114.144-20.275,140.745-20.275,140.745
		h-21.737c0-36.685,5.318-165.199-39.518-197.822c-44.845-32.605-93.761,12.24-73.378,65.228
		c20.383,52.997,47.669,136.673,35.437,148.906c0,0-28.534,4.079-57.45,73.066c-6.726,16.035-21.781,26.138-35.072,36.07
		c-2.566-0.704-5.247-1.105-8.036-1.105c-16.882,0-30.574,13.683-30.574,30.574c0,13.897,9.283,25.612,21.986,29.326
		c40.088,79.357,111.792,89.138,153.306,97.049c211.985,8.152,154.241-232.368,154.241-232.368
		C470.813,42.652,416.435-2.158,379.59,0.078z M265.552,363c-11.261,0-20.383-9.122-20.383-20.383
		c0-11.26,9.122-20.383,20.383-20.383c11.26,0,20.383,9.122,20.383,20.383C285.935,353.877,276.813,363,265.552,363z"
              />
            </g>
          </svg>
        </Link>
        <span className="favorites">
          <Link to="/likes">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              width="43px"
              height="43px"
            >
              {" "}
              <path d="M25,27l-9-6.75L7,27V4h18V27z" />
            </svg>
          </Link>
          <span className="favorites-label">
            <svg
              width="22px"
              height="22px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="#D3262F"
              />
            </svg>
          </span>
        </span>
        <span></span>
        <Link to="/basket">
          <svg
            width="40"
            height="40"
            fill="#000000"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            class="icon"
          >
            <path d="M832 312H696v-16c0-101.6-82.4-184-184-184s-184 82.4-184 184v16H192c-17.7 0-32 14.3-32 32v536c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V344c0-17.7-14.3-32-32-32zm-208 0H400v-16c0-61.9 50.1-112 112-112s112 50.1 112 112v16z" />
          </svg>

          <span className="favorites-label-busket">
            <svg
              fill="#D3262F"
              width="34px"
              height="34px"
              viewBox="0 0 32 32"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>diamonds</title>
              <path d="M16.050 5.438l8.537 10.501-8.537 10.501-8.537-10.501 8.537-10.501z"></path>
            </svg>
          </span>
        </Link>
      </nav>
    </div>
  );
}
