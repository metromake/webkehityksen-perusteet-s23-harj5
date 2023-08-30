'use strict';

async function main() {
  const req = await fetch('https://reqres.in/api/unknown/23').catch(err =>
    console.log(err)
  );

  const post = await fetch('https://reqres.in/api/unknown/23', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'Mikko',
      job: 'Baarimikko',
    }),
  }).catch(err => console.log(err));

  const put = await fetch('https://reqres.in/api/unknown/23', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'Mikko',
      job: 'Baarimikko',
    }),
  }).catch(err => console.log(err));

  if (req.ok) console.log(await req.json());
  if (post.ok) console.log(await post.json());
  if (put.ok) console.log(await put.json());
}

main();
