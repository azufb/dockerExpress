import { useRef } from 'react';
import { useRecoilValue, useRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import { itemListAtom } from "../atoms/itemAtom";
import { isOpenModalsAtom } from '../atoms/isOpenModals';
import EditItem from './EditItem';

const ItemDetail = () => {
    const items = useRecoilValue(itemListAtom);
    const [isOpenEditModal, setIsOpenEditItemModal] = useRecoilState(isOpenModalsAtom);
    const paramObj = useParams();
    const itemId = paramObj.itemId;
    const refItemName = useRef('');
    const refItemPrice = useRef('');
    const refItemType = useRef('');
    const refItemCategory = useRef('');
    const refItemComment = useRef('');
    let defaultItemName = refItemName.current.innerText;
    let defaultItemPrice = refItemPrice.current.innerText;
    let defaultItemType = refItemType.current.innerText;
    let defaultItemCategory = refItemCategory.current.innerText;
    let defaultComment = refItemComment.current.innerText;

    const openEditItemModal = () => {
        const paramBool = {
            editItemModal: true
        };

        setIsOpenEditItemModal(paramBool);
    };

    return (
        <div>
            <h1>商品詳細</h1>
            <div>
                <button onClick={openEditItemModal}>編集</button>
            </div>
            {items.filter((list) => list.itemId === parseInt(itemId)).map((item) => (
                <>
                    <label>商品名</label>
                    <p ref={refItemName}>{item.itemName}</p>
                    <label>価格</label>
                    <p ref={refItemPrice}>{item.itemPrice}</p>
                    <label>商品タイプ</label>
                    <p ref={refItemType}>{item.itemType}</p>
                    <label>カテゴリ</label>
                    <p ref={refItemCategory}>{item.itemCategory}</p>
                    <label>コメント</label>
                    <p ref={refItemComment}>{item.comment}</p>
                </>
            ))}
            <div>
                {isOpenEditModal.editItemModal && (
                    <EditItem
                        defaultItemName={defaultItemName}
                        defaultItemPrice={defaultItemPrice}
                        defaultItemType={defaultItemType}
                        defaultItemCategory={defaultItemCategory}
                        defaultComment={defaultComment}
                    />
                )}
            </div>
        </div>
    );
};

export default ItemDetail;