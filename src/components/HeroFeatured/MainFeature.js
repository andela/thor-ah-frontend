import React from 'react';
import { Link } from 'react-router-dom';

const MainFeature = (props) => {
  const { title, slug, details } = props;
  return (

    <div>
      <Link to={`/articles/${slug}`}>{title}</Link>
      <p>BY {details}</p>
    </div>

  )
}

export default MainFeature;
