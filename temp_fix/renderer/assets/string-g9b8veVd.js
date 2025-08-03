function hidePhone(phone) {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
}
function textReplaceLink(text) {
  let exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;
  return text.replace(exp, `<a href='$1' alt='link'>$1</a>`);
}
function textReplaceMention(text, color = "#2196F3") {
  return text.replace(new RegExp(/@\S+/, "g"), ($0, $1) => {
    return `<span style="color:${color};">${$0}</span>`;
  });
}
function fileFormatSize(value) {
  if (null == value || value == "") {
    return "0";
  }
  let unitArr = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let index = 0;
  let srcsize = parseFloat(value);
  index = Math.floor(Math.log(srcsize) / Math.log(1e3));
  let size = srcsize / Math.pow(1e3, index);
  size = size.toFixed(2);
  return size + unitArr[index];
}
function formatPhone(phone) {
  return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1 $2 $3");
}
export {
  formatPhone as a,
  textReplaceMention as b,
  fileFormatSize as f,
  hidePhone as h,
  textReplaceLink as t
};
