import { useEffect, useRef, useState } from "react";
import { Form } from "semantic-ui-react";
import { generateMaze, move } from "../utils/setting";

const initialValue = {
  mazeSize: 500,
  rowColumSize: 20,
};

export const Maze = () => {
  const mazeRef = useRef(null);
  const rowsColsRef = useRef(null);
  const sizeRef = useRef(null);
  const completeRef = useRef(null);
  const [rowColumSize, setRowColumSize] = useState(20);
  const [mazeSize, setMazeSize] = useState(500);

  useEffect(() => {
    let maze = document.querySelector(".maze");
    let rowsCols = document.querySelector("#number");
    let size = document.querySelector("#size");

    mazeRef.current = maze;
    rowsColsRef.current = rowsCols;
    sizeRef.current = size;

    document.addEventListener("keydown", move);
    return () => {
      document.removeEventListener("keydown", move);
    };
  }, []);

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", background: "" }}>
      <h1 className="title">Maze Generator</h1>

      <div className="complete">
        <h3>Maze Completed.</h3>
        <button className="replay" id="submit">
          Play again
        </button>
        <button className="close" id="submit">
          Close
        </button>
      </div>
      <Form
        id="settings"
        onSubmit={generateMaze.bind(null, {
          mazeCurrent: mazeRef,
          rowsColsCurrent: rowsColsRef,
          sizeCurrent: sizeRef,
          completeCurrent: completeRef,
        })}
        autoComplete="true"
        size="big"
      >
        <Form.Input
          id="size"
          type="number"
          value={mazeSize}
          min="100"
          onChange={(e) => setMazeSize(e.target.valueAsNumber)}
          name="mazeSize"
          placeholder="Your maze size"
          icon="globe"
          error={""}
          label="Maze size"
          // required={!!error.username}
        />
        <Form.Input
          id="number"
          type="number"
          value={rowColumSize}
          min="5"
          onChange={(e) => setRowColumSize(e.target.valueAsNumber)}
          name="rowColumSize"
          placeholder="Your rows/columns size"
          icon="globe"
          error={""}
          label="Maze rows/columns size"
          // required={!!error.username}
        />

        <Form.Button
          id="submit"
          type="submit"
          content="Generate Maze"
          fluid
          size="large"
          color="green"
        />
      </Form>
      <canvas className="maze"></canvas>
    </div>
  );
};
