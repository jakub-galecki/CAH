import "./search.scss";

import { Search } from '@icon-park/react';
import React from 'react';
const Sort = () => (
    <div className='sort'> 
        <p>
          SEARCH
          <input type="text"/>
        <Search className='sortLoupe' type="submit"/>
        </p>
        <p>
        SORT BY:
      <select>
	      <option value>players</option>
	      <option >creation time</option>
        <option >name</option>
      </select>
      <select>
	      <option value>Low to High</option>
	      <option >High to low</option>
      </select>
      </p>
      <p>
        FILTR BY:
      <select multiply>
        <optgroup label="Deck">
          <option>standard</option>
          <option>custom</option>
        </optgroup>
      </select>
      </p>
	</div>
)
export { Sort };