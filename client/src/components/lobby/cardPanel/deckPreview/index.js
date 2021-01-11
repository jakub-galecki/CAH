import './style.scss';

import React from 'react';

export const DeckPreview = ({ author, title, description, createdAt }) => {
  const date = `${createdAt.getDate()} ${createdAt.getMonth()} ${createdAt.getFullYear()}`;
  return (
    <div className="card-preview">
      <div className="left-up">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <div className="right-up">{<p>{date}</p>}</div>
      <div className="left-bottom">
        <p>{author}</p>
      </div>
      <div className="right-bottom">
        <button>Dodaj</button>
      </div>
    </div>
  );
};
