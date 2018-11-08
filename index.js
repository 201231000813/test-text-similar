let list = require('./text.js').result;
let TextSimilar = require('./text_similar.js');

let target = 0.85;
let similar = new TextSimilar({ target });

let safeUser = [];
let unsafeUsers = [];
let count = 0;

console.time('cal');
for(let item of list) {
  for(let index in item.coments) {
    if(index == 0) continue;
    let start = index - 10 < 0 ? 0 : index - 10;
    let coments = item.coments.slice(start, index);
    let safe = true;
    for(let c of coments) {
      count ++;
      let ratio = similar.jaccard(item.coments[index], c);
      if(ratio >= target) {
        safe = false;
        break;
      }
    }
    // if(!safe) unsafeUsers.push({ uid: item._id, index, c: item.coments[index], coments });
    if(safe) safeUser.push({ uid: item._id, index, c: item.coments[index], coments });
  }
}

console.log({ count });
console.timeEnd('cal');
console.log(safeUser.length);
// console.log(unsafeUsers.length, unsafeUsers);



