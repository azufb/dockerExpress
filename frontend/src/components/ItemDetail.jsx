import { useRecoilValue, useRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import { itemListAtom, filteredItemAtom } from "../atoms/itemAtom";
import { useEffect } from "react";

const ItemDetail = () => {
    const items = useRecoilValue(itemListAtom);
    const [filteredItem, setFilteredItem] = useRecoilState(filteredItemAtom);
    const paramObj = useParams();
    const itemId = paramObj.itemId;

    useEffect(() => {
        const filtered = items.filter((item) => {
            return item.itemId === itemId;
        });

        setFilteredItem(filtered);
    }, []);

    return (
        <div>
            <h1>商品詳細</h1>
            {filteredItem.map((item) => (
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
        </div>
    );
};

export default ItemDetail;