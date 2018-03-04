/* Set up the HTTP request options */
const fetch = require('node-fetch');
const fs = require('fs');
const rp = require('request-promise');
const cheerio = require('cheerio');
var uri_website = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin';
var uri_michelin = 'https://restaurant.michelin.fr';

var restaurant, name, price, address,thoroughfare, postal_code, locality,
country, stars, no_result;
var restaurantList = [];
var counter = 1;
var end = false;

/* Scrap main information of each restaurant */
async function scrapRestaurant(href){
  let data = await fetch(uri_michelin + href);
  let html = await data.text();
  let $ = await cheerio.load(html);
  let name = await $('.poi_intro-display-title').text().trim();
  let thoroughfare = await $('div.poi_intro-display-address .thoroughfare').text().trim();
  let postal_code = await $('div.poi_intro-display-address span.postal-code').text().trim();
  let locality = await $('div.poi_intro-display-address span.locality').text().trim();
  let country = await $('div.poi_intro-display-address span.country').text().trim();
  let price = await $('.poi_intro-display-prices').text().trim();

  if ($('span').hasClass('guide-icon icon-mr icon-cotation1etoile')) {
    stars = 1;
            }
  if ($('span').hasClass('guide-icon icon-mr icon-cotation2etoiles')) {
    stars = 2;
  }
  if ($('span').hasClass('guide-icon icon-mr icon-cotation3etoiles')) {
    stars = 3;
  }

  let address = await {
    thoroughfare: thoroughfare,
    postal: postal_code,
    locality: locality,
    country: country
  };

  let restaurant = await {
    name: name,
    address: address,
    price: price,
    stars: stars
  };

  return(restaurant);
}

async function exportToJson(restaurantList){
  const fs = require('fs');
  let data = JSON.stringify(restaurantList, null, 2);
  fs.writeFile('michelin_restaurants.json', data);

}

/* Scrap all the pages */
async function scrap(){
  do {
    let data = await fetch(uri_website + '/page-' + counter);
    let html = await data.text();
    let $ = await cheerio.load(html);
    no_result = await $('.srp-no-results-title').text().trim();
    if (no_result.length > 0 ){
      end = true;
    }


    await $('.poi-card-link').each(async function () {
      href = await $(this).attr('href');
      console.log(href);
      restaurantList.push(await scrapRestaurant(href));
      });
    counter++;
    }
  while(!end);

  await exportToJson(restaurantList);
}



scrap();
