import { useForm, useFieldArray } from "react-hook-form";

const ItemRegisterForm = () => {
    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            itemRegister: [
                {
                    itemName: '',
                    itemPrice: '',
                    itemType: '',
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
                                <option value='' selected>選択してください</option>
                                <option value='actual'>現品</option>
                                <option value='sample'>サンプル</option>
                            </select>
                            <label>カテゴリー:</label>
                            <select {...register(`itemRegister.${index}.itemCategory`)}>
                                <option value='' selected>選択してください</option>
                                <option value='toner'>拭き取り化粧水</option>
                                <option value='lotion'>化粧水</option>
                                <option value='faceMask'>フェイスマスク</option>
                                <option value='emulsion'>乳液</option>
                                <option value='serum'>美容液</option>
                                <option value='cream'>クリーム</option>
                                <option value='bb/cc'>BB/CCクリーム</option>
                                <option value='primer'>下地</option>
                                <option value='foundation'>ファンデーション</option>
                                <option value='controlColor'>コントロールカラー</option>
                                <option value='concealer'>コンシーラー</option>
                                <option value='highlightingPowder'>ハイライト</option>
                                <option value='blush'>チーク</option>
                                <option value='lip'>口紅</option>
                                <option value='eyebrow'>アイブロウ</option>
                                <option value='eyeliner'>アイライナー</option>
                                <option value='eyeShadow'>アイシャドウ</option>
                                <option value='mascaraPrimer'>マスカラ下地</option>
                                <option value='mascara'>マスカラ</option>
                                <option value='other'>そのほか</option>
                            </select>
                            <label>コメント:</label>
                            <input {...register(`itemRegister.${index}.comment`)} />
                        </div>
                    ))}
                </div>
                <button type='button' onClick={() => append({ itemName: '', itemPrice: '', itemType: '', itemCategory: '', comment: '' })}>
                    ＋
                </button>
                <input type="submit" />
            </form>
        </div>
    );
};

export default ItemRegisterForm;
