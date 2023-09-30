import React, {useEffect, useState} from "react";

function FilterProducts({productsPageable}){
    let [platforms, setPlatforms] = useState([]);

    useEffect(() => {
        function getPlatforms(){
            let uniquePlatforms = []
            for (const product of productsPageable.content) {
                let platform = product.platformDto.name;
                if(!uniquePlatforms?.includes(platform)){
                    uniquePlatforms.push(platform)
                }
            }
            setPlatforms(uniquePlatforms);
        }
        if(productsPageable !== null){
            getPlatforms()}
    }, [productsPageable]);

    return(
        <div className="filter-container">
            <label><p>Sort By</p>
                <select className={"filter"}>
                    <option  className={"filter-option"}>Sort By</option>

                </select>
            </label>
            <label><p>Platform</p>
                <select className={"filter"}>
                    {platforms?.map((platform, index) => (
                        <option key={index} className={"filter-option"}>{platform}</option>
                        ))}
                </select>
            </label>
            <label><p>Region</p>
                <select className={"filter"}>
                    <option className={"filter-option"}>Op</option>
                </select>
            </label>
            <label><p>Price</p>
                <select className={"filter"}>
                    <option className={"filter-option"}>Op</option>
                </select>
            </label>
            <label><p>Genre</p>
                <select  className={"filter"}>
                    <option className={"filter-option"}>Oasdap</option>
                </select>
            </label>
            <label><p>Language</p>
                <select  className={"filter"}>
                    <option className={"filter-option"}>Opdadadad</option>
                </select>
            </label>
        </div>
    )
}
export default FilterProducts;