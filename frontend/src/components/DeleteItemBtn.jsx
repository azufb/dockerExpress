import axios from 'axios';

const DeleteItemBtn = (props) => {
    const deleteItem = async () => {
        const param = {
            userId: props.userId,
            itemId: props.itemId
        };

        await axios
        .post('http://localhost:6868/deleteItems', param)
        .then((res) => {
            console.log(res);
        });
    }


    return (
        <button onClick={deleteItem}>商品削除</button>
    );
};

export default DeleteItemBtn;