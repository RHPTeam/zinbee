import ProductMarket from "@/services/modules/market/product.services";

const state = {
  allProduct: [],
  nodeUpdate: [],
  marketCategoryProducts: [],
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
    }
  }
};
const getters = {
  allProduct: state => state.allProduct,
  newMarketProducts: state => state.allProduct.reverse().slice(0, 6),
  marketCategoryProducts: state => state.marketCategoryProducts,
  product: state => state.product,
  nodeUpdate: state => state.nodeUpdate
};
const mutations = {
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
  // getMarketCategoryProducts: async ({ commit }, payload) => {
  //   const res = await ProductMarket.allProduct(),
  //     products = res.data.data;
  //   const categoryProducts = products.filter( product => {
  //   } );
  //
  // },
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
  addToCollection: async payload => {
    await ProductMarket.addToCollection(payload._id, payload);
  },

  // option choose post or campaign --- // 0 - Post | 1 - Campaign
  typeProduct: async ({ commit }, payload) => {
    commit("setTypeProduct", payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
