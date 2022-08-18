import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Nav() {
  return (
    <div id="main-nav">
      <nav>
        <ul>
          <LinkWrapper to="/create">Create Playlists</LinkWrapper>
          <LinkWrapper to="/update">Update Playlists</LinkWrapper>
        </ul>
      </nav>
    </div>
  );
}

function LinkWrapper({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
