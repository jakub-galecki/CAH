// Fake data methods
const generateId = () => Math.floor(Math.random() * 141231 + 1310);
const generateTitle = () => `Talia ${Math.floor(Math.random() * 100)}`;
const generateAuthor = () => `User${Math.floor(Math.random() * 10000) + 1000}`;
const generateDesc = () => {
  const lorem = `Lorem ipsum dolor sit amet consectetur adipiscing elit 
    Proin vulputate ornare suscipit Nulla facilisi Aenean 
    iaculis pellentesque felis et rutrum tortor volutpat in 
    Donec a est volutpat tincidunt nunc eu pulvinar mauris 
    Pellentesque id felis nunc Donec faucibus orci et condimentum rutrum 
    eros ante ultricies sem sit amet congue est magna sed leo`.split(' ');
  const n = Math.floor(Math.random() * 4 + 3);
  return Array(n)
    .fill(0)
    .map(() => lorem[Math.floor(Math.random() * lorem.length)])
    .join(' ');
};
const generateDate = () => {
  const start = new Date(2020, 1, 1);
  const end = new Date();
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
};

const generateType = () => {
  const randomNumber = Math.random() * 2;
  return randomNumber < 1 ? 'questions' : 'answers';
};

const generateCardCount = () => {
  return Math.floor(Math.random() * 90) + 10;
};

export const generateDecks = (n) => {
  return Array(n)
    .fill(0)
    .map(() => ({
      id: generateId(),
      title: generateTitle(),
      type: generateType(),
      author: generateAuthor(),
      description: generateDesc(),
      cardCount: generateCardCount(),
      createdAt: generateDate(),
    }));
};
