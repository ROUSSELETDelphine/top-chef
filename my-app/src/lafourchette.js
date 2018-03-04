/* Set up the HTTP request options */
const fetch = require('node-fetch');
const rp = require('request-promise');
const cheerio = require('cheerio');
var uri_searchRestaurant = 'https://www.lafourchette.com/search-refine/';
var uri_restaurantPage = 'https://m.lafourchette.com/api/restaurant/';
var obj, name, id, address, price, restaurantList = [], newRestaurantList=[];



async function importJson(filename){
    let restaurantList = require('./' + filename);
    return (restaurantList);
}

async function scrapId(uri){
  let data = await fetch(uri,{
        method: "GET",
        headers: {
          'Cookie': 'datadome=AHrlqAAAAAMAtXQB0LO1y9MAWl0ANA==',
          'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.167 Safari/537.36'
        }
      });
  let html = await data.text();
  let $ = await cheerio.load(html);

  id = await $('.resultItem').attr('data-restaurant-id');
  return(id);
}

async function getDeal(link){
  let dealList = [];

  let data = await fetch(link, {
        method: "GET",
        headers: {
          'Cookie': 'datadome=AHrlqAAAAAMAtXQB0LO1y9MAWl0ANA==',
          'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.167 Safari/537.36'
        }
      });
  let html = await data.text();

  let parsedJson = JSON.parse(await html);

  for(var i = 0; i < parsedJson.length; i++){
    let deal = parsedJson[i];
    if (deal['title'] != "Simple booking"){
      dealList.push(deal['title'])
    }
  }

  return (dealList);

}

async function exportToJson(newRestaurantList){
  const fs = require('fs');
  let data = JSON.stringify(newRestaurantList, null, 2);
  fs.writeFile('lafourchette_restaurants.json', data, function (err) {
    if(err){
        throw err;
    }
});
}

async function scrap(){
  restaurantList = await importJson('michelin_restaurants.json');

  for (var i = 0; i < restaurantList.length; i++){
    let obj = restaurantList[i];
    let name = obj['name'];

    console.log(name);
    let id = await scrapId(uri_searchRestaurant + name);
    if (id != 'undefined'){
      let dealList = await getDeal(uri_restaurantPage + id + '/sale-type');

      await exportToJson(dealList);
      if (dealList.length > 0) {
        /*
        let thoroughfare = obj['thoroughfare'];
        let postal_code = obj['postal'];
        let locality = obj['locality'];
        let country = obj['country'];
        */
        let price = obj['price'];
        let stars = obj['stars'];
        let address = obj['address'];

        /*
        let address = await {
          thoroughfare: thoroughfare,
          postal: postal_code,
          locality: locality,
          country: country
        };
        */

        let restaurant = await {
          name: name,
          address: address,
          price: price,
          stars: stars,
          deal: dealList
        };
        console.log(restaurant);
        await newRestaurantList.push(restaurant);
      }
    }
  }
  exportToJson(newRestaurantList);
}

scrap();








/*
getRestaurant('quinsou');

function scrapLaFourchette(){
  // ma liste de name restaurants
  var restaurantList;

  var i;
  for (i = 0; i < restaurantList.length; i++){
    getRestaurant(restaurantList[i]);
  }
}
*/

/* Get the restaurant called 'name' */
/*
function getRestaurant(name){
var new_uri = uri_searchRestaurant + name;

const options = {
  uri: new_uri,
  // To avoid ban we precise our user-agent
  headers: {'User-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.167 Safari/537.36'},
  transform: function (body) {
    return cheerio.load(body);
  }
};

rp(options)
  .then(($) => {
    id = $('.resultItem').attr('data-restaurant-id');
    address = $('.resultItem-address').text().trim();
    price = $('.resultItem-averagePrice').text().trim();

    console.log(id);
    console.log(address);
    console.log(price);
    //addRestaurantToJson('Quinsou', id, address, price);

  })
  .catch((err) => {
    console.log(err);
  });
}

*/


/* Importing a json file */
/*
function importJson(filename){
  const fs = require('fs');

  fs.readFile('test.json', (err, data) => {
      if (err) throw err;
      let restaurant = JSON.parse(data);
      console.log(restaurant);
  });
  return(restaurant.name);
} */


/* Display the json file */
/*
const fs = require('fs');

fs.readFile('test.json', (err, data) => {
    if (err) throw err;
    let restaurant = JSON.parse(data);
    console.log(restaurant);
});
*/
