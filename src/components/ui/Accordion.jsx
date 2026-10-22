"use client";

// One section opens at a time; hidden panels remain linked to their heading buttons.

import { useState } from "react";

export default function Accordion({ sections, defaultOpenId = null }) {
  const [openId, setOpenId] = useState(defaultOpenId);

  return (
    <>
      {sections.map(({ id, title, content }) => {
        const open = openId === id;

        return (
          <section className="plant-info-section" key={id}>
            <h2>
              <button
                id={`${id}-heading`}
                type="button"
                aria-expanded={open}
                aria-controls={id}
                onClick={() => setOpenId(open ? null : id)}
              >
                {title}
                <span className="accordion-arrow" aria-hidden="true">
                  {open ? "∧" : "∨"}
                </span>
              </button>
            </h2>

            <div id={id} hidden={!open} aria-labelledby={`${id}-heading`}>
              {content}
            </div>
          </section>
        );
      })}
    </>
  );
}
