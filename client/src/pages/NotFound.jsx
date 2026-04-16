import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container" style={{ paddingTop: '100px', textAlign: 'center', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '4rem', color: '#6366f1' }}>404</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Page Not Found</p>
      <Link to="/" style={{ color: '#fff', textDecoration: 'underline' }}>Go Home</Link>
    </div>
  );
};

export default NotFound;
