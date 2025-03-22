import { useState, useEffect } from 'react';
import {IUserModel} from "../models/accountsModel.ts";
import {AccountsService} from "../services/accountsService.ts";

const useUsers = () => {
    const [users, setUsers] = useState<IUserModel[]>([]);

    const loadUsers = async () => {
        const res = await AccountsService.getAllUsers();
        if(res.status === 200){
            setUsers(res.data);
        } else {
            console.log("error download categories")
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    return {users,setUsers};
};

export default useUsers;
