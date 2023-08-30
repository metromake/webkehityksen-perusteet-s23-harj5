'use strict';

class RestaurantApiWrapper {
  _url = 'https://sodexo-webscrape-r73sdlmfxa-lz.a.run.app/api/v1/';
  constructor() {}

  async getRestaurants() {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const restaurants = await this.fetchData('restaurants', options).catch(
      err => {
        throw new Error(err);
      }
    );
    return restaurants;
  }

  async getDailyMenu(restaurantId) {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const menu = await this.fetchData(
      `restaurants/daily/${restaurantId}/'fi'`,
      options
    ).catch(err => {
      throw new Error(err);
    });
    return menu;
  }

  async fetchData(endpoint, options) {
    const req = await fetch(`${this._url}${endpoint}`, options);
    if (req.status < 200 || req.status > 299) throw new Error(req.status);

    const json = await req.json();

    return json;
  }
}

async function main() {
  const renderRestaurant = async (restaurant, tr) => {
    for (const element of document.getElementsByClassName('highlight'))
      element.classList.remove('highlight');
    tr.classList.add('highlight');
    const dialog = document.getElementsByTagName('dialog')[0];
    dialog.showModal();
    dialog.getElementsByTagName('h1')[0].innerText = restaurant.name;
    dialog.getElementsByTagName(
      'h2'
    )[0].innerText = `${restaurant.address}, ${restaurant.postalCode} ${restaurant.city}`;
    dialog.getElementsByTagName('h3')[0].innerText = restaurant.phone;
    dialog.getElementsByTagName('h4')[0].innerText = restaurant.company;
    dialog
      .getElementsByTagName('button')[0]
      .addEventListener('click', () => dialog.close());

    const menu = await restaurantManager
      .getDailyMenu(restaurant._id)
      .catch(err => {
        const e = document.createElement('p');
        e.innerText = 'Menu not available';
        dialog.appendChild(e);
      });

    dialog.getElementsByTagName('table')[0].innerHTML = '';
    if (!menu) return;
    const table = dialog.getElementsByTagName('table')[0];
    const menuHeader = document.createElement('h5');
    menuHeader.innerText = 'Menu';
    table.appendChild(menuHeader);

    for (const course of menu.courses) {
      const tr = document.createElement('tr');
      const name = document.createElement('td');
      const price = document.createElement('td');
      name.innerText = course.name;
      price.innerText = course.price;
      tr.appendChild(name);
      tr.appendChild(price);
      table.appendChild(tr);
    }
  };

  const restaurantManager = new RestaurantApiWrapper();
  const restaurants = await restaurantManager.getRestaurants().catch(err => {
    const e = document.createElement('p');
    e.innerText = 'Error fetching restaurants';
    document.getElementsByTagName('body')[0].appendChild(e);
  });

  if (!restaurants) return;

  restaurants.sort((a, b) => {
    if (a.name < b.name) return -1;
  });

  const restaurantsElement = document.getElementsByTagName('table')[0];
  for (const restaurant of restaurants) {
    const tr = document.createElement('tr');
    const name = document.createElement('td');
    const address = document.createElement('td');
    tr.addEventListener(
      'click',
      async () => await renderRestaurant(restaurant, tr)
    );
    name.innerText = restaurant.name;
    address.innerText = restaurant.address;
    tr.appendChild(name);
    tr.appendChild(address);
    restaurantsElement.appendChild(tr);
  }
}

main();
