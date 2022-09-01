import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { userInfoAtom } from "../atoms/userInfoAtom";
import { itemListAtom } from "../atoms/itemAtom";
import itemSelector from "../selectors/itemSelector";
import axios from 'axios';

const ItemList = () => {
    const userId = useRecoilValue(userInfoAtom);
    const [itemList, setItemList] = useRecoilState(itemListAtom);
    //const itemList = useRecoilValue(itemSelector);

    useEffect(() => {
        let data;
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
                console.log(itemList.length);
                console.log(itemList);
            });
        };
        getItems();
    }, []);

    return (
        <div>
            <div>一覧</div>
        </div>
    );
};

export default ItemList;