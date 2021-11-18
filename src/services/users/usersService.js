import {get, create, update} from '../commonService' 

export const getUsers = async () => {
    return await get('/users')
}

export const createUser = async (user) => {
    return await create('/users', user)
}