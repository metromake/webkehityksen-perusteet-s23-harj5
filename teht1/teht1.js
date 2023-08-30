'use strict';

async function main() {
  const req = await fetch('https://reqres.in/api/users/1');
  const json = await req.json();

  console.log(json);
}

main();
