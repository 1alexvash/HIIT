import React from "react";

const Sounds = ({ soundsAvailable, dispatch }) => (
  <div className="sounds">
    <em>Sounds:</em>
    <input
      type="checkbox"
      name="sounds"
      checked={soundsAvailable}
      onChange={e =>
        dispatch({ type: "toggleSounds", payload: e.target.checked })
      }
    />
  </div>
);

export default Sounds;
