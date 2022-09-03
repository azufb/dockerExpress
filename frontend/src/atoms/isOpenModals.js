import { atom } from "recoil";

export const isOpenModalsAtom = atom({
    key: 'isOpenModals', // keyには一意の名称を入れる。
    default: {
        editItemModal: false
    }
});