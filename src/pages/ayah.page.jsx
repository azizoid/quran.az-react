import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import ColoredText from "../components/colored.text.component";

import TitleComponent from "../components/title.component";

// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  MdNavigateBefore as FaChevronLeft,
  MdNavigateNext as FaChevronRight,
} from "react-icons/md";

const Ayah = ({ soorah, ayah, t, soorahTitle }) => {
  let history = useHistory();

  const [data, setData] = useState([]);
  const [out, setOut] = useState([]);

  const [empty, setEmpty] = useState(0);

  const [form, setForm] = useState({
    s: Number(soorah),
    a: Number(ayah),
    t: Number(t),
  });

  useEffect(() => {
    const url = `/${form.s}/${form.a}?t=${form.t}`;

    fetch("https://quran.az/api" + url)
      .then((response) => response.json())
      .then(({ out, data }) => {
        if (out.length > 0) {
          setOut(out);
          setData(data);
          setEmpty(2);
          localStorage.setItem("lastAyah", url);
        } else setEmpty(1);
      });
  }, [form.s, form.a, form.t]);

  const navClick = (e, s, a, tr) => {
    setForm((prev) => {
      return { ...prev, s: Number(s), a: Number(a), t: Number(tr) };
    });
    history.push(`/${s}/${a}?t=${tr}`);

    e.preventDefault();
  };

  let description = "";

  if (empty === 1) {
    return (
      <div className="col-sm-12 alert alert-danger">Ayə tapılmamışdır</div>
    );
  }

  return (
    <>
      <ul className="list-group list-group-flush ">
        {soorah !== 9 && (
          <li className="list-group-item">
            <h3 className="text-center">&#65021;</h3>
          </li>
        )}
        {out.map(({ id, s, a, c, arabic, transliteration, prev, next }) => (
          <>
            <li className="list-group-item text-top list-group-item-action d-flex w-100 justify-content-between ">
              {prev !== null && (
                <a
                  onClick={(e) => navClick(e, data.s, prev, data.t)}
                  href={`/${data.s}/${prev}?t=${data.t}`}
                  style={{
                    fontSize: "3em",
                    color: "#6cb2eb",
                  }}
                >
                  <FaChevronLeft />
                </a>
              )}
              <div>
                <strong>{`${s}:${a}`}</strong>
                <br />
                {c}
              </div>
              {next !== null && (
                <a
                  onClick={(e) => navClick(e, data.s, next, data.t)}
                  href={`/${data.s}/${next}?t=${data.t}`}
                  style={{
                    fontSize: "3em",
                    color: "#6cb2eb",
                  }}
                >
                  <FaChevronRight />
                </a>
              )}
            </li>
            <li
              className="list-group-item list-group-item-action align-middle"
              style={{ padding: "2rem" }}
            >
              <ColoredText key="transliteration" content={transliteration} />
            </li>
            <li
              className="list-group-item list-group-item-action"
              style={{ padding: "2rem" }}
            >
              <h2 className="text-right  align-text-top arabic">{arabic}</h2>
            </li>
            <li className="list-group-item ">
              <ul className="pagination justify-content-center">
                <li className="page-item">
                  <Link to={`/${data.s}?t=${data.t}`} className="page-link">
                    Surəni tam oxu
                  </Link>
                </li>
                {prev !== null && (
                  <li className="page-item">
                    <a
                      onClick={(e) => navClick(e, data.s, prev, data.t)}
                      href={`/${data.s}/${prev}?t=${data.t}`}
                      className="page-link"
                    >
                      {prev}
                    </a>
                  </li>
                )}
                <li className="page-item disabled">
                  <span className="page-link">{data.a}</span>
                </li>
                {next !== null && (
                  <li className="page-item">
                    <a
                      onClick={(e) => navClick(e, data.s, next, data.t)}
                      href={`/${data.s}/${next}?t=${data.t}`}
                      className="page-link"
                    >
                      {next}
                    </a>
                  </li>
                )}
              </ul>
            </li>
          </>
        ))}
      </ul>
      <TitleComponent
        title={`${soorahTitle}:${ayah}`}
        description={description}
      />
    </>
  );
};

export default React.memo(Ayah);
