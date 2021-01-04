import './style.scss';

import React from 'react';

import { EditableCard } from '../../components/deckCreator/cards/EditableCard';

const DeckCreator = () => (
  <div className="deck-creator">
    <EditableCard>This is card content</EditableCard>
  </div>
);

export { DeckCreator };
