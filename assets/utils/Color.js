class Color {
  constructor(r = 0, g = 0, b = 0) {
    this.r = Math.abs(r);
    this.g = Math.abs(g);
    this.b = Math.abs(b);
    if (typeof r === "string") {
      console.log(r)
      if(!(r.length == '4' || r.length == '7')){
        throw new Error("color format error！");
      }
      var v = this.fromHex(r);
      this.r = v[0];
      this.g = v[1];
      this.b = v[2];
    }
  }

  fromHex(str) {
    if (!str) return
    let reg = str.length > 4 ? /.{2}/g : /.{1}/g
    return str.substr(1).match(reg).map(function (n) {
      if (n.length < 2) {
        n = n.repeat(2)
      }
      return parseInt(n, 16);
    });
  }

  pad(n) {
    var str = "" + n;
    var pad = "00";
    return pad.substring(0, pad.length - str.length) + str;
  }

  diff(c) {
    return new Color(this.r - c.r, this.g - c.g, this.b - c.b);
  };
  dividedBy(n) {
    return new Color(this.r / n, this.g / n, this.b / n);
  };
  approach(c, c2) {
    return new Color(this.r > c.r ? this.r - c2.r : this.r + c2.r, this.g > c.g ? this.g - c2.g : this.g + c2.g,
      this.b > c.b ? this.b - c2.b : this.b + c2.b);
  };
  toHex() {
    return "#" + this.pad(Math.round(this.r).toString(16)) + this.pad(Math.round(this.g).toString(16)) + this.pad(Math.round(this
      .b).toString(16));
  };
}


function colorsBetween(c1, c2, n) {
  c1 = new Color(c1);
  c2 = new Color(c2);
  var diff = c1.diff(c2).dividedBy(n + 1);
  var out = [c1];
  for (var i = 0; i < n; i++) {
    out.push(out[i].approach(c2, diff));
  }
  out.push(c2);
  return out.map(function (c) {
    return c.toHex();
  });
}

export { Color, colorsBetween };