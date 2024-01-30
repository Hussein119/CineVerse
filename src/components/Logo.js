import React from "react";

export default function Logo() {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="logo" onClick={handleReload} style={{ cursor: "pointer" }}>
      <span role="img" aria-label="film-emoji">
        🎬
      </span>
      <h1>CineVerse</h1>
    </div>
  );
}
