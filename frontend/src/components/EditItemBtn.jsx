import { useRecoilState } from "recoil";
import { isOpenModalsAtom } from '../atoms/isOpenModals';
import axios from 'axios';

const EditItemBtn = () => {
    const [isOpenEditItemModal, setIsOpenEditItemModal] = useRecoilState(isOpenModalsAtom);

    const openEditItemModal = () => {
        const paramBool = {
            editItemModal: true
        };

        setIsOpenEditItemModal(paramBool);
    };

    return (
        <button onClick={openEditItemModal}>編集</button>
    );
};

export default EditItemBtn;