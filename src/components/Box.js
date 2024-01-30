import { useState } from "react";

export default function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box scrollable-div">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}
