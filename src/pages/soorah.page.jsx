import React, { useEffect, useState } from "react";

import SoorahAyah from "../components/soorah.ayah.component";
import TitleComponent from "../components/title.component";

import Loading from "../components/loader.component";

const Soorah = ({ soorah, t, soorahTitle }) => {
  const [out, setOut] = useState([]);

  /*
    0 - start
    1 - not found
    2 - result 
    */
  const [empty, setEmpty] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const url = `https://quran.az/api/${soorah}?t=${t}`;

      await fetch(url)
        .then((response) => response.json())
        .then(({ out, data }) => {
          if (out && out.length > 0) {
            setOut(out);
          } else setEmpty(1);
        })
        .finally(() => setEmpty(2));
    }
    fetchData();
  }, [soorah, t]);

  if (empty === 1) {
    return (
      <div className="col-sm-12 text-center">
        <div className="col-sm-12 alert alert-danger">Surə tapılmamışdır</div>
      </div>
    );
  } else if (empty === 0) return <Loading />;

  return (
    <>
      <TitleComponent title={`${soorahTitle}`} />
      <ul className="list-group list-group-flush">
        {soorah !== 9 && (
          <li className="list-group-item">
            <h3 className="text-center">&#65021;</h3>
          </li>
        )}
        {out.map((ayah) => (
          <SoorahAyah ayah={ayah} key={ayah.id} />
        ))}
      </ul>
    </>
  );
};

export default Soorah;
