class IntCode {
  constructor(code_string) {
    this.code = [];
    for (let s of code_string.split(","))
      this.code.push(parseInt(s));
    this.step = 0;
    this.relative_base = 0;
    this.inputs = [];

    this.op_map = new Map();
    this.op_map.set(1, { func: this.add, args: 3 });
    this.op_map.set(2, { func: this.mul, args: 3 });
    this.op_map.set(3, { func: this.input, args: 1});
    this.op_map.set(4, { func: this.output, args: 1});
    this.op_map.set(5, { func: this.jT, args: 2});
    this.op_map.set(6, { func: this.jF, args: 2});
    this.op_map.set(7, { func: this.lt, args: 3});
    this.op_map.set(8, { func: this.eq, args: 3});
    this.op_map.set(9, { func: this.relative_base_update, args: 1});
    this.op_map.set(99, { func: () => {}, args: 0});
  }

  addInput(i) {
    this.inputs.push(i);
  }

  getValues(modes, paramCount) {
    let values = [];
    for (let i = 0; i < paramCount; i++) {
      let mode = modes % 10;
      modes = Math.floor(modes / 10);
      if (mode == 0)
        values.push(this.code[this.step+1+i]);
      else if (mode == 1)
        values.push(this.step+1+i);
      else if (mode == 2)
        values.push(this.relative_base + this.code[this.step+1+i]);
    }
    return values;
  }

  add(values) {
    this.code[values[2]] = this.code[values[0]] + this.code[values[1]];
  }

  mul(values) {
    this.code[values[2]] = this.code[values[0]] * this.code[values[1]];
  }

  input(values) {
    this.code[values[0]] = this.inputs.shift();
  }

  output(values) {
    return this.code[values[0]];
  }

  jT(values) {
    if (this.code[values[0]] != 0) {
      this.step = this.code[values[1]];
      return "didjump";
    }
  }

  jF(values) {
    if (this.code[values[0]] == 0) {
      this.step = this.code[values[1]];
      return "didjump";
    }
  }

  lt(values) {
    this.code[values[2]] = this.code[values[0]] < this.code[values[1]] ? 1 : 0;
  }

  eq(values) {
    this.code[values[2]] = this.code[values[0]] == this.code[values[1]] ? 1 : 0;
  }

  relative_base_update(values) {
    this.relative_base += this.code[values[0]];
  }

  exec() {
    while (true) {
      let c = this.code[this.step];
      let modes = Math.floor(c / 100);
      let cmd = c % 100;
      let op = this.op_map.get(cmd);
      let values = this.getValues(modes, op.args);
      let result = op.func.call(this, values);
      if (result != "didjump")
        this.step += op.args + 1;
      if (cmd == 4 || cmd == 99) // output
        return result;
    }
  }
}
