interface Person {
  name: string;
  age: number;
  email: string;
}

type PersonType = {
  name: string;
  age: number;
  email: string;
};

const person: PersonType = {
  name: 'John',
  age: 30,
  // email: 'john@example.com' // 错误：Property 'email' is missing in type '{ name: string; age: number; }' but required in type '{ name: string; age: number; email: string; }'
};