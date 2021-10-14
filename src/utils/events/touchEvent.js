import { useEffect } from "react";
import { GlobalVar } from "../globalVar";

export const useTouchEvent = ({ onComplete }) => {
  useEffect(() => {
    document.addEventListener(
      "touchstart",
      handleTouchStart.bind(null, () => {}),
      false
    );
    document.addEventListener(
      "touchmove",
      handleTouchMove.bind(null, onComplete),
      false
    );
    return () => {
      document.removeEventListener(
        "touchstart",
        handleTouchStart.bind(null, () => {}),
        false
      );
      document.removeEventListener(
        "touchmove",
        handleTouchMove.bind(null, onComplete),
        false
      );
    };
  }, []);

  let xDown = null;
  let yDown = null;

  function getTouches(evt) {
    return (
      evt.touches || // browser API
      evt.originalEvent.touches
    ); // jQuery
  }

  function handleTouchStart(cb, evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  }

  function handleTouchMove(cb, evt) {
    if (!xDown || !yDown) {
      return;
    }
    if (!GlobalVar.generationComplete) return;

    let row = GlobalVar.current.rowNum;
    let col = GlobalVar.current.colNum;

    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
      if (xDiff > 0) {
        /* left swipe */
        if (!GlobalVar.current.walls.leftWall) {
          let next = GlobalVar.newMaze.grid[row][col - 1];
          GlobalVar.current = next;
          GlobalVar.newMaze.draw();
          GlobalVar.current.highlight(GlobalVar.newMaze.columns);
          // not required if goal is in bottom right
          if (GlobalVar.current.goal && cb) cb();
        }
      } else {
        /* right swipe */
        console.log("swipe right");
        if (!GlobalVar.current.walls.rightWall) {
          let next = GlobalVar.newMaze.grid[row][col + 1];
          GlobalVar.current = next;
          GlobalVar.newMaze.draw();
          GlobalVar.current.highlight(GlobalVar.newMaze.columns);
          if (GlobalVar.current.goal && cb) cb();
        }
      }
    } else {
      if (yDiff > 0) {
        /* up swipe */
        if (!GlobalVar.current.walls.topWall) {
          let next = GlobalVar.newMaze.grid[row - 1][col];
          GlobalVar.current = next;
          GlobalVar.newMaze.draw();
          GlobalVar.current.highlight(GlobalVar.newMaze.columns);
          // not required if goal is in bottom right
          if (GlobalVar.current.goal && cb) cb();
        }
      } else {
        /* down swipe */
        console.log("swipe down");
        if (!GlobalVar.current.walls.bottomWall) {
          let next = GlobalVar.newMaze.grid[row + 1][col];
          GlobalVar.current = next;
          GlobalVar.newMaze.draw();
          GlobalVar.current.highlight(GlobalVar.newMaze.columns);
          if (GlobalVar.current.goal && cb) cb();
        }
      }
    }
    /* reset values */
    xDown = null;
    yDown = null;
  }
};
