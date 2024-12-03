import Header from "../component/header"
import ItemCard from "../component/ItemCard"

export default function CustomerHome(){
    const cards = Array(12).fill(0);

    return(
        <div>
        <Header />
        <div className="container mt-4">
                <div className="row">
                    {cards.map((_, index) => (
                        <div className="col-md-6" key={index}>
                            <ItemCard />
                        </div>
                    ))}
                </div>
            </div>
    </div>
    )
}