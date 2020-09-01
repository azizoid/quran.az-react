import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import TranslatorList from "../components/translator.list.component";
import ColoredText from "../components/colored.text.component";

import TitleComponent from "../components/title.component";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
    <div className="row">
      <table id="quran-ayah" className="table table-borderless">
        <thead>
          <tr>
            <td colSpan="3">
              <TranslatorList
                data={data}
                soorahTitle={soorahTitle}
                navClick={navClick}
              />
            </td>
          </tr>
          {soorah !== 1 && ayah !== 1 && (
            <tr>
              <td colSpan="3">
                <h3 className="text-center">&#65021;</h3>
              </td>
            </tr>
          )}
        </thead>

        {out.map(({ id, s, a, c, arabic, transliteration, prev, next }) => {
          return (
            <tbody key={id}>
              <tr>
                <td width="1" className="nav-icon align-middle">
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
                </td>
                <td style={{ textAlign: "justify" }}>
                  <strong>{`${s}:${a}`}</strong>
                  <br />
                  {(description = c)}
                </td>
                <td width="1" className="nav-icon align-middle">
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
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <ColoredText
                    key="transliteration"
                    content={transliteration}
                  />
                </td>
                <td></td>
              </tr>
              <tr>
                <td colSpan="3">
                  <h2 className="text-right arabic">{arabic}</h2>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
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
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
      <TitleComponent
        title={`${soorahTitle}:${ayah}`}
        description={description}
      />
    </div>
  );
};

export default Ayah;
