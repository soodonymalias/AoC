class IntCode {
  constructor(code_string) {
    this.code = [];
    for (let s of code_string.split(","))
      this.code.push(parseInt(s));
    this.step = 0;
    this.inputs = [];

    this.op_map = new Map();
    this.op_map.set(1, { func: this.add, jump: 4, args: 2 });
    this.op_map.set(2, { func: this.mul, jump: 4, args: 2 });
    this.op_map.set(3, { func: this.input, jump : 2, args: 0});
    this.op_map.set(5, { func: this.jT, jump : 3, args: 2});
    this.op_map.set(6, { func: this.jF, jump : 3, args: 2});
    this.op_map.set(7, { func: this.lt, jump : 4, args: 2});
    this.op_map.set(8, { func: this.eq, jump : 4, args: 2});
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
        values.push(this.code[this.code[this.step+1+i]]);
      else if (mode == 1)
        values.push(this.code[this.step+1+i]);
    }
    return values;
  }

  add(values) {
    this.code[this.code[this.step+3]] = values[0] + values[1];
  }

  mul(values) {
    this.code[this.code[this.step+3]] = values[0] * values[1];
  }

  input(values) {
    this.code[this.code[this.step+1]] = this.inputs.shift();
  }

  jT(values) {
    if (values[0] != 0) {
      this.step = values[1];
      return "didjump";
    }
  }

  jF(values) {
    if (values[0] == 0) {
      this.step = values[1];
      return "didjump";
    }
  }

  lt(values) {
    this.code[this.code[this.step+3]] = values[0] < values[1] ? 1 : 0;
  }

  eq(values) {
    this.code[this.code[this.step+3]] = values[0] == values[1] ? 1 : 0;
  }

  exec() {
    while (true) {
      let cmd = this.code[this.step];
      if (cmd == 99) // halt
        return undefined;
      if (cmd % 100 == 4) { // output
        let result = this.code[this.code[this.step+1]];
        this.step += 2;
        return result;
      }
      let op = this.op_map.get(cmd % 100);
      let modes = Math.floor(cmd / 100);
      let values = this.getValues(modes, op.args);
      let result = op.func.call(this, values);
      if (result != "didjump")
        this.step += op.jump;
    }
  }
}
