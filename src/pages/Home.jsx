import { Grid } from "semantic-ui-react";
import { Maze } from "../components/Maze";

export const Home = (props) => {
  return (
    <Grid fluid="true">
      <Maze {...props} />
    </Grid>
  );
};
