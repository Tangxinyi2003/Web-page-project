import service from "../service/request";

const getProductList = async (params) =>
  await service.get("/product/list", { params });

const getProduct = async (id) => await service.get("/product/get?id=" + id);

const updateProduct = async (params) =>
  await service.put("/product/update", params);

const addProduct = async (params) => await service.post("/product/add", params);

const deleteProduct = async (id) =>
  await service.delete("/product/delete", { params: { id } });

export { getProductList, getProduct, updateProduct, addProduct, deleteProduct };
