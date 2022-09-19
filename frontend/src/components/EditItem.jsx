import itemCategoryData from "../jsData/itemCategoryData";

const EditItem = () => {
    return (
        <>
            <h1>商品編集</h1>
            <form>
                <label>商品名:</label>
                <input />
                <label>価格:</label>
                <input />
                <label>分類:</label>
                <select>
                    <option value='' selected>選択してください</option>
                    <option value='actual'>現品</option>
                    <option value='sample'>サンプル</option>
                </select>
                <label>カテゴリー:</label>
                <select>
                    <option value='' selected>選択してください</option>
                    {itemCategoryData.map((category, index) => (
                        <option key={index} value={category.value}>{category.name}</option>
                    ))}
                </select>
                <label>コメント:</label>
                <input />
            </form>
        </>
    );
};

export default EditItem;