import { useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
import { itemListAtom } from "../atoms/itemAtom";
import { isOpenModalsAtom } from '../atoms/isOpenModals';
import EditItemBtn from './EditItemBtn';
import EditItem from './EditItem';

const ItemDetail = () => {
    const items = useRecoilValue(itemListAtom);
    const isOpenEditModal = useRecoilValue(isOpenModalsAtom);
    const paramObj = useParams();
    const itemId = paramObj.itemId;


    return (
        <div>
            <h1>商品詳細</h1>
            <div>
                <EditItemBtn />
            </div>
            {items.filter((list) => list.itemId === parseInt(itemId)).map((item) => (
                <>
                    <label>商品名</label>
                    <p>{item.itemName}</p>
                    <label>価格</label>
                    <p>{item.itemPrice}</p>
                    <label>商品タイプ</label>
                    <p>{item.itemType}</p>
                    <label>カテゴリ</label>
                    <p>{item.itemCategory}</p>
                    <label>コメント</label>
                    <p>{item.comment}</p>
                </>
            ))}
            <div>
                {isOpenEditModal.editItemModal && (
                    <EditItem />
                )}
            </div>
        </div>
    );
};

export default ItemDetail;