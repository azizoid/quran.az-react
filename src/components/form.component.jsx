import React, { useRef } from "react";

import translatorList from "../assets/translatorList.js";
import soorahList from "../assets/soorahList.js";

const DEFAULT_TRANSLATOR = process.env.REACT_APP_DEFAULT_TRANSLATOR;

const SearchForm = ({
  onSubmit,
  form = { s: 0, a: "", t: DEFAULT_TRANSLATOR, q: "" },
}) => {
  const soorahRef = useRef(form.s);
  const ayahRef = useRef(form.a);
  const translatorRef = useRef(form.t);
  const queryRef = useRef(form.q);
  const viewRef = useRef("empty");

  const onHandleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "soorah":
        soorahRef.current.value = value;
        ayahRef.current.value = null;
        queryRef.current.value = "";
        viewRef.current = name;
        break;
      case "ayah":
        ayahRef.current.value = value;
        queryRef.current.value = "";
        viewRef.current = name;
        break;
      case "query":
        if (value.length > 3) {
          soorahRef.current.value = 0;
          ayahRef.current.value = "";
          queryRef.current.value = value;
          viewRef.current = name;
        }
        break;
      case "translator":
        translatorRef.current.value = value;
        break;
      default:
    }
  };

  const onSearch = (event) => {
    event.preventDefault();

    const form = {
      s: soorahRef.current.value,
      a: ayahRef.current.value,
      t: translatorRef.current.value,
      q: queryRef.current.value,
      view: viewRef.current,
    };

    onSubmit(form);
  };

  return (
    <form
      id="search"
      className="card card-header"
      acceptCharset="UTF-8"
      onSubmit={onSearch}
    >
      <div className="form-group row">
        <div className="input-group-prepend col-4">
          <select
            className="form-control btn-outline-success"
            name="soorah"
            defaultValue={form.s}
            onChange={onHandleChange}
            ref={soorahRef}
          >
            {soorahList.map((soorah, index) => (
              <option value={index} key={index}>
                {soorah}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group col-3">
          <input
            type="number"
            placeholder="Ayə"
            className="form-control"
            size={3}
            maxLength={3}
            min={1}
            max={286}
            name="ayah"
            defaultValue={form.a}
            onChange={onHandleChange}
            ref={ayahRef}
          />
        </div>
        <div className="input-group-prepend col-5">
          <select
            className="form-control btn-outline-success"
            name="translator"
            defaultValue={form.t}
            onChange={onHandleChange}
            ref={translatorRef}
          >
            {translatorList.map((t, index) => (
              <option value={index} key={index}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group row">
        <div className="input-group-prepend col-7">
          <input
            type="text"
            placeholder="Kəlmə"
            className="form-control"
            name="query"
            defaultValue={form.q}
            onChange={onHandleChange}
            ref={queryRef}
          />
        </div>
        <div className="input-group-append col-5">
          <button className="btn btn-success form-control" type="submit">
            Axtar
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
