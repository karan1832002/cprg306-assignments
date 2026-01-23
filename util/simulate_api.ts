interface User {
  id: number;
  name: string;
  age?: number;
  username: string;
  appelation?: string;
}

type UserDetails = {
  id: number;
  name: string;
  age?: number;
  username: string;
  address: {
    street: string;
    city: string;
    zipCode: string;
  };
};

const user1: User = {
  id: 1,
  name: "Alice",
  age: 30,
  username: "alice123",
  appelation: "The wisest and greatest dr that ever lived.",
};

const { username } = user1;

// user1.name = "barrister" + " " + user1.name;
user1.name = `dr. ${user1.name}`;
user1.appelation = `Welcome ${user1.name}, ${user1.appelation}`;

export const returnUserDetails = () => {
  return user1;
};

export const returnUserName = () => {
  return username;
};
