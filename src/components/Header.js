import { Link } from "react-router-dom"
export default function Header() {
    return (
        <header>
            <div className="search-bar item">
                <input />
                <button><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>

            <div className="title item">
                <h1 className="title1">Reader</h1>
            </div>

            <div className="acc-icon item">
                {/* <Link className="acc-link" >AC</Link> */}
                <Link to={'/login'}>Sign in</Link>
            </div>
        </header>
    )
}