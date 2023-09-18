import Menu from "../components/Menu"
function Home() {
    return (
        <div className={"main-div"}>
            <Menu />
            <div className={"products-div"}>
                <div className={"sections"}>
                    <ul>
                        <li className={"section-list"}>News</li>
                        <li className={"section-list"}>Promotions</li>
                        <li className={"section-list"}>Secondhand</li>
                        <li className={"section-list"}>Preorder</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Home;
