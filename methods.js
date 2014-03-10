
var methods = function() {
  this.author = 'tagfoo';
  this.version = '1.0';
  this.createTime = '2013.3.10';
}

methods.prototype = {

  //set [{attr:[1,2,3]},{attr2:x,xx,xxx},{attr3:?,??,???}] --> [{attr:1, attr2:x, attr3: ?}, {attr:2, attr2:xx, attr3: ??}, {attr:3, attr2:xxx, attr3: ???}]
  rev : function(obj) {
        var key = [], val = [], i = j = kLen = vLen = 0, ret = [];

        for (i in obj) {
            key.push(i);
            val.push(obj[i]);
            kLen++;
            !vLen && (vLen = obj[i].length);
        }
        for (; j < vLen; j++) {
            var temp = {};
            for (var m = 0; m < kLen; m++) {
                temp[key[m]] = val[m][j];
            }
            ret.push(temp);
        }

        return ret;
    }
}
