export default {
  convertUnicode(str) {
    let res;

    res = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    res = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    res = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    res = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    res = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    res = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    res = str.replace(/đ/g, "d");
    res = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    res = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    res = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    res = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    res = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    res = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    res = str.replace(/Đ/g, "D");
    return res;
  },
  findSubString(str, start, end) {
    if (!end) {
      return str.substring(str.indexOf(start) + start.length);
    }
    return str.substring(
      str.indexOf(start) + start.length,
      str.indexOf(end, str.indexOf(start) + start.length)
    );
  },
  urlify(text) {
    return text.replace(/(https?:\/\/[^\s]+)/g, function(url) {
      return `<a href="${url}">${url}</a>`;
    });
  },
  detectUrl(text) {
    const urlList = [];
    text.replace(/(https?:\/\/[^\s]+)/g, function(url) {
      // eslint-disable-next-line no-empty
      if (url.search("</")) {
      }
      urlList.push(url);
      return url;
    });
    return urlList;
  }
};
