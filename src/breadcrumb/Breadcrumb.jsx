import { Link, useMatches } from "react-router-dom";

const Breadcrumb = () => {
  const matches = useMatches();

  const breadcrumb = matches
    .filter((match) => match.handle && match.handle.breadcrumb)
    .map((match) => ({ name: match.handle.breadcrumb, path: match.path }));

  return (
    <div className="breadcrumb">
      <nav aria-label="breadcrumb">
        <ul>
          {breadcrumb.map((breadcrumb, index) => (
            <li key={breadcrumb.path}>
              <Link to={breadcrumb.path}>{breadcrumb.name}</Link>
              {index < breadcrumb.length - 1 && " > "}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Breadcrumb;
