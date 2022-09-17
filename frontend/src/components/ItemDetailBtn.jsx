import { useNavigate } from "react-router-dom";

const ItemDetailBtn = (props) => {
    const navigate = useNavigate();

    const moveToItemDetailPage = () => {
        navigate(`../ItemDetail/${props.itemId}`);
    };

    return (
        <button onClick={moveToItemDetailPage}>商品詳細</button>
    );
};

export default ItemDetailBtn;