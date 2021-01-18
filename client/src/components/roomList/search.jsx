import "./search.scss";

import { Search } from '@icon-park/react';
import React from 'react';
const Sort = () => (
    <div className='sort'> 
        <p>
          WYSZUKAJ
          <input type="text"/>
        <Search className='sortLoupe' type="submit"/>
        </p>
        <p>
        SORTUJ
      <select>
	      <option value>wolne miejsca</option>
	      <option >czas utworzenia</option>
        <option >alfabetycznie</option>
      </select>
      <select>
	      <option value>Low to High</option>
	      <option >High to low</option>
      </select>
      </p>
      <p>
        FILTRUJ
      <select multiply>
        <optgroup label="Talia">
          <option>standardowa</option>
          <option>niestandardowa</option>
        </optgroup>
      </select>
      </p>
	</div>
)
export { Sort };