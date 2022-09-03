import { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { userInfoAtom } from "../atoms/userInfoAtom";
import { itemListAtom } from "../atoms/itemAtom";
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
                setItemList((oldItem) => [
                    ...oldItem, 
                    {
                        itemName: res.data.response.itemName,
                        itemPrice: res.data.response.itemPrice,
                        itemType: res.data.response.itemType,
                        itemCategory: res.data.response.itemCategory,
                        comment: res.data.response.comment
                    }
                ]);
            });
        };
        getItems();
    }, []);

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
                </thead>
                <tbody>
                {itemList.map((item, index) => (
                    <tr key={index}>
                        <td>{item.itemName}</td>
                        <td>{item.itemPrice}</td>
                        <td>{item.itemType}</td>
                        <td>{item.itemCategory}</td>
                        <td>{item.comment}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ItemList;