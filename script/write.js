import fs from 'fs'
import { logNormal, logSuccess } from './pretty';

const componentsJson = fs.readFileSync('output.json', 'utf8')
const components = JSON.parse(componentsJson) 

components.forEach((item) => {
 const filePath = Object.keys(item)[0]
    logNormal("filePath  ===== ", filePath);
  const fileContent = item.component
    logNormal("file content  ===== ", content);

  fs.writeFile(filePath, fileContent, (err) => {
    if (err) throw err;
    logSuccess(`${filePath} has been saved!`);
  });
});
