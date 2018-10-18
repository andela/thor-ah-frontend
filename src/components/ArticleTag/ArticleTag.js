import React from "react";
import PropTypes from "prop-types";
// styles
import styles from "./ArticleTag.module.scss";

const ArticleTag = ({ tags }) => (
  <div className="text-left">
    {tags.map(tag => (
      <button key={tag} type="button" className={styles.btn_round}>
        {tag.tag}
      </button>
    ))}
  </div>
);

ArticleTag.propTypes = {
  tags: PropTypes.array.isRequired
};

export default ArticleTag;
