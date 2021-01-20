import './style.scss';

import React from 'react';
import { useHistory } from 'react-router-dom';

import { Container } from '../../components/container';
import { CardsContainer, Header, PlayAsGuest } from '../../components/home';
import { useAuth } from '../../contexts/auth';

const Home = () => {
  const { accessToken } = useAuth();
  const { push } = useHistory();

  if(accessToken) push('/roomList') 
  return (
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
)};

export { Home };
