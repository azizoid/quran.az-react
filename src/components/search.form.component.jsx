import React, { useState } from "react";
import { Form } from "react-bootstrap";

import translatorList from "../assets/translatorList.js";
import soorahList from "../assets/soorahList.js";

const DEFAULT_TRANSLATOR = process.env.REACT_APP_DEFAULT_TRANSLATOR;

const SearchForm = ({ onSubmit, formData = {} }) => {
  const [form, setForm] = useState({
    s: 0,
    a: "",
    t: DEFAULT_TRANSLATOR,
    q: "",
    view: "empty",
    ...formData,
  });

  const onSoorahChange = (soorah) => {
    setForm((prev) => {
      return { ...prev, s: soorah, a: "", q: "", view: "soorah" };
    });
  };

  const onAyahChange = (ayah) => {
    setForm((prev) => {
      return { ...prev, a: ayah, view: "ayah" };
    });
  };

  const onTranslatorChange = (translator) => {
    setForm((prev) => {
      return { ...prev, t: parseInt(translator) };
    });
  };

  const onQueryChange = (query) => {
    setForm((prev) => {
      return { ...prev, q: query, s: 0, a: "", view: "search" };
    });
  };

  const onSearch = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <Form
      id="search"
      className="card card-header col-12"
      acceptCharset="UTF-8"
      onSubmit={onSearch}
    >
      <div className="form-group row">
        <div class="input-group-prepend col-4">
          <Form.Control
            as="select"
            className="form-control"
            value={form.s}
            onChange={(e) => onSoorahChange(e.target.value)}
          >
            {soorahList.map((soorah, index) => (
              <option value={index} key={index}>
                {soorah}
              </option>
            ))}
          </Form.Control>
        </div>
        <div class="input-group col-3">
          <Form.Control
            type="number"
            placeholder="Ayə"
            className="form-control "
            size={3}
            maxLength={3}
            min={1}
            max={286}
            step={1}
            value={form.a}
            onChange={(e) => onAyahChange(e.target.value)}
          />
        </div>
        <div class="input-group-prepend col-5">
          <Form.Control
            as="select"
            className="form-control"
            id="t"
            value={form.t}
            onChange={(e) => onTranslatorChange(e.target.value)}
          >
            {translatorList.map((t, index) => (
              <option value={index} key={index}>
                {t}
              </option>
            ))}
          </Form.Control>
        </div>
      </div>

      <div className="form-group row">
        <div class="input-group-prepend col-7">
          <Form.Control
            type="text"
            placeholder="Kəlmə"
            className="form-control"
            value={form.q}
            onChange={(e) => onQueryChange(e.target.value)}
          />
        </div>
        <div class="input-group-append col-5">
          <button className="btn btn-success form-control" type="submit">
            Axtar
          </button>
        </div>
      </div>
    </Form>
  );
};

export default SearchForm;
