import { useEffect, useState } from "react";
import { Button, Form, Grid, Header } from "semantic-ui-react";
import { useMaze, useViewpoint } from "../utils/hooks";
import { generateMaze } from "../utils/setting";
import { ToastContainer, toast } from "react-toastify";
import { GlobalVar } from "../utils/globalVar";
import moment from "moment";
import { ShootModal } from "./ShootModal";
import { useAuthState } from "../context/auth";

const getIntialState = ({ prop, defaultValue }) => {
  try {
    const mazeConfig = JSON.parse(localStorage.getItem("mazeConfig"));
    if (mazeConfig) {
      return mazeConfig[prop];
    }
    return defaultValue;
  } catch (e) {
    localStorage.removeItem("mazeConfig");
  }
};
export const Maze = (props) => {
  const { logout } = useAuthState();
  const screen = useViewpoint();
  const { mazeRef, rowsColsRef, sizeRef, completeRef } = useMaze({
    onComplete,
  });
  const [rowColumSize, setRowColumSize] = useState(
    getIntialState({ prop: "rowColumSize", defaultValue: 10 })
  );
  const [mazeSize, setMazeSize] = useState(
    getIntialState({ prop: "mazeSize", defaultValue: 500 })
  );
  const [gridColumn, setGridColumn] = useState(1);
  const [maxWidth, setMaxWidth] = useState("400px");
  const [fastestTime, setFastestTime] = useState(() => {
    const fastT = parseInt(localStorage.getItem("fastestTime"));
    if (fastT) {
      return fastT;
    }
    return Infinity;
  });

  useEffect(() => {
    toast(
      "Navigate using your keyboard arrow keys on a PC or mouse/touch movement to play the maze game",
      { autoClose: 5000 }
    );
    return () => {
      toast.dismiss();
    };
  }, []);
  useEffect(() => {
    localStorage.setItem("fastestTime", fastestTime);
  }, [fastestTime]);
  useEffect(() => {
    localStorage.setItem(
      "mazeConfig",
      JSON.stringify({ mazeSize, rowColumSize })
    );
  }, [mazeSize, rowColumSize]);

  function onComplete() {
    const timeDiff = Date.now() - GlobalVar.startTime;
    if (timeDiff < fastestTime) {
      setFastestTime(timeDiff);
    }

    toast(<ShootModal elapsedTime={timeDiff} />, {
      autoClose: false,
      closeOnClick: true,
      position: "top-center",
      style: { opacity: "0" },
      onClose() {
        window.location.reload();
      },
    });
  }

  return (
    <>
      <ToastContainer />
      <Grid.Row centered columns={gridColumn} style={{ maxWidth }}>
        <Grid.Column
          style={{
            background: "#fda6ee",
            paddingTop: "20px",
            marginBottom: "14px",
          }}
        >
          <div>
            <Header
              className="title"
              textAlign="center"
              content="Maze Generator"
              size="huge"
            />
            <div className="complete">
              <h3>
                Fastest time:{" "}
                {fastestTime === Infinity
                  ? ""
                  : moment(fastestTime).format("mm[min] ss[s]")}
              </h3>

              <div>
                <Button
                  id="reset"
                  className="reset"
                  content="Reset"
                  size="large"
                  color="pink"
                  onClick={() => {
                    localStorage.removeItem("fastestTime");
                    localStorage.removeItem("mazeConfig");
                    props.history.push("/login");
                  }}
                />
                <Button
                  id="reload"
                  className="reload"
                  content="Reload"
                  size="large"
                  color="black"
                  onClick={() => {
                    props.history.push("/login");
                    toast.dismiss();
                  }}
                />
              </div>
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
              changeDisplay: () =>
                screen === "computer" || screen === "large screen"
                  ? setGridColumn(2)
                  : null,
              setMaxWidth: () => setMaxWidth("100%"),
            })}
            autoComplete="true"
            size="big"
            style={{ paddingTop: "14px", paddingBottom: "14px" }}
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
              color="black"
              icon="random"
            />
          </Form>
        </Grid.Column>
        <Grid.Column>
          <canvas className="maze"></canvas>
        </Grid.Column>
      </Grid.Row>
    </>
  );
};
