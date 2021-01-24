export const getServerHttpUrl = () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test'
  ) {
    return 'http://localhost:8080/';
  } else if (process.env.NODE_ENV === 'production') {
    return 'https://cardz-against-humanity.herokuapp.com/';
  }
};

export const getServerWsUrl = () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test'
  ) {
    return 'ws://localhost:8080/';
  } else if (process.env.NODE_ENV === 'production') {
    return 'wss://cardz-against-humanity.herokuapp.com/';
  }
};
