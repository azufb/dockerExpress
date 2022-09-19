import { useForm } from "react-hook-form";
import itemCategoryData from "../jsData/itemCategoryData";

const EditItem = (props) => {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            itemName: props.defaultItemName,
            itemPrice: props.defaultItemPrice,
            itemType: props.defaultItemType,
            itemCategory: props.defaultItemCategory,
            comment: props.defaultComment
        }
    });

    console.log(props);
    return (
        <>
            <h1>商品編集</h1>
            <form>
                <label>商品名:</label>
                <input {...register('itemName')} />
                <label>価格:</label>
                <input {...register('itemPrice')} />
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
                <input {...register('comment')} />
            </form>
        </>
    );
};

export default EditItem;