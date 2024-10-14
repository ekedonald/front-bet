import { Link } from "react-router-dom";

interface LogoPropsType{
  size: "lg" | "md" | "sm"
}

export const Logo = ({ size = 'lg' } :LogoPropsType) => {

  return (
    <Link to="/">
      {
        size === "lg" &&
        <img src="/img/logo.png" alt="Logo" className="h-20 w-auto mr-4" />
      }
      {
        size === "md" &&
        <img src="/img/logo.png" alt="Logo" className="h-12 w-auto mr-4" />
      }
      {
        size === "sm" &&
        <img src="/img/logo.png" alt="Logo" className="h-7 w-auto mr-4" />
      }
    </Link>
  )
}