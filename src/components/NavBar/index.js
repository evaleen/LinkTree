import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./index.scss";

export const links = [
  {
    name: "Links",
    to: "/"
  },
  {
    name: "Settings",
    to: "/"
  },
  {
    name: "PRO",
    to: "/"
  }
];

const NavLink = ({ name, to, active, onClick }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`nav-link ${active ? "active" : "inactive"}`}
    >
      {name}
    </Link>
  );
};

export default class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      activeLink: 0
    };
  }

  updateActiveLink = activeLink => {
    this.setState({ activeLink });
  };
  render() {
    const { activeLink } = this.state;
    return (
      <div className="nav-bar header">
        {links.map(({ name, to }, index) => {
          return (
            <NavLink
              key={index}
              name={name}
              to={to}
              active={activeLink === index}
              onClick={() => this.updateActiveLink(index)}
              data-test="NavBar-NavLink"
            />
          );
        })}
      </div>
    );
  }
}
