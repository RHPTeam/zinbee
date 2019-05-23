export default {
  "getObjectDate": ( str ) => {
    const date = new Date( str );

    return {
      "second": date.getSeconds(),
      "minute": date.getMinutes(),
      "hour": date.getHours(),
      "date": date.getDate(),
      "month": date.getMonth(),
      "year": date.getFullYear(),
      "day": date.getDay()
    };
  }
}
