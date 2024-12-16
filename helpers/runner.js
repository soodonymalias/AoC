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

  let p1 = await part1(inputs);
  let div1 = document.getElementById(is_test ? "t1" : "a1");
  div1.innerText = p1;
  let p2 = await part2(inputs);
  let div2 = document.getElementById(is_test ? "t2" : "a2");
  div2.innerText = p2;
  let runtime = performance.now() - start_time;
  let runtimeDiv = document.getElementById(is_test ? "tr" : "ar");
  runtimeDiv.innerText = Math.round(runtime) + "ms";
}

async function run() {
  await runSingle(true);
  await runSingle(false);
};

document.write("Test:<div>Part 1:<div id='t1'></div></div>Part 2:<div id='t2'></div>Runtime:<div id='tr'></div><br>");
document.write("Actual:<br>Part 1:<div id='a1'></div>Part 2:<div id='a2'></div>Runtime:<div id='ar'></div>");
document.write("<br><div id='progress'></div>");

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