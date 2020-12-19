import './style.scss';

import React from 'react';

import { Container } from '../../components/container';
import { CardsContainer, Header, PlayAsGuest } from '../../components/home';

const Home = () => (
  <div className="home">
    <Container>
      <div className="home-group">
        <Header>
          <h1>
            Cards against <div className="red">humanity</div>
          </h1>
        </Header>
        <CardsContainer />
        <PlayAsGuest />
      </div>
    </Container>
  </div>
);

export { Home };
