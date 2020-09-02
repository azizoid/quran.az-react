import React from "react";
import { Link } from "react-router-dom";

import { MdOpenInNew as FaExternalLinkAlt } from "react-icons/md";

const SoorahAyah = ({ ayah }) => {
  return (
    <tr>
      <td className="text-right">{ayah.a}</td>
      <td>{ayah.c} </td>
      <td>
        <Link to={`/${ayah.s}/${ayah.a}?t=${ayah.t}`}>
          <FaExternalLinkAlt />
        </Link>
      </td>
    </tr>
  );
};

export default SoorahAyah;
