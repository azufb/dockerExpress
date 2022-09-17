import { atom } from "recoil";

export const itemListAtom = atom({
    key: 'itemList', // keyには一意の名称を入れる。
    default: []
});

export const filteredItemAtom = atom({
    key: 'filteredItemAtom',
    default: []
});