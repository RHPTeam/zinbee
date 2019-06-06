import ProductMarket from "@/services/modules/market/product.services";

const state = {
  allProduct: []
};
const getters = {
  allProduct: state => state.allProduct
};
const mutations = {
  // all product
  setAllProduct: (state, payload) => {
    state.allProduct = payload;
  }
};
const actions = {
  // get all product
  products: async ({ commit }) => {
    const rsAllProduct = await ProductMarket.allProduct();
    commit("setAllProduct", rsAllProduct.data.data);
  },
  // create
  createProduct: async ({ commit }, payload) => {
    await ProductMarket.create(payload);

    const rsAllProduct = await ProductMarket.allProduct();
    commit("setAllProduct", rsAllProduct.data.data);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
