function parse(inputs) {
  let code = [];
  let split = inputs[0].split(",");
  for (let s of split)
    code.push(parseInt(s));
  return code;
}

function getValues(code, modes, step, paramCount) {
  let values = [];
  for (let i = 0; i < paramCount; i++) {
    let mode = modes % 10;
    modes = Math.floor(modes / 10);
    if (mode == 0)
      values.push(code[code[step+1+i]]);
    else if (mode == 1)
      values.push(code[step+1+i]);
  }
  return values;
}

function add(code, modes, step, input) {
  let values = getValues(code, modes, step, 2);
  code[code[step+3]] = values[0] + values[1];
}

function mul(code, modes, step, input) {
  let values = getValues(code, modes, step, 2);
  code[code[step+3]] = values[0] * values[1];
}

function input(code, modes, step, input) {
  code[code[step+1]] = input; 
}

function output(code, modes, step, input) {
  return { action: "output", value: code[code[step+1]] }; 
}

function jT(code, modes, step, input) {
  let values = getValues(code, modes, step, 2);
  return { action: "jump", value: values[0] != 0 ? values[1] : null };
}

function jF(code, modes, step, input) {
  let values = getValues(code, modes, step, 2);
  return { action: "jump", value: values[0] == 0 ? values[1] : null };
}

function lt(code, modes, step, input) {
  let values = getValues(code, modes, step, 2);
  code[code[step+3]] = values[0] < values[1] ? 1 : 0;
}

function eq(code, modes, step, input) {
  let values = getValues(code, modes, step, 2);
  code[code[step+3]] = values[0] == values[1] ? 1 : 0;
}

let op_map = new Map();
op_map.set(1, { func: add, jump: 4 });
op_map.set(2, { func: mul, jump: 4 });
op_map.set(3, { func: input, jump : 2});
op_map.set(4, { func: output, jump : 2});
op_map.set(5, { func: jT, jump : 3});
op_map.set(6, { func: jF, jump : 3});
op_map.set(7, { func: lt, jump : 4});
op_map.set(8, { func: eq, jump : 4});

function intcode(code, input) {
  let outputs = [];
  let step = 0;
  while (true) {
    let cmd = code[step];
    if (cmd == 99)
      break;
    let op = op_map.get(cmd % 100);
    let result = op.func(code, Math.floor(cmd / 100), step, input);
    step += op.jump;
    if (result != undefined) {
      if (result.action == "output")
        outputs.push(result.value);
      if (result.action == "jump" && result.value != null)
        step = result.value;
    }
  }
  return outputs;
}
