import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { itemListAtom } from "../atoms/itemAtom";
import DeleteItemBtn from "./DeleteItemBtn";
import ItemDetailBtn from "./ItemDetailBtn";
import axios from 'axios';
import { useParams, Outlet } from "react-router-dom";
import ItemFilterBar from "./ItemFilterBar";

const ItemList = () => {
    const [itemList, setItemList] = useRecoilState(itemListAtom);
    const paramObj = useParams();

    useEffect(() => {
        const param = {
            'userId': paramObj.userId
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
                            itemOpenDate: responseItem.itemOpenDate,
                            comment: responseItem.comment
                        }
                    ];

                    return list;
                });

                setItemList(list);

                // 本日の日付
                const today = new Date();
                const todayTime = today.getTime();
                const deadlineMonthDefault = parseInt(process.env.REACT_APP_DEADLINE_DEFAULT);


                Promise.all(list.map(async (listData) => {
                    const listItemOpenDate = new Date(listData.itemOpenDate);
                    const itemOpenDateMonth = listItemOpenDate.getMonth();
                    const deadlineDate = listItemOpenDate.setMonth(itemOpenDateMonth + Number(deadlineMonthDefault));

                    
                    const mailParam = {
                        itemId: listData.itemId,
                        itemName: listData.itemName
                    };

                    if (deadlineDate <= todayTime) {
                        console.log('期限日:', deadlineDate);
                        console.log('今日:', todayTime);
                        console.log('設定af1:', listItemOpenDate);
                        await axios
                        .post('http://localhost:6868/sendEmail', mailParam)
                        .then((res) => {
                            console.log(res);
                            console.log('メール通知実行。');
                        });
                    } else {
                        console.log('期限日:', deadlineDate);
                        console.log('今日:', todayTime);
                        console.log('通知不要。');
                        console.log('設定af2:', listItemOpenDate);
                    }
                }));
                
            });


        };
        getItems();
    }, [paramObj.userId]);

    return (
        <div>
            <ItemFilterBar />
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
                            <ItemDetailBtn itemId={item.itemId} />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Outlet />
        </div>
    );
};

export default ItemList;