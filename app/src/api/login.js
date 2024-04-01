import service from '../service/request';

const loginAction = async (params) =>
    await service.post('/user/login', params)
const registerAction = async (params) =>
    await service.post('/user/register', params)
const forgetAction = async (params) =>
    await service.put('/user/forget', params)


export {
    loginAction,
    registerAction,
    forgetAction
}