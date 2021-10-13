import { GlobalVar } from "./globalVar";
import { Maze } from "./maze";

let newMaze;

export function generateMaze(
  {
    mazeCurrent: { current: maze },
    rowsColsCurrent: { current: rowsCols },
    sizeCurrent: { current: size },
    changeDisplay,
    setMaxWidth,
  },
  e
) {
  e.preventDefault();
  changeDisplay();
  setMaxWidth();

  if (rowsCols.value === "" || size.value === "") {
    return alert("Please enter all fields");
  }

  let mazeSize = size.value;
  let number = rowsCols.value;
  if (mazeSize > 500 || number > 20) {
    alert("Maze too large!");
    return;
  }

  e.target.style.display = "none";
  e.target.parentElement.style.display = "none";

  newMaze = new Maze(mazeSize, number, number, maze, maze.getContext("2d"));
  newMaze.setup();
  newMaze.draw();
}

export function move(cb, e) {
  if (!GlobalVar.generationComplete) return;
  let key = e.key;
  let row = GlobalVar.current.rowNum;
  let col = GlobalVar.current.colNum;

  switch (key) {
    case "ArrowUp":
      if (!GlobalVar.current.walls.topWall) {
        let next = newMaze.grid[row - 1][col];
        GlobalVar.current = next;
        newMaze.draw();
        GlobalVar.current.highlight(newMaze.columns);
        // not required if goal is in bottom right
        if (GlobalVar.current.goal && cb) cb();
      }
      break;

    case "ArrowRight":
      if (!GlobalVar.current.walls.rightWall) {
        let next = newMaze.grid[row][col + 1];
        GlobalVar.current = next;
        newMaze.draw();
        GlobalVar.current.highlight(newMaze.columns);
        if (GlobalVar.current.goal && cb) cb();
      }
      break;

    case "ArrowDown":
      if (!GlobalVar.current.walls.bottomWall) {
        let next = newMaze.grid[row + 1][col];
        GlobalVar.current = next;
        newMaze.draw();
        GlobalVar.current.highlight(newMaze.columns);
        if (GlobalVar.current.goal && cb) cb();
      }
      break;

    case "ArrowLeft":
      if (!GlobalVar.current.walls.leftWall) {
        let next = newMaze.grid[row][col - 1];
        GlobalVar.current = next;
        newMaze.draw();
        GlobalVar.current.highlight(newMaze.columns);
        // not required if goal is in bottom right
        if (GlobalVar.current.goal && cb) cb();
      }
      break;
    default:
      console.log("Unsupported key:", key);
      return "";
  }
}
