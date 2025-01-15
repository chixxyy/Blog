import React from 'react';
import BlogPost from './BlogPost';

const BlogList = () => {
  const posts = [
    {
      id: 1,
      title: '我的第一篇博客',
      content: '这是我的第一篇博客内容...',
      date: '2024-03-20'
    },
    {
      id: 2,
      title: '学习 React',
      content: 'React 是一个很棒的前端框架...',
      date: '2024-03-21'
    }
  ];

  return (
    <div className="blog-list">
      {posts.map(post => (
        <BlogPost
          key={post.id}
          title={post.title}
          content={post.content}
          date={post.date}
        />
      ))}
    </div>
  );
};

export default BlogList; 