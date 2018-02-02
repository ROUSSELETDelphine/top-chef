/* Set up the HTTP request options */
const rp = require('request-promise');
const cheerio = require('cheerio');
var uri_website = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin';


/* Make the request */

var restaurantList;

// Je test si je peux boucler ça sur les dix premières pages
/*
for (var i = 0; i < 10; i++){
  var new_uri = uri_website + 'page-' + i;

  const options = {
    uri: new_uri,
    transform: function (body) {
      return cheerio.load(body);
    }
  };

  rp(options)
    .then(($) => {
      restaurantList += $('.poi_card-display-title').text();
      console.log(restaurantList);
    })
    .catch((err) => {
      console.log(err);
    });
} */

const options = {
  uri: uri_website,
  transform: function (body) {
    return cheerio.load(body);
  }
};

rp(options)
  .then(($) => {
    restaurantList += $('.poi_card-display-title').text();
    console.log(restaurantList);
  })
  .catch((err) => {
    console.log(err);
  });
