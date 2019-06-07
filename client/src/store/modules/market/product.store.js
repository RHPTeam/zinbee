import ProductMarket from "@/services/modules/market/product.services";

const state = {
  allProduct: [],
  nodeUpdate: [],
  product: {
    _id: "",
    name: "",
    priceCents: "",
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
    }
  },
  collection: []
};
const getters = {
  allProduct: state => state.allProduct,
  product: state => state.product,
  nodeUpdate: state => state.nodeUpdate,
  collection: state => state.collection
};
const mutations = {
  // all product
  setAllProduct: (state, payload) => {
    state.allProduct = payload;
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

  setAddToCollection: (state, payload) => {
    state.collection = payload;
  }
};
const actions = {
  // get all product
  getProducts: async ({ commit }) => {
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

  /**
   * add to collection
   */
  addToCollection: async ({ commit }, payload) => {
    const rsAddToCollection = await ProductMarket.addToCollection(
      payload._id,
      payload
    );
    commit("setAddToCollection", rsAddToCollection.data.data);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
