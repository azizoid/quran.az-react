import React, { useEffect, useState } from "react";

import SOORAH_LIST from "../assets/soorahList";
import Skeleton from "react-loading-skeleton";

const RandomAyah = () => {
  const [out, setOut] = useState({
    s: "96",
    a: "1",
    c: "Yaradan Rəbbinin adı ilə oxu!",
  });
  const [lastUrl, setLastUrl] = useState();
  const [loaded, setLoaded] = useState(0);

  const soorahList = SOORAH_LIST;

  useEffect(() => {
    fetch("https://quran.az/api/random?t=1")
      .then((response) => response.json())
      .then((data) => {
        setOut(data.out);
        setLoaded(1);
      });
    setLastUrl(localStorage.getItem("lastAyah"));
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <ul className="nav nav-pills nav-fill card-header-pills">
          <li className="nav-item">
            <span className="nav-link disabled">BİR AYƏ</span>
          </li>
          <li className="nav-item">
            {lastUrl ? (
              <a className="nav-link" href={lastUrl}>
                Son oxuduğunuz ayə
              </a>
            ) : (
              <span className="nav-link disabled">Son oxuduğunuz ayə</span>
            )}
          </li>
        </ul>
      </div>
      {loaded ? (
        <div className="card-body">
          <h6 className="card-title text-muted">
            {`${soorahList[out.s]}, ${out.a}`}
          </h6>
          <h6 className="card-title">
            <a href={`/${out.s}/${out.a}?t=${out.t}`}>{out.c}</a>
          </h6>
        </div>
      ) : (
        <Skeleton count={5} />
      )}
    </div>
  );
};
export default RandomAyah;
