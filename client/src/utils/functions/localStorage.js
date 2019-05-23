export default {
  setLocaStorage(val) {
    localStorage.setItem("YourVariables", val);
  },
  getLocalStorage() {
    return localStorage.getItem("YourVariables");
  },
  removeLocalStorage() {
    localStorage.removeItem("YourVariables");
  }
};
