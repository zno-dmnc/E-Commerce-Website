import { useNavigate } from "react-router-dom";

export default function Header1() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#FD7755", height: '70px', alignItems: 'center' }}>
            <div className="container d-flex justify-content-start">
                <button onClick={goBack} className="btn btn-outline-light">
                    Back
                </button>
            </div>
        </nav>
    );
}