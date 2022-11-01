import React from 'react';
import "./Filter.css";

function Filter() {
    return (
        <div className="filter" name="details" id="details">
            <div className="filter-container">
               <button className="filterOpener">Filter</button>
               <select className="friendsDropdown">
                    <option>Sort by</option>
                    <option>sex</option>
                    <option>energy</option>
                    <option>sign</option>
                    <option>orientation</option>
                    <option>most Popular</option>
                </select>
            </div>    
        </div> 
    )
};

export default Filter;