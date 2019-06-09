import ProductMarket from "@/services/modules/market/product.services";

const state = {
  allProduct: [],
  nodeUpdate: [],
  marketCategoryProducts: [],
  marketStatus: "",
  marketRequestStatus: "",
  product: {
    _id: "",
    name: "",
    priceCents: "",
    typeProduct: Number,
    attributes: [
      {
        name: "",
        value: ""
      }
    ],
    description: "",
    tags: [],
    updatedAt: "",
    content: "",
    summary: "",
    previews: {
      thumbnail: ""
    },
    _category: {
      _id: "",
      name: ""
    }
  },
  productsByCategory: [],
  productsSearch: []
};
const getters = {
  allProduct: state => state.allProduct,
  marketCategoryProducts: state => state.marketCategoryProducts,
  marketStatus: state => state.marketStatus,
  marketRequestStatus: state => state.marketRequestStatus,
  newMarketProducts: state => state.allProduct.reverse().slice(0, 6),
  product: state => state.product,
  nodeUpdate: state => state.nodeUpdate,
  productsByCategory: state => state.productsByCategory,
  productsSearch: state => state.productsSearch
};
const mutations = {
  market_request: state => {
    state.marketRequestStatus = "loading";
  },
  market_success: (state, payload) => {
    state.marketStatus = payload;
  },
  market_request_success: state => {
    state.marketRequestStatus = "success";
  },
  // all product
  setAllProduct: (state, payload) => {
    state.allProduct = payload;
  },

  setMarketCategoryProducts: (state, payload) => {
    state.marketCategoryProducts = payload;
  },

  // info by id
  setProduct: (state, payload) => {
    state.product = payload;
  },

  // setButton
  setButton: (state, payload) => {
    state.nodeUpdate = payload;
  },

  // setAtribute
  setCreateAtribute: state => {
    state.product.attributes.push({ name: "", value: "" });
  },

  // setDeleteAtribute
  setDeleteAtribute: (state, payload) => {
    state.product.attributes.splice(payload, 1);
  },

  // setTypeProduct
  setTypeProduct: (state, payload) => {
    state.product.typeProduct = payload;
  },

  // set products by category
  setProductsByCategory: (state, payload) => {
    state.productsByCategory = payload;
  },

  // setSearchProducts
  setSearchProducts: (state, payload) => {
    state.productsSearch = payload;
  }
};
const actions = {
  // get all product
  getProducts: async ({ commit }) => {
    const rsAllProduct = await ProductMarket.allProduct();
    commit("setAllProduct", rsAllProduct.data.data);
  },
  /**
   * Get market products of category
   */
  // create
  createProduct: async ({ commit }, payload) => {
    await ProductMarket.create(payload);

    const rsAllProduct = await ProductMarket.allProduct();
    commit("setAllProduct", rsAllProduct.data.data);
  },

  // delete
  deleteProduct: async ({ commit }, payload) => {
    await ProductMarket.delete(payload);

    const rsAllProduct = await ProductMarket.allProduct();
    commit("setAllProduct", rsAllProduct.data.data);
  },

  // update
  updateProduct: async ({ commit }, payload) => {
    await ProductMarket.update(payload._id, payload);

    const rsAllProduct = await ProductMarket.allProduct();
    commit("setAllProduct", rsAllProduct.data.data);
  },

  // get infor product by id
  getInfoProductById: async ({ commit }, payload) => {
    const rsInfor = await ProductMarket.getInfoById(payload._id);
    commit("setProduct", rsInfor.data.data);
  },

  // get info Default
  getProductDefault: async ({ commit }) => {
    commit("setProduct", {
      _id: "",
      name: "",
      priceCents: "",
      typeProduct: Number,
      attributes: [
        {
          name: "",
          value: ""
        }
      ],
      description: "",
      tags: [],
      updatedAt: "",
      content: "",
      summary: "",
      previews: {
        thumbnail: ""
      },
      _category: {
        _id: "",
        name: ""
      }
    });
  },
  setButtonDefault: async ({ commit }, payload) => {
    commit("setButton", payload);
  },

  // create Attr
  createAttribute: async ({ commit }) => {
    commit("setCreateAtribute");
  },

  // delete attr
  deleteAttribute: async ({ commit }, payload) => {
    commit("setDeleteAtribute", payload);
  },

  //addToCollection
  // eslint-disable-next-line no-unused-vars
  addToCollection: async ({ commit }, payload) => {
    commit("market_request");
    const result = await ProductMarket.addToCollection(payload);
    commit("market_success", result.data.status);
    commit("market_request_success");
  },

  // option choose post or campaign --- // 0 - Post | 1 - Campaign
  typeProduct: async ({ commit }, payload) => {
    commit("setTypeProduct", payload);
  },

  // get products by category
  getProductsByCategory: async ({ commit }, payload) => {
    const resData = await ProductMarket.loadProductsByCategory(payload);
    commit("setProductsByCategory", resData.data.data);
  },

  // search products
  searchProducts: async ({ commit }, payload) => {
    const resSearch = await ProductMarket.searchProducts(payload);
    commit("setSearchProducts", resSearch.data.data);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
