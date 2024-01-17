const { PRODUCT_TABLE } = require("../models/product.model");

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert(PRODUCT_TABLE, [{
      name: "Product 1",
      image: "https://api.lorem.space/image/game?w=150&h=220",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo ",
      price: 10000,
      category_id: 1,
      created_at: new Date()
    },
    {
      name: "Product 12",
      image: "https://api.lorem.space/image/game?w=150&h=220",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo ",
      price: 300,
      category_id: 1,
      created_at: new Date()
    },
    {
      name: "Product 212",
      image: "https://api.lorem.space/image/game?w=150&h=220",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo ",
      price: 310,
      category_id: 2,
      created_at: new Date()
    },
    {
      name: "Product 122",
      image: "https://api.lorem.space/image/game?w=150&h=220",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo ",
      price: 3020,
      category_id: 2,
      created_at: new Date()
    },

  ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete(PRODUCT_TABLE, null, {});
  }
};
