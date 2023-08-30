'use strict';

async function fetchData(url, options) {
  const req = await fetch(url, options);
  if (req.status < 200 || req.status > 299) throw new Error(req.status);

  const json = await req.json();

  return json;
}

async function main() {
  try {
    const user = {
      name: 'John Doe',
      job: 'Developer',
    };
    const url = 'https://reqres.in/api/users';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };
    const userData = await fetchData(url, options);
    console.log(userData);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();
