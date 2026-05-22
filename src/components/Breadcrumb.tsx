import { Link, useLocation } from "react-router-dom";

function Breadcrumb() {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  return (
    <nav>
      <Link to="/">Home</Link>
      {paths.map((segment, index) => {
        const path = "/" + paths.slice(0, index + 1).join("/");
        const label = segment.replace("-", " "); // format a bit
        return (
          <span key={index}>
            {" > "}
            {index === paths.length - 1 ? (
              <span className="font-medium">{label}</span>
            ) : (
              <Link to={path}>{label}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export default Breadcrumb;