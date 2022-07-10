import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import "./ChangeLangModal.css";
import { LOCALES } from "../intl";
import viewType from "../actions";



function ChangeLangModal({ setShowChangeLangModal, showChangeLangModal }) {
  const dispatch = useDispatch();

  const lang = useSelector((state) => state.lang);

  function handleLanguage(lang) {
    setShowChangeLangModal(false);
    dispatch(viewType.langAction.setLang(lang));
  }

  return (
    <>
      <div
        className={
          showChangeLangModal ? "langmodal langmodal__animated" : "langmodal"
        }
        onClick={() => setShowChangeLangModal(false)}
      ></div>
      <div
        className={
          showChangeLangModal
            ? "langmodal__content langmodal__content__animated"
            : "langmodal__content"
        }
      >
        <div className="langmodal__content__name">
          <h1 className="chooselang">Choose Language</h1>
          <button
            className={lang == LOCALES.ENGLISH ? "button active" : "button"}
            onClick={() => handleLanguage(LOCALES.ENGLISH)}
          >
            <h3 className="english">English</h3>
          </button>
          <button
            className={lang == LOCALES.GERMAN ? "button active" : "button"}
            onClick={() => handleLanguage(LOCALES.GERMAN)}
          >
            <h3 className="germam">German</h3>
          </button>
          <button
            className={lang == LOCALES.JAPANESE ? "button active" : "button"}
            onClick={() => handleLanguage(LOCALES.JAPANESE)}
          >
            <h3>Jpanese</h3>
          </button>
        </div>
      </div>
    </>
  );
}

ChangeLangModal.propTypes = {
  setShowChangeLangModal: PropTypes.func,
  showChangeLangModal: PropTypes.bool,
};

export default ChangeLangModal;
