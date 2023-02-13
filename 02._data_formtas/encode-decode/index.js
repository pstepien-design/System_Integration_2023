const testString = "testEncode";

const encodedString = btoa(testString);

console.log("encoded", encodedString);

const decodedString = atob(encodedString);

console.log("decoded", decodedString);
