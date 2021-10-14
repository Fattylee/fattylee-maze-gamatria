import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { useActiveLink } from "../context/activeLink";
import { useAuthState } from "../context/auth";

export const Header = () => {
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
        name="MazeGematria"
        active={activeItem === "MazeGematria"}
        onClick={handleItemClick}
      />
      {!loading ? (
        <Menu.Menu position="right">
          <Menu.Item name={user?.firstName} />
          <Menu.Item name="logout" as={Link} to="/" onClick={handleLogout} />
        </Menu.Menu>
      ) : null}
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
