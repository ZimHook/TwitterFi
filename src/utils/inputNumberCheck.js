const inputNumberCheck = (str, set) => {
  let val = str.replaceAll(/[^0-9/.]/g, "");
  set(val);
};

export default inputNumberCheck