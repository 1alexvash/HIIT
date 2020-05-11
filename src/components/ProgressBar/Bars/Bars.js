import React from "react";

const Bars = ({ bars }) =>
  bars.map((bar, index) => (
    <div
      key={index}
      className={`bar ${bar.type === "rest" ? "rest" : "work"}`}
      style={{ width: bar.width + "%" }}
    />
  ));

export default Bars;
