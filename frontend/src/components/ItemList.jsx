import { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { userInfoAtom } from "../atoms/userInfoAtom";
import { itemListAtom } from "../atoms/itemAtom";
import DeleteItemBtn from "./DeleteItemBtn";
import EditItemBtn from "./EditItemBtn";
import ItemDetailBtn from "./ItemDetailBtn";
import axios from 'axios';

const ItemList = () => {
    const userId = useRecoilValue(userInfoAtom);
    const [itemList, setItemList] = useRecoilState(itemListAtom);

    useEffect(() => {
        const param = {
            'userId': userId
        };

        const getItems = async () => {
            await axios
            .post('http://localhost:6868/getItems', param)
            .then(res => {
                console.log(res.data.response);
                const resItemData = res.data.response;
                let list = [];
                
                resItemData.forEach((responseItem) => {
                    list = [
                        ...list,
                        {
                            itemId: responseItem.id,
                            userId: responseItem.userId,
                            itemName: responseItem.itemName,
                            itemPrice: responseItem.itemPrice,
                            itemType: responseItem.itemType,
                            itemCategory: responseItem.itemCategory,
                            comment: responseItem.comment
                        }
                    ];

                    return list;
                });

                setItemList(list);
            });
        };
        getItems();
    }, [itemList, setItemList, userId]);

    return (
        <div>
            <div>一覧</div>
            <table>
                <thead>
                    <th>商品名</th>
                    <th>価格</th>
                    <th>タイプ</th>
                    <th>商品カテゴリ</th>
                    <th>コメント</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </thead>
                <tbody>
                {itemList.map((item, index) => (
                    <tr key={index}>
                        <td>{item.itemName}</td>
                        <td>{item.itemPrice}</td>
                        <td>{item.itemType}</td>
                        <td>{item.itemCategory}</td>
                        <td>{item.comment}</td>
                        <td>
                            <DeleteItemBtn userId={item.userId} itemId={item.itemId} index={index} />
                        </td>
                        <td>
                            <EditItemBtn />
                        </td>
                        <td>
                            <ItemDetailBtn item={item} />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ItemList;