import { useForm, useFieldArray } from "react-hook-form";

const ItemRegisterForm = () => {
    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            itemRegister: [
                {
                    itemName: '',
                    itemPrice: '',
                    itemType: 'actual',
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

    return (
        <div>
            <h1>商品登録フォーム</h1>
            <form onSubmit={ handleSubmit() }>
                <div>
                    {fields.map((form, index) => (
                        <div key={index}>
                            <label>商品名:</label>
                            <input {...register(`itemRegister.${index}.itemName`)} />
                            <label>価格:</label>
                            <input {...register(`itemRegister.${index}.itemPrice`)} />
                            <label>分類:</label>
                            <select {...register(`itemRegister.${index}.itemType`)}>
                                <option value='actual' selected>現品</option>
                                <option value='sample'>サンプル</option>
                            </select>
                            <label>カテゴリー:</label>
                            <input {...register(`itemRegister.${index}.itemCategory`)} />
                            <label>コメント:</label>
                            <input {...register(`itemRegister.${index}.comment`)} />
                        </div>
                    ))}
                </div>
                <button type='button' onClick={() => append({ itemName: '', itemPrice: '', itemType: 'actual', itemCategory: '', comment: '' })}>
                    ＋
                </button>
                <input type="submit" />
            </form>
        </div>
    );
};

export default ItemRegisterForm;
