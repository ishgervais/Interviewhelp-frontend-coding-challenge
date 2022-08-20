import "../assets/styles/Loader.scss";

export default function Loader() {
    return (
        <div className="flex justify-center align-middle w-full" style={{ height: "80vh" }}>
            <div className="spinner-container my-auto">
                <div className="loading-spinner">
                </div>
            </div>
        </div>
    );
}