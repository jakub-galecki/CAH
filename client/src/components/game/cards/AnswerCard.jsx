import './answerCard.scss';

import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

const AnswerCard = ({ children, playCardFromHand, id }) => {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: 'card', id: id, content: children },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    end(item, monitor) {
      if (monitor.didDrop()) {
        playCardFromHand(item.id);
      }
    },
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  return (
    <div
      ref={drag}
      className="answer-card in-hand"
      style={isDragging ? { opacity: 0 } : {}}
    >
      <span>{children}</span>
    </div>
  );
};

export { AnswerCard };
