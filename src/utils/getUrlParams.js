export const getUrlParams = (sParam) => {
  const sPageURL = window.location.search.substring(1);
  const sURLVariables = sPageURL.split("&");
  let sParameterName;

  for (let i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined
        ? true
        : decodeURIComponent(sParameterName[1]);
    }
  }
  return false;
};
