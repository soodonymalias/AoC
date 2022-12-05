function printBitmap(grid, x, y) {
  let table = document.createElement("table");
  document.body.appendChild(table);
  for (let i = 0; i < x; i++) {
    let tr = table.insertRow();
    for (let j = 0; j < y; j++) {
      let cell = tr.insertCell();
      if (grid[i][j])
        cell.style = "background-color: #000000;";
    }
  }
}