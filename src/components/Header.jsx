import { Link } from "react-router-dom";
import { Icon, Menu, Popup } from "semantic-ui-react";
import { useActiveLink } from "../context/activeLink";
import { useAuthState } from "../context/auth";
import { useViewpoint } from "../utils/hooks";

export const Header = () => {
  const screen = useViewpoint();
  const { user, loading, logout } = useAuthState();
  const { handleItemClick, activeItem } = useActiveLink();

  const handleLogout = async () => {
    logout();
  };
  const authLinks = (
    <Menu pointing size="massive" color="brown">
      <Menu.Item
        icon="globe"
        as={Link}
        to="/"
        name={screen === "mobile" ? "MazeG" : "MazeGematria"}
        active={activeItem === "MazeGematria"}
        onClick={handleItemClick}
      />

      <Menu.Menu position="right">
        <Menu.Item
          icon={
            <Popup
              content="Navigate using your keyboard arrow keys on a PC or mouse/touch movement to play the maze game"
              trigger={<Icon name="info circle" />}
            />
          }
          name={user?.username}
        />
        <Menu.Item name="logout" as={Link} to="/" onClick={handleLogout} />
      </Menu.Menu>
    </Menu>
  );

  const guestLinks = (
    <Menu pointing size="massive" color="brown">
      <Menu.Item
        icon="globe"
        as={Link}
        to="/"
        name="MazeGematria"
        active={activeItem === "MazeGematria"}
        onClick={handleItemClick}
      />
      {!loading ? (
        <Menu.Menu position="right">
          <Menu.Item
            as={Link}
            to="/login"
            name="login"
            active={activeItem === "login"}
            onClick={handleItemClick}
          />
        </Menu.Menu>
      ) : null}
    </Menu>
  );

  return user ? authLinks : guestLinks;
};
