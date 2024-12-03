
import SellerHeader from "../component/SellerHeader"
import SellerSentCard from "../component/SellerSentCard"
export default function SellerSent() {
    const card = Array(12).fill(0);
    return (
       <div>
            <SellerHeader />
            <div className="container">
                <div className="row">
                    {card.map((_, index) => (
                        <div className="col-4" key={index}>
                            <SellerSentCard />
                        </div>
                    ))}
                </div>
       </div>
    </div>
        
    )


}