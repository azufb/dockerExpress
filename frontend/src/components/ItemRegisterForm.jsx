import { useForm, useFieldArray, Controller } from "react-hook-form";
import itemCategoryData from "../jsData/itemCategoryData";
import { useSetRecoilState } from "recoil";
import { itemListAtom } from "../atoms/itemAtom";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Input, RadioGroup, Radio, Select, Textarea } from "@chakra-ui/react";

const ItemRegisterForm = () => {
    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            itemRegister: [
                {
                    itemName: '',
                    itemPrice: '',
                    itemCategory: '',
                    comment: ''
                }
            ]
        }
    });

    const { fields, append } = useFieldArray({
        control,
        name: 'itemRegister'
    });

    const setItemList = useSetRecoilState(itemListAtom);
    const paramObj = useParams();

    const appendForm = () => {
        if (fields.length + 1 <= 10) {
            return append({ itemName: '', itemPrice: '', itemType: '', itemCategory: '', comment: '' });
        }
    }

    const onSubmit = async (data) => {
        let list = [];

        data.itemRegister.forEach((item) => {
            item.userId = paramObj.userId;

            list = [
                ...list,
                {
                    itemId: item.id,
                    userId: item.userId,
                    itemName: item.itemName,
                    itemPrice: item.itemPrice,
                    itemType: item.itemType,
                    itemCategory: item.itemCategory,
                    comment: item.comment
                }
            ];
            return list;
        });

        await axios
        .post('http://localhost:6868/registerItem', data.itemRegister)
        .then(res => {
            console.log(res);
            setItemList(list);
        });
    }

    return (
        <div>
            <h1>商品登録フォーム</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    {fields.map((form, index) => (
                        <div key={index}>
                            <label>商品名:</label>
                            <Input {...register(`itemRegister.${index}.itemName`)} />
                            <label>価格:</label>
                            <Input {...register(`itemRegister.${index}.itemPrice`)} />
                            <label>分類:</label>
                            <Controller
                                name={`itemRegister.${index}.itemType`}
                                render= {({ field }) => (
                                    <RadioGroup { ...field } defaultValue='actual'>
                                        <Radio value='actual'>現品</Radio>
                                        <Radio value='sample'>サンプル</Radio>
                                    </RadioGroup>
                                )}
                                control={control}
                                defaultValue='actual'
                            />
                            <label>カテゴリー:</label>
                            <Select {...register(`itemRegister.${index}.itemCategory`)}>
                                <option value='' selected>選択してください</option>
                                {itemCategoryData.map((category, index) => (
                                    <option key={index} value={category.value}>{category.name}</option>
                                ))}
                            </Select>
                            <label>コメント:</label>
                            <Textarea {...register(`itemRegister.${index}.comment`)} />
                        </div>
                    ))}
                </div>
                <button type='button' onClick={appendForm}>
                    ＋
                </button>
                <input type="submit" />
            </form>
        </div>
    );
};

export default ItemRegisterForm;
