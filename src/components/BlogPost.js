import React from 'react';

const BlogPost = ({ title, content, date }) => {
  return (
    <article className="blog-post">
      <h2>{title}</h2>
      <div className="post-meta">
        <span>{date}</span>
      </div>
      <div className="post-content">
        {content}
      </div>
    </article>
  );
};

export default BlogPost; 