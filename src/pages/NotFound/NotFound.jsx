import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h2 className="text-4xl">Not Found</h2>
      <Link to="/">Back To Home</Link>
    </div>
  );
};

export default NotFound;
