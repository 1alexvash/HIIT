import React from "react";

const StatusText = ({ progressStatusClass, progressStatusText }) => (
  <p className={`status ${progressStatusClass}`}>{progressStatusText}</p>
);

export default StatusText;
