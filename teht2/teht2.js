'use strict';

async function main() {
  const post = await fetch('https://reqres.in/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'Mikko',
      job: 'Baarimikko',
    }),
  });
  const json = await post.json();

  console.log(json);
}

main();
