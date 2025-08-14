import React from 'react';

const FilterButtons = ({ onFilterChange }) => {
  return (
    <div className="filter-buttons">
      <button className="btn" onClick={() => onFilterChange('all')}>
        All Events
      </button>
      <button className="btn" onClick={() => onFilterChange('past')}>
        Past Events
      </button>
      <button className="btn" onClick={() => onFilterChange('upcoming')}>
        Upcoming Events
      </button>
    </div>
  );
};

export default FilterButtons;