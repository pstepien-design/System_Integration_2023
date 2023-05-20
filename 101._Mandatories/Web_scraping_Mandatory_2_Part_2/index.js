import { load } from "cheerio";
import fs from "fs";

const response = await fetch("https://nyheder.tv2.dk/");
const result = await response.text();

let page = fs.readFileSync("index.html", "utf-8");

if (!page.includes("html")) {
  fs.writeFileSync("index.html", result);
  page = fs.readFileSync("index.html", "utf-8");
}

const $ = load(page);

const titles = [];

$(".tc_teaser__header")
  .find(".tc_heading")
  .each((index, element) => {
    const data = element.children[0].data;

    titles.push(data);
  });

console.log("Nyheder", titles);
