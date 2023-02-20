// Current date
console.log(new Date());

//timestamp
console.log(new Date().getTime());

/* Region specific date */
console.log("====== Region specific ======");
const date = new Date();
console.log(new Intl.DateTimeFormat("en-US").format(date));
console.log(new Intl.DateTimeFormat("da-DK").format(date));
