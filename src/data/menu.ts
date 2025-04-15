import  { MenuItem } from '../types';

const menuItems: MenuItem[] = [
  // Tea
  {
    id: 't1',
    name: 'Ginger Tea',
    price: 25,
    category: 'Tea'
  },
  {
    id: 't2',
    name: 'Black Tea',
    price: 29,
    category: 'Tea'
  },
  {
    id: 't3',
    name: 'Green Tea',
    price: 25,
    category: 'Tea'
  },
  {
    id: 't4',
    name: 'Sea Buckthorn Tea',
    price: 39,
    category: 'Tea'
  },
  
  // Hot Coffee
  {
    id: 'c1',
    name: 'Cappuccino',
    price: 79,
    category: 'Hot Coffee'
  },
  {
    id: 'c2',
    name: 'Americano',
    price: 39,
    category: 'Hot Coffee'
  },
  {
    id: 'c3',
    name: 'Hazelnut Latte',
    price: 79,
    category: 'Hot Coffee'
  },
  {
    id: 'c4',
    name: 'Irish Latte',
    price: 119,
    category: 'Hot Coffee'
  },
  {
    id: 'c5',
    name: 'Butterscotch Latte',
    price: 119,
    category: 'Hot Coffee'
  },
  {
    id: 'c6',
    name: 'Hot Chocolate',
    price: 119,
    category: 'Hot Coffee'
  },
  
  // Cold Coffee & Shakes
  {
    id: 'cc1',
    name: 'Cold Coffee',
    price: 99,
    category: 'Cold Coffee & Shakes'
  },
  {
    id: 'cc2',
    name: 'Hazelnut Cold Coffee',
    price: 139,
    category: 'Cold Coffee & Shakes'
  },
  {
    id: 'cc3',
    name: 'Irish Cold Coffee',
    price: 139,
    category: 'Cold Coffee & Shakes'
  },
  {
    id: 'cc4',
    name: 'Butterscotch Cold Coffee',
    price: 139,
    category: 'Cold Coffee & Shakes'
  },
  {
    id: 'cc5',
    name: 'Almond Rum Cold Coffee',
    price: 139,
    category: 'Cold Coffee & Shakes'
  },
  {
    id: 'cc6',
    name: 'Chocolate Shake',
    price: 179,
    category: 'Cold Coffee & Shakes'
  },
  {
    id: 'cc7',
    name: 'Vanilla Shake',
    price: 119,
    category: 'Cold Coffee & Shakes'
  },
  {
    id: 'cc8',
    name: 'Strawberry Shake',
    price: 99,
    category: 'Cold Coffee & Shakes'
  },
  {
    id: 'cc9',
    name: 'Mango Shake',
    price: 99,
    category: 'Cold Coffee & Shakes'
  },
  {
    id: 'cc10',
    name: 'Butterscotch Shake',
    price: 119,
    category: 'Cold Coffee & Shakes'
  },
  {
    id: 'cc11',
    name: 'Oreo Shake',
    price: 119,
    category: 'Cold Coffee & Shakes'
  },
  {
    id: 'cc12',
    name: 'Brownie Shake',
    price: 139,
    category: 'Cold Coffee & Shakes'
  },
  
  // Coolers & Mojitos
  {
    id: 'm1',
    name: 'Fresh Lime',
    price: 59,
    category: 'Coolers & Mojitos'
  },
  {
    id: 'm2',
    name: 'Ice Tea',
    price: 59,
    category: 'Coolers & Mojitos'
  },
  {
    id: 'm3',
    name: 'Peach Ice Tea',
    price: 99,
    category: 'Coolers & Mojitos'
  },
  {
    id: 'm4',
    name: 'Virgin Mojito',
    price: 79,
    category: 'Coolers & Mojitos'
  },
  {
    id: 'm5',
    name: 'Mint Mojito',
    price: 79,
    category: 'Coolers & Mojitos'
  },
  {
    id: 'm6',
    name: 'Watermelon Mojito',
    price: 79,
    category: 'Coolers & Mojitos'
  },
  {
    id: 'm7',
    name: 'Green Apple Mojito',
    price: 99,
    category: 'Coolers & Mojitos'
  },
  {
    id: 'm8',
    name: 'Blue Lagoon',
    price: 99,
    category: 'Coolers & Mojitos'
  },
  
  // Fries & Sides
  {
    id: 'f1',
    name: 'Classic Fries',
    price: 79,
    category: 'Fries & Sides'
  },
  {
    id: 'f2',
    name: 'Peri Peri Fries',
    price: 99,
    category: 'Fries & Sides'
  },
  {
    id: 'f3',
    name: 'Baked Cheese Fries',
    price: 149,
    category: 'Fries & Sides'
  },
  {
    id: 'f4',
    name: 'Magic Platter',
    price: 199,
    category: 'Fries & Sides'
  },
  {
    id: 'f5',
    name: 'Potato Wedges',
    price: 79,
    category: 'Fries & Sides'
  },
  {
    id: 'f6',
    name: 'Veg Nuggets (10pc)',
    price: 119,
    category: 'Fries & Sides'
  },
  {
    id: 'f7',
    name: 'Paneer Nuggets (10pc)',
    price: 149,
    category: 'Fries & Sides'
  },
  {
    id: 'f8',
    name: 'Cheese Balls (10pc)',
    price: 199,
    category: 'Fries & Sides'
  },
  {
    id: 'f9',
    name: 'Onion Rings',
    price: 179,
    category: 'Fries & Sides'
  },
  
  // Soups
  {
    id: 's1',
    name: 'Cream of Corn',
    price: 99,
    category: 'Soups'
  },
  {
    id: 's2',
    name: 'Cream of Broccoli',
    price: 99,
    category: 'Soups'
  },
  {
    id: 's3',
    name: 'Cream of Mushroom',
    price: 99,
    category: 'Soups'
  },
  {
    id: 's4',
    name: 'Cream of Tomato',
    price: 119,
    category: 'Soups'
  },
  {
    id: 's5',
    name: 'Cream of Mix Veg',
    price: 139,
    category: 'Soups'
  },
  
  // Burgers
  {
    id: 'b1',
    name: 'Aloo Tikki Burger',
    price: 99,
    category: 'Burgers'
  },
  {
    id: 'b2',
    name: 'Crispy Paneer Burger',
    price: 119,
    category: 'Burgers'
  },
  {
    id: 'b3',
    name: 'Tandoori Paneer Burger',
    price: 159,
    category: 'Burgers'
  },
  {
    id: 'b4',
    name: 'Poco Loco Burger',
    price: 159,
    category: 'Burgers'
  },
  {
    id: 'b5',
    name: 'Spinach Corn Burger',
    price: 179,
    category: 'Burgers'
  },
  
  // Special Burgers
  {
    id: 'sb1',
    name: 'Street Fighter Burger',
    price: 55,
    category: 'Special Burgers'
  },
  {
    id: 'sb2',
    name: 'Crispy Paneer Special Burger',
    price: 99,
    category: 'Special Burgers'
  },
  {
    id: 'sb3',
    name: 'Cheese Buster Burger',
    price: 79,
    category: 'Special Burgers'
  },
  {
    id: 'sb4',
    name: 'Big Daddy Burger',
    price: 169,
    category: 'Special Burgers'
  },
  {
    id: 'sb5',
    name: 'Indiana Paneer Burger',
    price: 99,
    category: 'Special Burgers'
  },
  {
    id: 'sb6',
    name: 'Sri Lankan Grill Burger',
    price: 139,
    category: 'Special Burgers'
  },
  {
    id: 'sb7',
    name: 'Haven Special Burger',
    price: 179,
    category: 'Special Burgers'
  },
  
  // Sandwiches
  {
    id: 'sw1',
    name: 'Fresh Veg Club Sandwich',
    price: 69,
    category: 'Sandwiches'
  },
  {
    id: 'sw2',
    name: 'Grilled Veg Club Sandwich',
    price: 79,
    category: 'Sandwiches'
  },
  {
    id: 'sw3',
    name: 'Cheese Grill Sandwich',
    price: 99,
    category: 'Sandwiches'
  },
  {
    id: 'sw4',
    name: 'Spinach Corn Sandwich',
    price: 139,
    category: 'Sandwiches'
  },
  {
    id: 'sw5',
    name: 'Tandoori Paneer Sandwich',
    price: 139,
    category: 'Sandwiches'
  },
  
  // Pizza - Regular
  {
    id: 'pr1',
    name: 'Corn Pizza',
    price: 99,
    category: 'Pizza',
    sizes: {
      'Regular': 99,
      'Medium': 119,
      'Large': 219
    }
  },
  {
    id: 'pr2',
    name: 'Margherita Pizza',
    price: 99,
    category: 'Pizza',
    sizes: {
      'Regular': 99,
      'Medium': 119,
      'Large': 219
    }
  },
  {
    id: 'pr3',
    name: 'Capsicum Pizza',
    price: 99,
    category: 'Pizza',
    sizes: {
      'Regular': 99,
      'Medium': 119,
      'Large': 219
    }
  },
  {
    id: 'pr4',
    name: 'Onion Pizza',
    price: 99,
    category: 'Pizza',
    sizes: {
      'Regular': 99,
      'Medium': 119,
      'Large': 219
    }
  },
  {
    id: 'pr5',
    name: 'Paneer Pizza',
    price: 119,
    category: 'Pizza',
    sizes: {
      'Regular': 119,
      'Medium': 279,
      'Large': 299
    }
  },
  {
    id: 'pr6',
    name: 'Mushroom Pizza',
    price: 119,
    category: 'Pizza',
    sizes: {
      'Regular': 119,
      'Medium': 279,
      'Large': 299
    }
  },
  {
    id: 'pr7',
    name: 'Olive Pizza',
    price: 119,
    category: 'Pizza',
    sizes: {
      'Regular': 119,
      'Medium': 279,
      'Large': 299
    }
  },
  {
    id: 'pr8',
    name: 'Onion & Capsicum Pizza',
    price: 119,
    category: 'Pizza',
    sizes: {
      'Regular': 119,
      'Medium': 279,
      'Large': 299
    }
  },
  {
    id: 'pr9',
    name: 'Mushroom & Corn Pizza',
    price: 119,
    category: 'Pizza',
    sizes: {
      'Regular': 119,
      'Medium': 279,
      'Large': 299
    }
  },
  {
    id: 'pr10',
    name: 'Paneer & Corn Pizza',
    price: 119,
    category: 'Pizza',
    sizes: {
      'Regular': 119,
      'Medium': 279,
      'Large': 299
    }
  },
  {
    id: 'pr11',
    name: 'Fresh Veggies Pizza',
    price: 119,
    category: 'Pizza',
    sizes: {
      'Regular': 119,
      'Medium': 349,
      'Large': 449
    }
  },
  {
    id: 'pr12',
    name: 'Tandoori Paneer Pizza',
    price: 179,
    category: 'Pizza',
    sizes: {
      'Regular': 179,
      'Medium': 349,
      'Large': 449
    }
  },
  {
    id: 'pr13',
    name: 'Haven Special Pizza',
    price: 179,
    category: 'Pizza',
    sizes: {
      'Regular': 179,
      'Medium': 349,
      'Large': 449
    }
  },
  
  // Pasta
  {
    id: 'pa1',
    name: 'Classic Arrabbiata Pasta',
    price: 99,
    category: 'Pasta'
  },
  {
    id: 'pa2',
    name: 'Cheese Balls Arrabbiata Pasta',
    price: 149,
    category: 'Pasta'
  },
  {
    id: 'pa3',
    name: 'Fresh Veggie Arrabbiata Pasta',
    price: 149,
    category: 'Pasta'
  },
  {
    id: 'pa4',
    name: 'Classic Alfredo Pasta',
    price: 99,
    category: 'Pasta'
  },
  {
    id: 'pa5',
    name: 'Mushroom Alfredo Pasta',
    price: 119,
    category: 'Pasta'
  },
  {
    id: 'pa6',
    name: 'Fresh Veggies Alfredo Pasta',
    price: 149,
    category: 'Pasta'
  },
  {
    id: 'pa7',
    name: 'Mix Sauce Pasta',
    price: 179,
    category: 'Pasta'
  },
  
  // Desserts
  {
    id: 'd1',
    name: 'Ice Cream Sundae',
    price: 159,
    category: 'Desserts'
  },
  {
    id: 'd2',
    name: 'Shahi Falooda',
    price: 149,
    category: 'Desserts'
  },
  {
    id: 'd3',
    name: 'Mango Falooda',
    price: 149,
    category: 'Desserts'
  },
  {
    id: 'd4',
    name: 'Waffle with Honey',
    price: 119,
    category: 'Desserts'
  },
  {
    id: 'd5',
    name: 'Chocolate Waffle',
    price: 149,
    category: 'Desserts'
  },
  {
    id: 'd6',
    name: 'Sizzling Brownie with Ice Cream',
    price: 199,
    category: 'Desserts'
  },
  
  // Dips & Add-ons
  {
    id: 'a1',
    name: 'Cheese Slice',
    price: 20,
    category: 'Dips & Add-ons'
  },
  {
    id: 'a2',
    name: 'Garlic Dip',
    price: 20,
    category: 'Dips & Add-ons'
  },
  {
    id: 'a3',
    name: 'Cheese Dip',
    price: 20,
    category: 'Dips & Add-ons'
  },
  {
    id: 'a4',
    name: 'Thousand Island Dip',
    price: 20,
    category: 'Dips & Add-ons'
  },
  {
    id: 'a5',
    name: 'Tandoori Dip',
    price: 20,
    category: 'Dips & Add-ons'
  },
  {
    id: 'a6',
    name: 'Chipotle Dip',
    price: 20,
    category: 'Dips & Add-ons'
  }
];

export default menuItems;
 