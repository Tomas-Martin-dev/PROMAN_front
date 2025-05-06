import { NavLink } from "react-router-dom";
import NavMenu from "./Projects/Menu";
import { user } from "../types";

type Props = {
    data: user
}

export default function Header({data}: Props) {
    return (
        <>
            <header className='bg-gray-800 py-5'>
                <div className='max-w-11/12 mx-auto flex flex-col lg:flex-row justify-between items-center gap-4'>
                    <div className='w-64'>
                        <NavLink
                            to={"/"}
                            className={({ isActive }) => (isActive ? "cursor-default" : "cursor-pointer")}
                        >
                            <img src="/log.png" alt="logo" />
                        </NavLink>
                    </div>
                    <NavMenu data={data}/>
                </div>
            </header>
        </>
    )
}
