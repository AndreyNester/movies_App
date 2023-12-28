import React from "react";
import { Anchor } from "antd";
import "./NavigationTab.css";

export default class NavigationTab extends React.Component {
  render() {
    const { onSwitch } = this.props;
    return (
      <nav className="contentBlock__nav">
        <Anchor
          affix={false}
          onClick={(e, link) => onSwitch(link.href)}
          direction="horizontal"
          items={[
            {
              key: "part-1",
              href: "#Search",
              title: "Search",
            },
            {
              key: "part-2",
              href: "#Rated",
              title: "Rated",
            },
          ]}
        />
      </nav>
    );
  }
}
