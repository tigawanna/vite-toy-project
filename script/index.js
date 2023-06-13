// script to turn a tsxfile into a string json


import { logError, logSuccess } from './pretty.js';
import fs from 'fs';
// const filePath = process.argv[2];
const filePath= 'test.tsx'
fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    logError("error reading file",err);
    return;
  }
  const componentName = "component"; // replace with your component name
  const obj = {};
    obj[componentName] = data;

  const jsonString = JSON.stringify([obj]);

    logSuccess("",jsonString);
  fs.writeFileSync("output.json", jsonString);
});






