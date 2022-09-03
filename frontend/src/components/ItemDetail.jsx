const ItemDetail = (props) => {
    return (
        <div>
            <h1>商品詳細</h1>
            <label>商品名</label>
            <p>{props.item.itemName}</p>
            <label>価格</label>
            <p>{props.item.itemPrice}</p>
            <label>商品タイプ</label>
            <p>{props.item.itemType}</p>
            <label>カテゴリ</label>
            <p>{props.item.itemCategory}</p>
            <label>コメント</label>
            <p>{props.item.comment}</p>
        </div>
    );
};

export default ItemDetail;