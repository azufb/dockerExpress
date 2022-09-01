import { selector } from "recoil"
import { itemListAtom } from "../atoms/itemAtom";

const itemSelector = selector({
    key: 'FilteredItemList',
    get: ({get}) => {
        const list = get(itemListAtom);

        return list;
    },
});

export default itemSelector;
