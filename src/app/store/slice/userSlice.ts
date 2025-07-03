import { createSlice,PayloadAction } from '@reduxjs/toolkit'

interface UserState{
    user: unknown | null;
    isEmailVerified:boolean;
    isLoginDialogOpen:boolean;
    isLoggedIn:boolean;
}

const initialState:UserState={
    user:  null,
    isEmailVerified:false,
    isLoginDialogOpen:false,
    isLoggedIn:false,

}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser:(state,action:PayloadAction<unknown>)=>{
            state.user=action.payload;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setEmailVerified:(state,action:PayloadAction<any>)=>{
            state.isEmailVerified=action.payload;
        },
        logout:(state)=>{
            state.user=null;
            state.isEmailVerified=false;
            state.isLoggedIn=false;
        },
        toggleLoginDialog:(state)=>{
            state.isLoginDialogOpen=!state.isLoginDialogOpen;
        },
        authStatus:(state)=>{
            state.isLoggedIn=false;   
        }
    }
})

export const {setUser,setEmailVerified,logout,toggleLoginDialog,authStatus}=userSlice.actions;
export default userSlice.reducer;