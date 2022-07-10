import React, { useEffect, useState } from "react";
import ConfirmOrder from "../confirmorder/ConfirmOrder";
import LeftArrow from "../../image/left-arrow.png";
import More from "../../image/more.png";
import "./Basket.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import translate from "../../intl/translate";

function Basket() {
  const basket = useSelector((state) => state.basket.products);
  const categories = useSelector((state) => state.data?.categories);
  const history = useHistory();
  const [randomNumber, setRandomNumber] = useState(0);
  useEffect(() => {
    setRandomNumber(Math.floor(Math.random() * (30 - 1 + 1)) + 1);
  }, []);

  // NOTE: Get Total Price and Total Product Items
  const [totalBasketPrice, setTotalBasketPrice] = useState(0);
  useEffect(() => {
    const tBasketPrice = basket.reduce((acu, curr) => {
      return acu + parseFloat(curr.totalPrice);
    }, 0);
    setTotalBasketPrice(tBasketPrice);
  }, [basket]);

  // NOTE: Get main categories
  const [mainCategories, setMainCategories] = useState([]);
  useEffect(() => {
    setMainCategories(categories.filter((category) => category.parent == null));
  }, []);

  // NOTE: Handle Back Button
  function handleBackButton() {
    history.push("/");
  }

  // NOTE: show confirm modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // NOTE: Filter products category wise
  const [fProducts, setFProducts] = useState([]);
  useEffect(() => {
    const filterProd = [];
    mainCategories.map(
      (category) =>
        (filterProd[category.name] = {
          products: basket.filter(
            (product) => product.category == category.name
          ),
        })
    );
    setFProducts(filterProd);
  }, [mainCategories]);

  return (
    <div className="basket">
      <div className="header">
        <img
          className="images"
          src={LeftArrow}
          alt="LeftArrow"
          onClick={handleBackButton}
        />
        <h1 className="hhh1">{translate("title.checkout")}</h1>
        <img className="images" src={More} alt="More" />
      </div>

      <div className="top">
        <div className="basket-top__desc">
          <h1 className="hhh2">Kempston Hammers Sports & Social Club</h1>
          <p className="ppp1">
            134 High Street, Kempston, Bedford, Bedfordshire, MK42 7BN
          </p>
        </div>

        {basket.length == 0 ? (
          <div className="nobasket">
            <h4>YOUR BASKET IS EMPTY,YOU NOT SELECT ANY OF PRODUCTS</h4>
          </div>
        ) : (
          <>
            <div className="list">
              {Object.keys(fProducts).map((category, index) => (
                <div key={index}>
                  {fProducts[category].products.length !== 0 && (
                    <h1 className="category-cap">
                      {category.toLowerCase()} (
                      {fProducts[category].products.reduce((acc, cur) => {
                        return acc + cur.qty;
                      }, 0)}
                      )
                    </h1>
                  )}
                  {fProducts[category].products.map((product) => {
                    return (
                      <div className="basket-top__list-item" key={product.id}>
                        <div className="basket-top__list-item__left">
                          <h1 className="hhh3">
                            {product.qty} x {product.name}
                          </h1>
                          <p className="ppp2">
                            {product.variant !== "" && product?.variant}
                            {""}
                            {product.extras.map((extra, index) => (
                              <span key={index}>
                                {product?.variant !== ""
                                  ? `, ${extra?.name}`
                                  : extra?.name}
                              </span>
                            ))}
                          </p>
                        </div>
                        <div className="basket-top__list-item__right">
                          <h1 className="hhh4">£{product.totalPrice}</h1>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            <hr className="hrbasket" />
          </>
        )}

        {basket.length == 0 ? (
          <div className="basket-top__addnotes"></div>
        ) : (
          <>
            <div className="basket-top__addnotes">
              <label htmlFor="addnote">{translate("basket.notes")}</label>
              <textarea name="addnote" id="addnote"></textarea>
            </div>
            <hr className="hrbasket" />
          </>
        )}
      </div>

      {basket.length == 0 ? (
        <div className="basket-middle"></div>
      ) : (
        <div className="basket-middle">
          <h1>
            {translate("basket.table")}{" "}
            <span className="basket-middle-number">{randomNumber}</span>
          </h1>
        </div>
      )}

      {basket.length == 0 ? (
        <div className="basket-bottom" onClick={handleBackButton}>
          <h3>BACK TO PAGE</h3>
        </div>
      ) : (
        <div
          className="basket-bottom"
          onClick={() => setShowConfirmModal(true)}
        >
          <h1>CONFIRM ORDER</h1>
          <h1>
            £{totalBasketPrice.toFixed(2)} / {basket.length}{" "}
            {translate("btn.item")}
          </h1>
        </div>
      )}

      <ConfirmOrder
        showConfirmModal={showConfirmModal}
        setShowConfirmModal={setShowConfirmModal}
      />
    </div>
  );
}

Basket.propTypes = {
  showChangeLangModal: PropTypes.bool,
  setShowChangeLangModal: PropTypes.func,
};

export default Basket;
