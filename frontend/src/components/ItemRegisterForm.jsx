import { useForm } from 'react-hook-form';

const ItemRegisterForm = () => {
    const { register, handleSubmit } = useForm();
    return (
        <div>
            <h1>商品登録フォーム</h1>
        </div>
    );
};

export default ItemRegisterForm;
