import React from "react";
import { useStoreActions } from "easy-peasy";

const Sounds = ({ soundsAvailable, dispatch }) => {
  const { toggleSounds } = useStoreActions((actions) => actions);

  return (
    <div className="sounds">
      <em>Sounds:</em>
      <input
        type="checkbox"
        name="sounds"
        checked={soundsAvailable}
        onChange={(e) => toggleSounds(e.target.checked)}
      />
    </div>
  );
};

export default Sounds;
