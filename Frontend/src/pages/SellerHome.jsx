import SellerHeader from "../component/SellerHeader";
import SellerOrderCard from "../component/SellerOrderCard"

export default function SellerHome(){
    const cards = Array(12).fill(0);

    return (
        <div>
            <SellerHeader />
            <div className="container">
                <div className="row">
                    {cards.map((_, index) => (
                        <div className="col-4" key={index}>
                            <SellerOrderCard />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )


}