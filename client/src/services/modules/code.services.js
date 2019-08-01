import Api from "@/services";

export default {
  getAllCode() {
    return Api().get("code");
  },
  createCode(content) {
    return Api().post(`code`, content);
  },
  updateCode(codeId, content) {
    return Api().patch(`code?_id=${codeId}`, content);
  },
  deleteCode(codeId) {
    return Api().delete(`code?_id=${codeId}`);
  },
  getInfoById(codeId) {
    return Api().get(`code?_id=${codeId}`);
  }
};
