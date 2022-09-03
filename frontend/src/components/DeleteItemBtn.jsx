import { useRecoilValue, useRecoilState } from "recoil";
import { itemListAtom } from "../atoms/itemAtom";
import axios from 'axios';

const DeleteItemBtn = (props) => {
    const [itemList, setItemList] = useRecoilState(itemListAtom);

    const deleteItem = async () => {
        const deletedItemList = itemList.filter((list, index) => {
            return index !== props.index;
        });

        setItemList(deletedItemList);

        const param = {
            userId: props.userId,
            itemId: props.itemId
        };

        await axios
        .post('http://localhost:6868/deleteItems', param)
        .then((res) => {
            console.log(res);
        });
    }


    return (
        <button onClick={deleteItem}>商品削除</button>
    );
};

export default DeleteItemBtn;