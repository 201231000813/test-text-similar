
module.exports = class TextSimilar {
  constructor(options) {
    this.target = options.target || 0.9;
    this.minLength = options.minLength || 10;
    this.lcsRatio = options.lcsRatio || 0.75;
  }

  /**
   * 判断text1、text2是否相似
   * @param text1 String
   * @param text2 String
   * @returns {boolean}
   */
  isSimilar(text1 = '', text2 = '') {
    text1 = format(text1.toString());
    text2 = format(text2.toString());
    if(text1.length < this.minLength || text2.length < this.minLength) return false;

    let ratio = jaccard(text1, text2);
    if(ratio > this.target || this.lcs(text1, text2) > this.lcsRatio) return true;
    return false;
  }

  /**
   * 返回list中与text相似的第一个字符串
   * @param text String
   * @param list Array
   * @returns {string}
   */
  getSimilarTextInArray(text, list) {
    let similarText = '';
    if(typeof text != 'string' || !Array.isArray(list)) return similarText;
    if(!item || !list.length) return similarText;

    for(let item of list) {
      if(this.isSimilar(text, item)) {
        similarText = item;
        break;
      }
    }
    return similarText;
  }

  /**
   * text1、text2的最长公共子序列的长度
   * @param text1
   * @param text2
   * @returns Int
   */
  lcs(text1, text2) {
    const len1 = text1.length, len2 = text2.length;
    let c = new Array(len1 + 1).fill(0).map(_ => new Array(len2 + 1).fill(0));

    for(let i=1; i<=len1; i++) {
      for(let j=1; j<=len2; j++) {
        c[i][j] = text1[i-1] == text2[j-1]
          ? c[i-1][j-1] + 1
          : c[i-1][j] > c[i][j-1] ? c[i-1][j] : c[i][j-1];
      }
    }
    let len = c[len1][len2];
    c = null;
    return len;
  }

}

function jaccard(text1, text2) {
  if(text1.length < this.minLength || text2.length < this.minLength) return 0;
  let set1 = new Set(text1);
  let set2 = new Set(text2);

  let union = new Set([...set1, ...set2]);
  let intersect = new Set([...set1].filter(x => set2.has(x)));
  return intersect.size/union.size;
}

function format(text) {
  if(!text) return '';
  text = text.replace(/(\d)\1{2,}/g, '');           // 去除连续重复数字
  text = text.replace(/[^\w\u4e00-\u9fa5]/g, '@').replace(/@+/g,'');  // 去除所有非字母或数字或下划线或汉字
  return text;
}
