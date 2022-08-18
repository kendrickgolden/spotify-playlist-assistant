import React from "react";
import {Link} from 'react-router-dom';
export default function Nav() {
  return (
    <div id='main-nav'>
      <nav>
        <ul>
          <li><Link to='/create'>Create Playlists</Link></li>
          <li><Link to='/update'>Update Playlists</Link></li>
        </ul>
      </nav>
    </div>
  );
}
