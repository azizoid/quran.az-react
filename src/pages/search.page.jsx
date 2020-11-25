import { memo, useEffect, useState, useCallback } from "react";
import SearchAyah from "../components/search.ayah.component";

import Pagination from "react-js-pagination";

import TitleComponent from "../components/title.component";
import Loading from "../components/loader.component";

const Search = ({ query, t }) => {
  const [paginate, setPaginate] = useState([]);
  const [out, setOut] = useState([]);

  /*
    0 - start
    1 - not found
    2 - result 
    */
  const [empty, setEmpty] = useState(0);

  const getData = useCallback(
    async (page) => {
      await fetch(`https://quran.az/api/search/${query}?page=${page}&t=${t}`)
        .then((response) => response.json())
        .then(({ out, paginate }) => {
          if (out.length > 0) {
            setOut(out);
            setPaginate(paginate);
          } else setEmpty(1);
        })
        .finally(() => setEmpty(2));
    },
    [query, t]
  );

  useEffect(() => {
    if (query.length > 2) {
      getData(1);
    }
  }, [getData, query]);

  if (empty === 1) {
    return (
      <div className="col-sm-12 text-center">
        <div className="col-sm-12 alert alert-danger">Kəlmə tapılmamışdır</div>
      </div>
    );
  } else if (empty === 0) return <Loading />;

  return (
    <div className="row">
      <TitleComponent title={query} />
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
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
        </li>
        {out.map((ayah) => (
          <SearchAyah key={ayah.id} ayah={ayah} mark={query} />
        ))}
        <li className="list-group-item">
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
        </li>
      </ul>
    </div>
  );
};

export default memo(Search);
