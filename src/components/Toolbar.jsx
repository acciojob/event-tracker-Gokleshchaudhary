import React from 'react';
import PropTypes from 'prop-types';

const Toolbar = ({ setFilter }) => (
  <div className="toolbar">
    <button className="btn" onClick={() => setFilter('all')}>All</button>
    <button className="btn" onClick={() => setFilter('past')}>Past</button>
    <button className="btn" onClick={() => setFilter('upcoming')}>Upcoming</button>
  </div>
);

Toolbar.propTypes = {
  setFilter: PropTypes.func.isRequired
};

export default Toolbar;
