import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { Maze } from "../components/Maze";
import { useAuthState } from "../context/auth";
import { useViewpoint } from "../utils/hooks";

export const Home = (props) => {
  const screen = useViewpoint();
  const { isAuthenticated } = useAuthState();

  useEffect(() => {}, []);

  return (
    <Grid fluid="true">
      <Maze />
    </Grid>
  );
};
