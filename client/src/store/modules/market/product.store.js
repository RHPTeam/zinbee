import ProductMarket from "@/services/modules/market/product.services";

const state = {
  allProduct: [],
  nodeUpdate: [],
  marketCategoryProducts: [],
  marketStatus: "",
  marketRequestStatus: "",
  product: {},
  productsByCategory: [],
  productsSearch: [],
  newestProduct: [],
  statusProducts: "",
  statusSearchProducts: "",
  pageProductCurrent: 1
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
  productsSearch: state => state.productsSearch,
  newestProduct: state => state.newestProduct,
  statusProducts: state => state.statusProducts,
  statusSearchProducts: state => state.statusSearchProducts,
  pageProductCurrent: state => state.pageProductCurrent
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
  },

  // setGetNewestProduct
  setGetNewestProduct: (state, payload) => {
    state.newestProduct = payload;
  },

  // statusProducts
  statusProducts: (state, payload) => {
    state.statusProducts = payload;
  },

  // statusSearchProducts
  statusSearchProducts: (state, payload) => {
    state.statusSearchProducts = payload;
  },

  //Set page of product
  setPageProduct: (state, payload) => {
    state.pageProductCurrent = payload;
  },
  //Set update product
  setUpdateProduct: (state, payload) => {
    const position = state.allProduct
      .map((item, index) => {
        if (item._id === payload._id) return index;
      })
      .filter(item => item !== undefined);

    state.allProduct[position] = payload;
  },
  //Set delete product
  setDeleteProductMarket: (state, payload) => {
    state.allProduct = payload;
  }
};
const actions = {
  // get all product
  getProducts: async ({ commit }, payload) => {
    const rsAllProduct = await ProductMarket.index(payload.size, payload.page);
    commit("setAllProduct", rsAllProduct.data.data.results);
    commit("setPageProduct", rsAllProduct.data.data.page);
  },
  /**
   * Get market products of category
   */
  // create
  createProduct: async ({ commit }, payload) => {
    await ProductMarket.create(payload);
    const sizeDefault = 25,
      pageDefault = 1;
    const rsAllProduct = await ProductMarket.index(sizeDefault, pageDefault);
    commit("setAllProduct", rsAllProduct.data.data);
  },

  // delete
  deleteProduct: async ({ commit, state }, payload) => {
    const product = state.allProduct.filter(item => item._id !== payload);
    commit("setDeleteProductMarket", product);
    await ProductMarket.delete(payload);
  },

  // update
  updateProduct: async ({ commit }, payload) => {
    commit("setUpdateProduct", payload);
    await ProductMarket.update(payload._id, payload);
  },

  // get infor product by id
  getInfoProductById: async ({ commit }, payload) => {
    const rsInfor = await ProductMarket.getInfoById(payload._id);
    commit("setProduct", rsInfor.data.data);
  },

  // get info Default
  getProductDefault: async ({ commit }) => {
    commit("setProduct", {
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
      _category: ""
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
    commit("statusProducts", "loading");
    const resData = await ProductMarket.loadProductsByCategory(payload);
    commit("setProductsByCategory", resData.data.data);
    commit("statusProducts", "success");
  },

  // search products
  searchProducts: async ({ commit }, payload) => {
    commit("statusSearchProducts", "loading");
    const resSearch = await ProductMarket.searchProducts(payload);
    commit("setSearchProducts", resSearch.data.data);
    commit("statusSearchProducts", "success");
  },

  // get newest product -- home market
  getNewestProduct: async ({ commit }, payload) => {
    const resNewestProduct = await ProductMarket.getNewestProduct(payload);
    commit("setGetNewestProduct", resNewestProduct.data.data);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
