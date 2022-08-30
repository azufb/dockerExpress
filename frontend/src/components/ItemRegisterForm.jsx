const ItemRegisterForm = () => {
    return (
        <div>
            <h1>フォーム</h1>
            <div>
                <label>商品名:</label>
                <input name='itemName' />
                <label>価格:</label>
                <input name='itemPrice' />
                <label>分類:</label>
                <select name='itemType'>
                    <option value='現品' selected>現品</option>
                    <option value='サンプル'>サンプル</option>
                </select>
                <label>カテゴリー:</label>
                <input name='itemCategory' />
                <label>コメント:</label>
                <input name='comment' />
            </div>
        </div>
    );
};

export default ItemRegisterForm;
