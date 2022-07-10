import React from "react";
import viewType from "../../actions/index";
import "./ConfirmOrder.css";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import translate from "../../intl/translate";

function ConfirmOrder({ showConfirmModal, setShowConfirmModal }) {
  const dispatch = useDispatch();
  const history = useHistory();

  function handlePlaceOrder() {
    dispatch(viewType.Basket.clearBasket());
    history.push("/");
  }

  return (
    <>
      <div
        className={showConfirmModal ? "cmodal animated__cmodal" : "cmodal"}
      ></div>
      <div
        className={
          showConfirmModal
            ? "cmodal__content animated__cmodal__content"
            : "cmodal__content"
        }
      >
        <div className="cmodal__content__name">
          <h1>{translate("cm.title")}</h1>
          <img
            src="https://img.icons8.com/color/2x/facebook-like--v3.gif"
            alt="like"
          />
          <h3>{translate("cm.p")}</h3>

          <div className="cmodal__content__name__buttons">
            <button
              className="button"
              onClick={() => setShowConfirmModal(false)}
            >
              {translate("cm.cancel")}
            </button>
            <button className="button  active" onClick={handlePlaceOrder}>
              {translate("cm.placeOrder")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

ConfirmOrder.propTypes = {
  showConfirmModal: PropTypes.bool,
  setShowConfirmModal: PropTypes.func,
};

export default ConfirmOrder;
