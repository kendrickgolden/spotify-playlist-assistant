import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Nav() {
  return (
      <nav id="main-nav">
        <ul>
          <LinkWrapper to="/create">CREATE </LinkWrapper>
          <LinkWrapper to="/update">UPDATE </LinkWrapper>
        </ul>
      </nav>
  );
}

function LinkWrapper({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  let tooltipText;
  if(to === '/create') {
    tooltipText = "Choose an artist and create a playlist out of all the songs you've saved featuring them";
  } else if (to === '/update') {
    tooltipText = "Update an existing playlist made through this site with any new songs that have been saved";
  }

  return (
    <li id={isActive ? "active" : ""} className="sidebar-options">
      <Link to={to} {...props}>
        {children}
      </Link>
      <div className="info-tooltip" tooltip={tooltipText}>i</div>
    </li>
  );
}
