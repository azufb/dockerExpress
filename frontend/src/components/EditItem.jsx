import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { itemDetailUpdateTimeAtom } from "../atoms/itemAtom";
import itemCategoryData from "../jsData/itemCategoryData";
import customItemUseDeadlineOptions from '../jsData/customItemUseDeadlineOptions'; 
import { Input, RadioGroup, Radio, Select, Textarea } from "@chakra-ui/react";

const EditItem = (props) => {
    const setItemDetailUpdateTime = useSetRecoilState(itemDetailUpdateTimeAtom);
    const paramObj = useParams();

    console.log(props.defaultCustomItemUseDeadline);

    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            itemName: props.defaultItemName,
            itemPrice: props.defaultItemPrice,
            itemCategory: props.defaultItemCategory,
            customItemUseDeadline: props.defaultCustomItemUseDeadline,
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
            customItemUseDeadline: data.customItemUseDeadline,
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
                <Controller
                    name='itemType'
                    render= {({ field }) => (
                        <RadioGroup { ...field }>
                            <Radio value='actual'>現品</Radio>
                            <Radio value='sample'>サンプル</Radio>
                        </RadioGroup>
                    )}
                    control={control}
                    defaultValue={props.defaultItemType}
                />
                <label>カテゴリー:</label>
                <Select {...register('itemCategory')}>
                    <option value=''>選択してください</option>
                    {itemCategoryData.map((category, index) => (
                        <option key={index} value={category.value}>{category.name}</option>
                    ))}
                </Select>
                <label>使用期限</label>
                <Select  {...register('customItemUseDeadline')}>
                    <option value=''>選択してください</option>
                    {customItemUseDeadlineOptions.map((deadline, index) => (
                        <option key={index} value={deadline.value}>
                            {deadline.value}ヶ月
                            {deadline.data !== '' && <span>({deadline.data})</span>}
                        </option>
                    ))}
                </Select>
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