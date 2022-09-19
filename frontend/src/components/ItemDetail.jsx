import { useEffect } from 'react';
import { useRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import { itemDetailAtom } from "../atoms/itemAtom";
import { isOpenModalsAtom } from '../atoms/isOpenModals';
import EditItem from './EditItem';
import axios from 'axios';

const ItemDetail = () => {
    const [isOpenEditModal, setIsOpenEditItemModal] = useRecoilState(isOpenModalsAtom);
    const [itemDetail, setItemDetail] = useRecoilState(itemDetailAtom);
    const paramObj = useParams();

    useEffect(() => {
        const getItem = async () => {
            let resData;

            const param = {
                userId: paramObj.userId,
                itemId: paramObj.itemId
            }
            await axios
            .post('http://localhost:6868/getItem', param)
            .then((res) => {
                console.log(res.data.response);
                resData = res.data
            });

            if (resData.status === 200) {
                const getItemParam = {
                    itemName: resData.response.itemName,
                    itemPrice: resData.response.itemPrice,
                    itemType: resData.response.itemType,
                    itemCategory: resData.response.itemCategory,
                    comment: resData.response.comment
                }

                setItemDetail(getItemParam);
            }

        };

        getItem();
    }, [paramObj.itemId, paramObj.userId, setItemDetail]);

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
            <label>商品名</label>
            <p>{itemDetail.itemName}</p>
            <label>価格</label>
            <p>{itemDetail.itemPrice}</p>
            <label>商品タイプ</label>
            <p>{itemDetail.itemType}</p>
            <label>カテゴリ</label>
            <p>{itemDetail.itemCategory}</p>
            <label>コメント</label>
            <p>{itemDetail.comment}</p>

            <div>
                {isOpenEditModal.editItemModal && (
                    <EditItem
                        defaultItemName={itemDetail.itemName}
                        defaultItemPrice={itemDetail.itemPrice}
                        defaultItemType={itemDetail.itemType}
                        defaultItemCategory={itemDetail.itemCategory}
                        defaultComment={itemDetail.comment}
                    />
                )}
            </div>
        </div>
    );
};

export default ItemDetail;