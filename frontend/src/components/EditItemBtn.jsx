import { useSetRecoilState } from "recoil";
import { isOpenModalsAtom } from '../atoms/isOpenModals';

const EditItemBtn = () => {
    const setIsOpenEditItemModal = useSetRecoilState(isOpenModalsAtom);

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