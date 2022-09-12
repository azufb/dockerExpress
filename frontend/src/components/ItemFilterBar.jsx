import itemCategoryData from "../jsData/itemCategoryData";
import axios from 'axios';

const ItemFilterBar = () => {
    let categoryList = [];

    const selectCategory = (category, index) => {
        console.log(category);
        console.log(index);
        const value = category.value
        categoryList = [...categoryList, value];
        console.log(categoryList);
    };

    const filtering = async () => {
        //
        const param = {
            keywords: categoryList
        };

        await axios
        .post('http://localhost:6868/filtering', param)
        .then(res => {
            console.log('res:', res);
        });
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