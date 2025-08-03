import { aX as getToken } from "./index-CP-MMhae.js";
function download(msg_id, talk_mode) {
  const token = getToken();
  try {
    const link = document.createElement("a");
    link.href = `${"http://175.178.158.23:9503"}/api/v1/talk/file-download?msg_id=${msg_id}&talk_mode=${talk_mode}&token=${token}`;
    link.click();
  } catch (e) {
    console.warn(e);
  }
}
function getImageInfo(uri) {
  const regex = /(\d+)x(\d+)\./;
  const match = uri.match(regex);
  if (!match) {
    return { width: 0, height: 0 };
  }
  const width = parseInt(match[1], 10);
  const height = parseInt(match[2], 10);
  return { width, height };
}
async function getVideoImage(file, time = 1) {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    const objectURL = URL.createObjectURL(file);
    video.src = objectURL;
    video.currentTime = time;
    video.autoplay = true;
    video.muted = true;
    video.oncanplay = () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const data = {
        url: canvas.toDataURL("image/jpeg", 1),
        width: video.videoWidth,
        height: video.videoHeight,
        duration: video.duration
      };
      canvas.toBlob((blob) => {
        URL.revokeObjectURL(objectURL);
        if (blob == null) return;
        data.file = new File([blob], "image.jpeg", {
          type: blob.type,
          lastModified: Date.now()
        });
        resolve(data);
      }, "image/jpeg");
    };
  });
}
function downloadImage(src, name) {
  const image = new Image();
  image.setAttribute("crossOrigin", "anonymous");
  image.src = src;
  image.onload = function() {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d");
    if (ctx == null) return;
    ctx.drawImage(image, 0, 0, image.width, image.height);
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    const event = new MouseEvent("click");
    a.download = name;
    a.href = url;
    a.dispatchEvent(event);
  };
}
const getFileNameSuffix = (name) => {
  const arr = name.split(".");
  return arr[arr.length - 1];
};
function getFilenameFromUrl(url) {
  const match = url.match(/^.*\/(.*?)$/);
  return match ? match[1] : null;
}
function downloadBlobFile(fileName, content) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = fileName;
  downloadLink.click();
  URL.revokeObjectURL(downloadLink.href);
}
export {
  getVideoImage as a,
  getFilenameFromUrl as b,
  getFileNameSuffix as c,
  downloadImage as d,
  downloadBlobFile as e,
  download as f,
  getImageInfo as g
};
