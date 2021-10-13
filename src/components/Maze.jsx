import { useState } from "react";
import { Container, Form, Grid, Header, Popup } from "semantic-ui-react";
import { useMaze, useViewpoint } from "../utils/hooks";
import { generateMaze } from "../utils/setting";

export const Maze = () => {
  const screen = useViewpoint();
  const { mazeRef, rowsColsRef, sizeRef, completeRef } = useMaze({
    onComplete,
  });
  const [rowColumSize, setRowColumSize] = useState(20);
  const [mazeSize, setMazeSize] = useState(500);
  const [gridColumn, setGridColumn] = useState(1);
  const [maxWidth, setMaxWidth] = useState("400px");

  function onComplete() {
    let complete = document.querySelector(".complete");
    console.log("fixed");
    complete.style.display = "block";
    alert("Completed!!!");
    window.location.reload();
  }

  return (
    <Grid.Row centered columns={gridColumn} style={{ maxWidth }}>
      {/* <Grid.Row columns={screen === "mobile" ? 1 : screen === "tablet" ? 2 : 3}> */}

      <Grid.Column style={{ background: "#fb23ac", paddingTop: "20px" }}>
        <div>
          <Header
            className="title"
            textAlign="center"
            content="Maze Generator"
            size="huge"
          />
          <div className="complete">
            <h3>Fastest time: 20m 5s</h3>

            <Form.Button
              id="reset"
              className="reset"
              content="Reset"
              size="large"
              color="black"
              fluid
              onClick={() => window.location.reload()}
            />
          </div>
        </div>
      </Grid.Column>
      <Grid.Column style={{ background: "pink" }}>
        <Form
          id="settings"
          onSubmit={generateMaze.bind(null, {
            mazeCurrent: mazeRef,
            rowsColsCurrent: rowsColsRef,
            sizeCurrent: sizeRef,
            completeCurrent: completeRef,
            changeDisplay: () => setGridColumn(2),
            setMaxWidth: () => setMaxWidth("100%"),
          })}
          autoComplete="true"
          size="big"
        >
          <Form.Input
            id="size"
            type="number"
            value={mazeSize}
            min="100"
            max="500"
            onChange={(e) => setMazeSize(e.target.valueAsNumber)}
            name="mazeSize"
            placeholder="Your maze size"
            icon="box"
            label="Maze size"
          />
          <Form.Input
            id="number"
            type="number"
            value={rowColumSize}
            min="5"
            max="20"
            onChange={(e) => setRowColumSize(e.target.valueAsNumber)}
            name="rowColumSize"
            placeholder="Your rows/columns size"
            icon="columns"
            label="Maze rows/columns size"
          />

          <Form.Button
            id="submit"
            type="submit"
            content="Generate Maze"
            fluid
            size="large"
            color="green"
            icon="random"
          />
        </Form>
      </Grid.Column>
      <Grid.Column>
        <Popup
          content="Navigate using your keyboard arrow keys"
          trigger={<Container as="canvas" className="maze" />}
        />
        {/* <canvas className="maze"></canvas> */}
      </Grid.Column>
    </Grid.Row>
  );
};
