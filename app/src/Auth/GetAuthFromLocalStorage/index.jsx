import { useDispatch } from 'react-redux';
import { clearUser, setAuth } from '../../store/user/UserSlice';

const GetAuthFromLocalStorage = ({ children }) => {

  const dispatch = useDispatch()
  const IsLogin = localStorage.getItem('isLogin');

  if (IsLogin === 'false') {
    dispatch(clearUser());

  } else {
    dispatch(setAuth())
  }
  return children;
}

export default GetAuthFromLocalStorage;