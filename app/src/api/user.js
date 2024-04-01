import service from "../service/request";

const signInAction = async (params) =>
  await service.post("/user/signin", params);
const signUpAction = async (params) =>
  await service.post("/user/signup", params);
const getUserInfo = async (token) =>
  await service.get("/user/get_user_info?token=" + token);

export { signInAction, signUpAction, getUserInfo };
