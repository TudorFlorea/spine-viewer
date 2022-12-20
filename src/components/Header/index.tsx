import "./Header.css"
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const Header = () => {

    return (
        <header className="header">
            <div className="header__content-wrapper">
                <Logo />
                <ThemeToggle />
            </div>
        </header>
    );
};

export default Header;