import React from "react";

const Intervals = ({ inputOnChange, intervals }) => (
  <div className="intervals">
    Intervals:
    <input
      type="number"
      onChange={(e) => inputOnChange(e)}
      name="intervals"
      value={intervals}
      min="1"
      max="100"
      required
    />
  </div>
);

export default Intervals;
