import { Link } from "react-router-dom";

import { MdOpenInNew as FaExternalLinkAlt } from "react-icons/md";

const SoorahAyah = ({ ayah }) => {
  return (
    <li className="list-group-item text-top list-group-item-action d-flex w-100 justify-content-between">
      <div className="text-left">
        <span className="badge badge-primary badge-pill">{ayah.a}</span>{" "}
        {ayah.c}
      </div>
      <div>
        <Link to={`/${ayah.s}/${ayah.a}?t=${ayah.t}`}>
          <FaExternalLinkAlt />
        </Link>
      </div>
    </li>
  );
};

export default SoorahAyah;
