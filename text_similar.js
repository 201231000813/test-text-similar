// 过滤所有的数字序号

module.exports = class Text {
  constructor(options) {
    this.target = options.target;
    this.minLength = options.minLength || 10;
  }

  jaccard(text1, text2) {
    text1 = format(text1);
    text2 = format(text2);
    if(text1.length < this.minLength || text2.length < this.minLength) return 0;

    let ratio = jaccardCal(text1, text2);
    if(ratio > this.target) return ratio;
    if(this.lsc(text1, text2)) return this.target;
    return ratio;
  }

  lsc(str1, str2) {
    const len1 = str1.length, len2 = str2.length;
    let c = new Array(len1 + 1).fill(0).map(_ => new Array(len2 + 1).fill(0));

    for(let i=1; i<=len1; i++) {
      for(let j=1; j<=len2; j++) {
        if(str1[i-1] == str2[j-1]) {
          c[i][j] = c[i-1][j-1] + 1;
        } else if(c[i-1][j]>c[i][j-1]) {
          c[i][j] = c[i-1][j];
        } else {
          c[i][j]=c[i][j-1];
        }
      }
    }
    let len = c[len1][len2];
    c = null;
    if(len/(Math.min(len1, len2)) > 0.75) console.log('=======', len/(Math.min(len1, len2)), str1, str2);
    return len/(Math.min(len1, len2)) > 0.75
  }

}

function jaccardCal(text1, text2) {
  if(text1.length < this.minLength || text2.length < this.minLength) return 0;
  let set1 = new Set(text1);
  let set2 = new Set(text2);

  let union = new Set([...set1, ...set2]);
  let intersect = new Set([...set1].filter( x => set2.has(x)));
  return intersect.size/union.size;
}

function format(text) {
  if(!text) return '';
  let reg = /[^\w\u4e00-\u9fa5]/g;
  text = text.replace(/(\d)\1{2,}/g, '');           // 去除连续重复数字 
  text = text.replace(reg, '@').replace(/@+/g,'');  // 去除所有非字母或数字或下划线或汉字
  return text;
}
