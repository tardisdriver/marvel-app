const crypto = require("crypto");
const moment = require("moment");

const getHash = () => {
  // creates hash for api call
  let timestamp = moment().format("hmmss");
  let hash = crypto.createHash("md5");
  hash.setEncoding("hex");
  let toBeHashed =
    timestamp +
    process.env.VUE_APP_API_PRIVATE +
    process.env.VUE_APP_API_PUBLIC;
  hash.write(toBeHashed);
  hash.end();
  hash = hash.read();
  return { timestamp, hash };
};
// const getRelated = async (url) => {
//   const auth = getHash();
//   let baseURL = `${url}/characters?ts=${auth.timestamp}&apikey=${process.env.VUE_APP_API_PUBLIC}&hash=${auth.hash}`;
//   await fetch(baseURL)
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//     });
// };

const helperFunctions = {
  getAllCharacters: async function(alpha) {
    let results = {};
    const auth = getHash();
    let baseUrl = `https://gateway.marvel.com/v1/public/characters?ts=${auth.timestamp}&apikey=${process.env.VUE_APP_API_PUBLIC}&hash=${auth.hash}&nameStartsWith=${alpha}&limit=100`;
    await fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => {
        let charList = [];
        for (let character of data.data.results) {
          let id = character.id;
          let imageURL = `${character.thumbnail.path}.${character.thumbnail.extension}`;
          let name = character.name;
          charList.push({ id, name, imageURL });
        }
        results = charList;
      })
      .catch((error) => console.error(error));
    return results;
  },
  getCharInfo: async function(id) {
    let results = {};
    const auth = getHash();
    let baseUrl = `https://gateway.marvel.com/v1/public/characters/${id}?ts=${auth.timestamp}&apikey=${process.env.VUE_APP_API_PUBLIC}&hash=${auth.hash}`;
    await fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => {
        results = data;
      })
      .catch((error) => console.error(error));
    return results;
  },
  getRelated: async function(url, id) {
    let results = [];
    const auth = getHash();
    let baseURL = `${url}/characters?ts=${auth.timestamp}&apikey=${process.env.VUE_APP_API_PUBLIC}&hash=${auth.hash}`;
    await fetch(baseURL)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.data.results);
        let charList = [];
        for (let char of data.data.results) {
          if (char.id !== id) {
            charList.push(char);
          }
        }
        results = charList;
      })
      .catch((error) => console.error(error));
    return results;
  },
};

export default { ...helperFunctions };
