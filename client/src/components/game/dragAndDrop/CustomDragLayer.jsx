import './dragLayer.scss';

import React from 'react';
import { useDragLayer } from 'react-dnd';

import { CardDragPreview } from './CardDragPreview';

const getItemStyles = (initialOffset, currentOffset) => {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }
  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
};

const CustomDragLayer = () => {
  const { isDragging, item, initialOffset, currentOffset } = useDragLayer(
    monitor => ({
      item: monitor.getItem(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }),
  );

  if (!isDragging) {
    return null;
  }

  return (
    <div className="drag-layer">
      <div style={getItemStyles(initialOffset, currentOffset)}>
        <CardDragPreview>{item.content}</CardDragPreview>
      </div>
    </div>
  );
};

export { CustomDragLayer };
