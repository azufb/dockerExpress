import { atom } from "recoil";

export const itemListAtom = atom({
    key: 'itemList', // keyには一意の名称を入れる。
    default: []
});

export const itemDetailAtom = atom({
    key: 'itemDetail',
    default: {
        itemName: '',
        itemPrice: '',
        itemType: '',
        itemCategory: '',
        comment: ''
    }
});

export const itemDetailUpdateTimeAtom = atom({
    key: 'itemDetailUpdateTime',
    default: new Date()
});