import axios from 'axios';

import fs from 'fs';
import mime from 'mime-types';
import naturalCompare from 'natural-compare';
import path from 'path';

const getFiles = (folder) => {

  const folderPath = path.join(new URL(folder, import.meta.url).pathname);

  const data = {};

  const files = fs.readdirSync(folderPath).sort(naturalCompare);

  files.forEach((file) => {
    const filePath = `${folderPath}/${file}`;

    const fileData = fs.readFileSync(filePath);

    // const contentType = mime.lookup(file, { charset: 'utf-8' }) || 'application/octet-stream';
    let contentType = mime.contentType(mime.lookup(file)) || 'application/octet-stream';
    contentType = contentType.replace(/\s/g, ''); // remove space between content type and character set
    // console.log(contentType)

    const rawData = fileData;

    data[file] = { contentType, rawData };
  });
  // console.log(data)
  return data
}

const data = {
  // session: "gNW6S8WqQ1KzyZye",
  // referral: "bc1pgu7lvmsnw037v6g4693quckk8asz7mdh3rac4laftxzpv5e039uqc4h8qj",
  data: getFiles('./files')
};


console.log(data)
// console.log(getFiles('./files'))

try {
  const response = await axios.post('https://api.inscribe.to.ki/initiate', data, {
    headers: { 'Cache-Control': 'no-cache' },
    cache: 'no-cache'
  });
  const json = response.data;
  console.log(json);
} catch (error) {
  console.error(error.message + ": " + error.response.data);
}
