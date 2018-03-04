# TOP CHEF

## Client-side
To run client-side:
> cd my-app  
>npm start

It should open http://localhost:3000 and display restaurants with their names,
stars and deals. I couldn't manage to use react-bootstrap-table properly so the page is messy.
Still, restaurants can be sorted by their names and their number of stars by
clicking on the columns' titles.

## Server-Side

### Scrapping Michelin
First, we run this :
>node michelin.js

This scraps all the restaurants with at least 1 star. Basic information like
name, address, price and stars are stored in a json file.

Example:
```json
{
  "name": "Le 39V",
  "address": {
    "thoroughfare": "39 Avenue George V",
    "postal": "75008",
    "locality": "Paris 08",
    "country": "France"
  },
  "price": "Prix - De 39.5 € à 155 €",
  "stars": 1
  ]
},
```

### Scrapping La Fourchette
>node lafourchette.js

To scrap La Fourchette, we read our previous json file and make a research on the lafourchette website with the name of each restaurants stocked in michelin_restaurants.json. If we can find this restaurant and if it presents deals, the restaurant (basic information + deals) is stored in another json file : lafourchette_restaurants.json.

Example:
```json
{
  "name": "Le 39V",
  "address": {
    "thoroughfare": "39 Avenue George V",
    "postal": "75008",
    "locality": "Paris 08",
    "country": "France"
  },
  "price": "Prix - De 39.5 € à 155 €",
  "stars": 1,
  "deal": [
    "Menu Mardis Gourmands 135€ le soir",
    "Menu Mardis Gourmands 85€ le midi"
  ]
},
```
