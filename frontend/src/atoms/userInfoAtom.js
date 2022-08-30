import { atom } from "recoil";

export const userInfoAtom = atom({
    key: 'userInfo', // keyには一意の名称を入れる。
    default: ''
});