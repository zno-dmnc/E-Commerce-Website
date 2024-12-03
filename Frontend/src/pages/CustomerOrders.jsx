import OrderCard from "../component/OrderCard"
import Header from "../component/header"

export default function CustomerOrders(){
    const cards = Array(6).fill(0); // Example array to render 6 cards

    return (
        <div>
            <Header />
            <div className="container mt-4">
                <div className="row">
                    {cards.map((_, index) => (
                        <div className="col-md-6" key={index}>
                            <OrderCard />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}