import { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { AuthContext } from "../../Firebase/Firebaseprovider";

const PrivatePage = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    } else {
      const delay = setTimeout(() => {
        setLoading(false);
      }, 1000);

      return () => clearTimeout(delay);
    }
  }, [user]);

  if (loading) {
    return <HashLoader className="m-auto" />;
  }

  if (user) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default PrivatePage;