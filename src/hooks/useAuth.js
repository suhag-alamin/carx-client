import { AuthContext } from "@/context/AuthProvider";
import { useContext } from "react";

const useAuth = () => useContext(AuthContext);

export default useAuth;
