import React from "react";
import PropTypes from 'prop-types';

const Link = props => {
  const { contentState, entityKey, children } = props;
  const { url } = contentState.getEntity(entityKey).getData();
  return (
    <a
      className="link"
      href={url}
      rel="noopener noreferrer"
      target="_blank"
      aria-label={url}
    >
      {children}
    </a>
  );
};

Link.propTypes = {
  children: PropTypes.string.isRequired,
  contentState: PropTypes.string.isRequired,
  entityKey: PropTypes.string.isRequired
}

export default Link;
