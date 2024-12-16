async function runSingle(is_test) {
  window.is_test = is_test;
  let start_time = performance.now();
  let path = location.pathname.split("/");
  let test_path = is_test ? "_test" : "";
  let inputLocation = "inputs/" + path[path.length-1].split(".")[0] + test_path + ".txt";
  let inputResponse = await fetch(inputLocation, { cache: 'no-cache' });
  let inputs = (await inputResponse.text()).split(/\r?\n/);
  while (inputs.length > 0 && inputs[inputs.length-1].length == 0)
    inputs.pop();
  if (window.preprocessInput)
    inputs = preprocessInput(inputs);

  document.body.appendChild(document.createTextNode(is_test ? "Test:" : "Actual: "));
  document.body.appendChild(document.createElement("br"));
  document.body.appendChild(document.createTextNode("Part 1: " + (await part1(inputs))));
  document.body.appendChild(document.createElement("br"));
  document.body.appendChild(document.createTextNode("Part 2: " + await part2(inputs)));
  document.body.appendChild(document.createElement("br"));
  let runtime = performance.now() - start_time;
  document.body.appendChild(document.createTextNode("Runtime: " + Math.round(runtime) + "ms"));
  document.body.appendChild(document.createElement("br"));
  document.body.appendChild(document.createElement("br"));
}

async function run() {
  await runSingle(true);
  await runSingle(false);
};

window.onload = run;

function toGrid(inputs, split = null, shouldParseInts = null) {
  let parse = shouldParseInts == "parseInt";
  let grid = new Array(inputs.length);
  for (let i = 0; i < inputs.length; i++) {
    let rowVals = split == null ? inputs[i] : inputs[i].split(split);
    grid[i] = new Array(rowVals.length);
    for (let j = 0; j < rowVals.length; j++) {
      if (parse)
        grid[i][j] = parseInt(rowVals[j], 10);
      else
        grid[i][j] = rowVals[j];
    }
  }
  return grid;
}