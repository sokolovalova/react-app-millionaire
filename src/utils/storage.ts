export const setToSessionStorage = async (key:string, data:any)=>{
    window.sessionStorage.setItem(key, data);
};

export const getSessionStorage = (key:string)=>{
   return window.sessionStorage.getItem(key);
};
export enum KEYS_STORAGE {
    PROFIT = "PROFIT"
}