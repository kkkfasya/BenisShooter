const fs = require("fs");
const ytdl = require("@distube/ytdl-core");
const config = require("./config.json");

function downloadMusic(url, path = "./", msgAfterFinish = "") {
  /* default :path: is the current directory
   * :msgAfterFinish: is an empty string
   * */
  const download = ytdl(url, { filter: "audioonly" });
  const writeStream = fs.createWriteStream(path);
  download.pipe(writeStream);
  if (msgAfterFinish) {
    download.on("finish", () => {
      console.log(msgAfterFinish);
    });
  }
}

function main() {
  const url = config.CostumMusic ? config.MusicLink : undefined;
  if (!ytdl.validateURL(url)) {
    throw Error("config.MusicLink is invalid");
  }
  downloadMusic(url, "./music/audio.mp3", "Download is finished");
}

main();
