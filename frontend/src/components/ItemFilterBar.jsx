import itemCategoryData from "../jsData/itemCategoryData";
import { useSetRecoilState } from "recoil";
import { itemListAtom } from "../atoms/itemAtom";
import axios from 'axios';

const ItemFilterBar = () => {
    const setItemList = useSetRecoilState(itemListAtom);
    let categoryList = [];

    const selectCategory = (category, index) => {
        console.log(category);
        console.log(index);
        const value = category.value
        categoryList = [...categoryList, value];
        console.log(categoryList);
    };

    const filtering = async () => {
        let resData;
        const param = {
            keywords: categoryList
        };

        await axios
        .post('http://localhost:6868/filtering', param)
        .then(res => {
            console.log('res:', res);
            resData = res.data.response;
        });

        setItemList(resData);
    };

    return (
        <div>
            {itemCategoryData.map((category, index) => (
                <span key={index} onClick={() => selectCategory(category, index)}>#{category.name}</span>
            ))}

            <button onClick={() => filtering()}>フィルター</button>
        </div>
    );
};

export default ItemFilterBar;