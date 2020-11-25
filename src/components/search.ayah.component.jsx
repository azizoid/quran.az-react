import { Link } from "react-router-dom";

import { FaExternalLinkAlt } from "react-icons/fa";
import Highlighter from "react-highlight-words";

const SearchAyah = ({ ayah, mark }) => {
  return (
    <li className="list-group-item text-top list-group-item-action d-flex w-100 justify-content-between">
      <div className="text-left">
        <span className="badge badge-primary badge-pill">
          {ayah.s + ":" + ayah.a}
        </span>{" "}
        <Highlighter
          searchWords={[mark]}
          textToHighlight={ayah.c}
          autoEscape={true}
        />
      </div>
      <div>
        <Link to={`/${ayah.s}/${ayah.a}?t=${ayah.t}`}>
          <FaExternalLinkAlt />
        </Link>
      </div>
    </li>
  );
};

export default SearchAyah;
