import { useState } from 'react'
import '../assets/styles/Button.scss'

function Button(props: { description: string, handleOrderChange: Function }) {

    const [order, setOrder] = useState<string>("ASC");
    const [status, setStatus] = useState<string>("INACTIVE");

    const handleClick = () => {
        if (status === "INACTIVE") {
            setStatus("ACTIVE");
            props.handleOrderChange(order);
        } else {
            const newOrder = order === "ASC" ? "DSC" : "ASC";
            setOrder(newOrder);
            props.handleOrderChange(newOrder);
        }
    }

    return (
        <button onClick={handleClick} className={`button flex ${status === "ACTIVE" && "active"}`}>
            <div className="indication align-middle">
                <div className="icon flex justify-center">
                    {
                        order === "ASC" ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M13 7.828V20h-2V7.828l-5.364 5.364-1.414-1.414L12 4l7.778 7.778-1.414 1.414L13 7.828z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M13 16.172l5.364-5.364 1.414 1.414L12 20l-7.778-7.778 1.414-1.414L11 16.172V4h2v12.172z" /></svg>
                    }
                </div>
                <div className="meaning">
                    {
                        order === "ASC" ? 'Ascending' : 'Descending'
                    }
                </div>
            </div>
            <div className="description flex justify-center align-middle w-4/5">{props.description}</div>
        </button>
    )
}

export default Button
