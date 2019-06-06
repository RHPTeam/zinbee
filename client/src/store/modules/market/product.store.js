import ProductMarket from "@/services/modules/market/product.services";

const state = {
  allProduct: [],
  inforById: [],
  nodeUpdate: []
};
const getters = {
  allProduct: state => state.allProduct,
  inforById: state => state.inforById,
  nodeUpdate: state => state.nodeUpdate
};
const mutations = {
  // all product
  setAllProduct: (state, payload) => {
    state.allProduct = payload;
  },

  // info by id
  setInforById: (state, payload) => {
    state.inforById = payload;
  },

  // setButton
  setButton: (state, payload) => {
    state.nodeUpdate = payload;
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
  },

  // delete
  delete: async ({ commit }, payload) => {
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
    commit("setInforById", rsInfor.data.data);
  },

  // get info Default
  getProductDefault: async ({ commit }) => {
    commit("setInforById", {
      name: "",
      priceCents: "",
      attributes: [
        {
          name: "",
          value: ""
        }
      ],
      description: "",
      tags: []
    });
  },
  setButtonDefault: async ({ commit }, payload) => {
    commit("setButton", payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
