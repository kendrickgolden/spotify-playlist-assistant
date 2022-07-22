import React from 'react';
import { useFetch } from '../utils/hooks';

function List() {

const response =  fetch('http://localhost:5000/');

  return(
      <div>
      <h1>List from server{"\n"}</h1>
      </div>
  );
}

export default List;