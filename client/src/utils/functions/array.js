export default {
  removeDuplicateObject(arr, nest, key) {
    const result = arr
      .map(e => e[nest][key])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter(e => arr[e])
      .map(e => arr[e]);
    return result;
  }
};
