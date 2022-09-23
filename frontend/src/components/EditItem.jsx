import axios from "axios";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { itemDetailUpdateTimeAtom } from "../atoms/itemAtom";
import itemCategoryData from "../jsData/itemCategoryData";
import { Input, Textarea } from "@chakra-ui/react";

const EditItem = (props) => {
    const setItemDetailUpdateTime = useSetRecoilState(itemDetailUpdateTimeAtom);
    const paramObj = useParams();

    const { register, handleSubmit } = useForm({
        defaultValues: {
            itemName: props.defaultItemName,
            itemPrice: props.defaultItemPrice,
            itemType: props.defaultItemType,
            itemCategory: props.defaultItemCategory,
            comment: props.defaultComment
        }
    });

    const updateData = async (data) => {
        const param = {
            userId: paramObj.userId,
            itemId: paramObj.itemId,
            itemName: data.itemName,
            itemPrice: data.itemPrice,
            itemType: data.itemType,
            itemCategory: data.itemCategory,
            comment: data.comment
        };

        await axios
        .post('http://localhost:6868/updateItemData', param)
        .then((res) => {
            console.log(res.data);
            const now = new Date();
            setItemDetailUpdateTime(now);
        });
    }

    return (
        <>
            <h1>商品編集</h1>
            <form onSubmit={handleSubmit(updateData)}>
                <label>商品名:</label>
                <Input {...register('itemName')} />
                <label>価格:</label>
                <Input {...register('itemPrice')} />
                <label>分類:</label>
                <select {...register('itemType')}>
                    <option value='' selected>選択してください</option>
                    <option value='actual'>現品</option>
                    <option value='sample'>サンプル</option>
                </select>
                <label>カテゴリー:</label>
                <select {...register('itemCategory')}>
                    <option value='' selected>選択してください</option>
                    {itemCategoryData.map((category, index) => (
                        <option key={index} value={category.value}>{category.name}</option>
                    ))}
                </select>
                <label>コメント:</label>
                <Textarea {...register('comment')} />
                <div>
                    <button type='submit'>更新</button>
                </div>
            </form>
        </>
    );
};

export default EditItem;