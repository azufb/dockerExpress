import { useRecoilValue } from "recoil";
import { itemListAtom } from "../atoms/itemAtoms";

const ItemList = () => {
    const itemList = useRecoilValue(itemListAtom);

    return (
        <div>
            {itemList.map((item, index) => (
                <p key={index}>{item.name}</p>
            ))}
        </div>
    );
};

export default ItemList;