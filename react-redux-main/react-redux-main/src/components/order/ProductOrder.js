import React, { useEffect, useState } from "react";
import viewType from "../../actions/index";
import Tick from "../../image/tick.png";
import "./ProductOrder.css";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import translate from "../../intl/translate";

function ProductOrder({ setShowProductData, productMain }) {
  //   const [{ setShowProductData, productMain }] = props;
  const [qty, setQty] = useState(1);
  const [productOfVariant, setProductOfVariant] = useState({});
  const [productExtras, setProductExtras] = useState([]);
  const [productPrice, setProductPrice] = useState(0);
  const [category, setCategory] = useState("");
  const categories = useSelector((state) => state.data?.categories);
  const [product, setProduct] = useState({
    name: productMain.name,
    totalPrice: productMain.price,
    qty,
    extras: [],
    variant: "",
    category,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (productMain.variants !== undefined) {
      setProductOfVariant(productMain.variants[0]);
    }
    const category = categories.find((cate) => cate.id == productMain.parentId);
    const mainCate = categories.find((cate) => cate.id == category.parent);
    setCategory(mainCate.name);
  }, []);

  function handleOrder() {
    if (
      productMain.variants !== undefined &&
      productMain.extras !== undefined
    ) {
      dispatch(
        viewType.Basket.addDataToBasket({
          ...product,
          qty,
          category,
          extras: productExtras,
          variant: productOfVariant.name,
          totalPrice: qty * (productPrice + productOfVariant.price),
        })
      );
      setProduct({
        ...product,
        qty,
        category,
        extras: productExtras,
        variant: productOfVariant.name,
        totalPrice: qty * (productPrice + productOfVariant.price),
      });
    } else if (
      productMain.variants === undefined &&
      productMain.extras === undefined
    ) {
      dispatch(
        viewType.Basket.addDataToBasket({
          ...product,
          qty,
          category,
          totalPrice: qty * productMain.price,
        })
      );
      setProduct({
        ...product,
        qty,
        category,
        totalPrice: qty * productMain.price,
      });
    } else if (productMain.variants === undefined) {
      dispatch(
        viewType.Basket.addDataToBasket({
          ...product,
          qty,
          category,
          extras: productExtras,
          totalPrice: qty * (productPrice + productMain.price),
        })
      );
      setProduct({
        ...product,
        qty,
        category,
        extras: productExtras,
        totalPrice: qty * (productPrice + productMain.price),
      });
    } else if (productMain.extras === undefined) {
      dispatch(
        viewType.Basket.addDataToBasket({
          ...product,
          qty,
          category,
          variant: productOfVariant.name,
          totalPrice: qty * productOfVariant.price,
        })
      );
      setProduct({
        ...product,
        qty,
        category,
        variant: productOfVariant.name,
        totalPrice: qty * productOfVariant.price,
      });
    }

    setShowProductData(false);
  }

  function handleCloseModalButton() {
    setShowProductData(false);
  }

  function handleOnChangeOnVariant(e) {
    const mainVariant = productMain.variants.find(
      (variant) => variant.name == e.target.value
    );
    setProductOfVariant(mainVariant);
  }

  const handleOnChangeOnExtras = (e) => {
    const { value, checked } = e.target;

    const onChangeProduct = productMain.extras.find(
      (extra) => extra.name == value
    );

    if (checked) {
      setProductExtras([...productExtras, onChangeProduct]);
      setProductPrice(productPrice + onChangeProduct.price);
    } else {
      setProductExtras([
        ...productExtras.filter((extra) => extra.name !== value),
      ]);
      setProductPrice(productPrice - onChangeProduct.price);
    }
  };

  return (
    <div className="modal">
      <div className="content">
        <div className="contentname">
          <h1 className="h1teg">{productMain.name}</h1>
          <button className="btn active" onClick={handleCloseModalButton}>
            X
          </button>
        </div>

        <hr className="hashmain" />

        {productMain.variants && (
          <>
            <div className="variant">
              <h1 className="h2teg">{translate("pm.size")}</h1>

              {productMain.variants.map((variant, index) => (
                <div key={index} className="box">
                  <input
                    className="img_print"
                    type="radio"
                    id={variant.name}
                    name="variant"
                    value={variant.name}
                    checked={productOfVariant == variant}
                    onChange={handleOnChangeOnVariant}
                  />
                  <label className="variant-name" htmlFor={variant.name}>
                    {variant.name}
                  </label>
                  <label className="variant-price" htmlFor={variant.name}>
                    £{variant.price}
                  </label>
                </div>
              ))}
            </div>

            <hr className="hashmain" />
          </>
        )}

        {productMain.extras && (
          <>
            <div className="options">
              <h1 className="h3teg">{translate("pm.options")}</h1>

              {productMain.extras.map((extra, index) => (
                <div key={index} className="option__box">
                  <label htmlFor={extra.name}>
                    {extra.name} (+ £{extra.price})
                  </label>
                  <div className="checkbox">
                    <input
                      className="input1"
                      type="checkbox"
                      id={extra.name}
                      name={extra.name}
                      value={extra.name}
                      onChange={handleOnChangeOnExtras}
                    />
                    <div className="checkbox__img">
                      <img className="img_1" src={Tick} alt="Tick" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <hr className="hashmain" />
          </>
        )}

        <div className="content__qty">
          <button
            className="btn active"
            onClick={() => qty > 1 && setQty(qty - 1)}
          >
            -
          </button>
          <h1 className="qty">{qty}</h1>
          <button className="btn active" onClick={() => setQty(qty + 1)}>
            +
          </button>
        </div>

        <div className="content__btn">
          <button className="btt" onClick={handleOrder}>
            {translate("btn.addtoorder")}
          </button>
        </div>
      </div>
    </div>
  );
}
ProductOrder.propTypes = {
  setShowProductData: PropTypes.func,
  productMain: PropTypes.object,
};

export default ProductOrder;
