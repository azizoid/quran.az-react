import React from "react";
import { Nav, NavItem, NavLink, Dropdown } from "react-bootstrap";

import { Link } from "react-router-dom";

import translatorList from "../assets/translatorList";

const TranslatorList = ({ data, soorahTitle }) => {
  return (
    <Nav justify variant="pills fill" defaultActiveKey="/home">
      <Nav.Item>
        <Link to={`/${data.s}/?t=${data.t}`} className="nav-link active">
          {soorahTitle}
        </Link>
      </Nav.Item>
      <Dropdown as={NavItem}>
        <Dropdown.Toggle as={NavLink}>{translatorList[data.t]}</Dropdown.Toggle>
        <Dropdown.Menu>
          {translatorList.map((title, index) => {
            const url =
              "/" + data.s + (data.a ? "/" + data.a : "") + "?t=" + index;
            return (
              <Link to={url} className="dropdown-item" key={index}>
                {title}
              </Link>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </Nav>
  );
};

export default TranslatorList;
