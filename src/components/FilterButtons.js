import React from "react";

function FilterButtons({ filter, setFilter }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <button className="btn" onClick={() => setFilter("all")} style={{ fontWeight: filter === "all" ? "bold" : "normal" }}>
        All
      </button>
      <button className="btn" onClick={() => setFilter("past")} style={{ fontWeight: filter === "past" ? "bold" : "normal" }}>
        Past
      </button>
      <button className="btn" onClick={() => setFilter("upcoming")} style={{ fontWeight: filter === "upcoming" ? "bold" : "normal" }}>
        Upcoming
      </button>
    </div>
  );
}

export default FilterButtons;
