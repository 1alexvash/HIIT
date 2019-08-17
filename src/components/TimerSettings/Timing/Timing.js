import React from "react";

const Timing = ({ inputOnChange, work, rest }) => (
  <section className="timing">
    <section className="timing-work">
      <label>
        Work <span>(s)</span>
      </label>
      <input
        type="number"
        onChange={e => inputOnChange(e)}
        name="work"
        value={work}
        placeholder="15 s"
        min="1"
        required
      />
    </section>
    <section className="timing-rest">
      <label>
        Rest <span>(s)</span>
      </label>
      <input
        type="number"
        onChange={e => inputOnChange(e)}
        name="rest"
        value={rest}
        placeholder="45 s"
        min="1"
        required
      />
    </section>
  </section>
);

export default Timing;
