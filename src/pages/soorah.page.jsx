import React, { useEffect, useState } from "react";

import SoorahAyah from "../components/soorah.ayah.component";
import TranslatorList from "../components/translator.list.component";
import TitleComponent from "../components/title.component";

const Soorah = ({ soorah, t, soorahTitle }) => {
  const [data, setData] = useState([]);
  const [out, setOut] = useState([]);

  /*
    0 - start
    1 - not found
    2 - result 
    */
  const [empty, setEmpty] = useState(0);

  useEffect(() => {
    fetch(`https://quran.az/api/${soorah}?t=${t}`)
      .then((response) => response.json())
      .then(({ out, data }) => {
        if (out.length > 0) {
          setOut(out);
          setData(data);
          setEmpty(2);
        } else setEmpty(1);
      });
  }, [soorah, t]);

  if (empty === 1) {
    return (
      <div className="col-sm-12 text-center">
        <div className="col-sm-12 alert alert-danger">Surə tapılmamışdır</div>
      </div>
    );
  }

  return (
    <div className="row">
      <TitleComponent title={`${soorahTitle}`} />
      <table id="quran" className="table table-striped table-borderless">
        <thead>
          <tr>
            <td colSpan="3">
              <TranslatorList data={data} soorahTitle={soorahTitle} />
            </td>
          </tr>
        </thead>
        <tbody>
          {soorah !== 9 && (
            <tr>
              <td>&nbsp;</td>
              <td>
                <h3 className="text-center">&#65021;</h3>
              </td>
              <td>&nbsp;</td>
            </tr>
          )}
          {out.map((ayah) => (
            <SoorahAyah ayah={ayah} key={ayah.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Soorah;
