"use client";

import { useState } from "react";
import { faqs } from "@/data/content";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section className="faq" id="faq">
      <div className="section-header centered">
        <div className="section-label">Common Questions</div>
        <h2 className="section-title">Questions Families Often Ask</h2>
      </div>

      <div className="faq-grid">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;

          return (
            <div
              key={faq.q}
              className={`faq-item ${isOpen ? "open" : ""}`}
              onClick={() => toggle(i)}
            >
              <div className="faq-q">
                <h4>{faq.q}</h4>

                <button
                  type="button"
                  className={`faq-toggle ${isOpen ? "open" : ""}`}
                  aria-label={isOpen ? "Collapse answer" : "Expand answer"}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(i);
                  }}
                >
                  +
                </button>
              </div>

              <p className="faq-a">{faq.a}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}