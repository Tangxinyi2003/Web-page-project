import service from "../service/request";

const updateCart = async (params) =>
  await service.post("/cart/updatecart", params);

const getCart = async (userId) =>
  await service.get("/cart/getcart?userId=" + userId);

export { updateCart, getCart };
