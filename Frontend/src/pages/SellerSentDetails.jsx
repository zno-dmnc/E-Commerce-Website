import Header1 from "../component/Header1"

export default function SellerSentDetails() {
    return(
        <div>
        <Header1 />
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <img src="https://via.placeholder.com/500/FF0000/FFFFFF?text=Item+Image" alt="Item" className="img-fluid" />
                        </div>
                        <div className="col-md-6 d-flex flex-column justify-content-between">
                            <div>
                                <h2>Item Name</h2>
                                <h4>Item Price</h4>
                                <p>Item Description</p>
                                <p>Customer Name</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )

}
