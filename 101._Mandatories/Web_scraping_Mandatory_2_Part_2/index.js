import { load } from "cheerio";
import dayjs from "dayjs";
import fs from "fs";

const response = await fetch("https://nyheder.tv2.dk/");
const result = await response.text();

fs.writeFileSync("index.html", "");

fs.writeFileSync("index.html", result);
const page = fs.readFileSync("index.html", "utf-8");

const $ = load(page);

const titles = [];

$(".tc_teaser__header")
  .find(".tc_heading")
  .each((index, element) => {
    const data = element.children[0].data;

    titles.push(data);
  });

const date = dayjs().format("DD-MM-YYYY_HH-mm-ss");

const fileName = `./${date}-nyheder.txt`;

fs.writeFile(
  `./news/${fileName}`,
  titles.join("\n"),
  { flags: "a" },
  function (err) {
    if (err) throw err;
    console.log("Newest news for ", date, " saved");
  }
);

console.log("Nyheder", titles);
