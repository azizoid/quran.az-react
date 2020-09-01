import React, { useEffect, useState } from "react";
import SearchAyah from "../components/search.ayah.component";
import Loader from "../components/loader.component";

import Pagination from "react-js-pagination";

import TitleComponent from "../components/title.component";

const Search = ({ query, t }) => {
  const [paginate, setPaginate] = useState([]);
  const [out, setOut] = useState([]);

  /*
    0 - start
    1 - not found
    2 - result 
    */
  const [empty, setEmpty] = useState(0);

  useEffect(() => {
    if (query.length > 2) {
      getData(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, t]);

  const getData = (v) => {
    fetch(`https://quran.az/api/search/${query}?page=${v}&t=${t}`)
      .then((response) => response.json())
      .then(({ out, paginate }) => {
        if (out.length > 0) {
          setOut(out);
          setPaginate(paginate);
          setEmpty(2);
        } else setEmpty(1);
      });
  };

  if (empty < 2) {
    return (
      <div className="col-sm-12 text-center">
        {empty === 1 ? (
          <div className="col-sm-12 alert alert-danger">
            Kəlmə tapılmamışdır
          </div>
        ) : (
          <Loader />
        )}
      </div>
    );
  }

  return (
    <div className="row">
      <TitleComponent title={query} />
      <table id="quran" className="table table-striped table-borderless">
        <thead>
          <tr>
            <td colSpan="3">
              <Pagination
                activePage={parseInt(paginate.currentPage)}
                itemsCountPerPage={parseInt(paginate.perPage)}
                totalItemsCount={parseInt(paginate.total)}
                pageRangeDisplayed={5}
                innerClass="pagination justify-content-center"
                itemClass="page-item"
                linkClass="page-link"
                onChange={getData}
              />
            </td>
          </tr>
        </thead>
        <tbody>
          {out.map((ayah) => (
            <SearchAyah key={ayah.id} ayah={ayah} mark={query} />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">
              <Pagination
                activePage={parseInt(paginate.currentPage)}
                itemsCountPerPage={parseInt(paginate.perPage)}
                totalItemsCount={parseInt(paginate.total)}
                pageRangeDisplayed={5}
                innerClass="pagination justify-content-center"
                itemClass="page-item"
                linkClass="page-link"
                onChange={getData}
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Search;