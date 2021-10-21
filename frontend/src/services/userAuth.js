import { useAuthStore } from "store/useAuth";
import { axiosPost } from "helpers/axios";
import apiConstant from "constants/apiContants";
import { useHistory } from "react-router";

export function AuthUserService(values) {
  const history = useHistory();
  const { setLogin, setUserDetails } = useAuthStore((state) => ({
    setLogin: state.setLogin,
    setUserDetails: state.setUserDetails,
  }));

  const registerUser = async (values) => {
    try {
      let response = await axiosPost(apiConstant.SIGNUP_URL, values);
      if (!response) {
        console.log(response.error);
      } else {
        history.push("/login");
      }
    } catch (err) {
      console.log(err, "err");
    }
  };

  const loginUser = async (values) => {
    try {
      let response = await axiosPost(apiConstant.LOGIN_URL, values);
      if (!response) {
        console.log(response.error);
      } else {
        if (!response.error) {
          localStorage.setItem("token", `bearer ${response.token}`);
          localStorage.setItem("user", JSON.stringify(response.user));
          setUserDetails(response.user);
          setLogin(true);
          history.push("/");
        }
      }
    } catch (err) {
      console.log(err, "err");
    }
  };

  const logoutUser = async () => {
    try {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setLogin(false)
    } catch (err) {
      console.log(err, "err");
    }
  };
  return { loginUser, registerUser, logoutUser };
}
