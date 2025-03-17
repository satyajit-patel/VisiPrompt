import {Link} from "react-router-dom";

function Sketch() {
    return (
        <Link to="/">
            <button className="px-4 py-2 m-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
                Home
            </button>
        </Link>
    )
}

export default Sketch;