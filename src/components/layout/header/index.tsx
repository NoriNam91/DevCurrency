import style from './header.module.css'
import { Link } from 'react-router-dom'
import logoImg from '../../../assets/logo.svg'

export function Header(){
    return(
        <header className={style.container}>
        <div>
        <Link to="/">
            <img src={logoImg} alt="Logo Cripto" />
            </Link>
        </div>
        </header>
    )
}