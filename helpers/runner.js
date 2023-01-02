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
  document.body.appendChild(document.createTextNode("Part 1: " + part1(inputs)));
  document.body.appendChild(document.createElement("br"));
  document.body.appendChild(document.createTextNode("Part 2: " + part2(inputs)));
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
