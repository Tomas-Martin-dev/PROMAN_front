import { Outlet } from "react-router-dom";
import Tabs from "../components/Profile/Tabs";

export default function ProfileLayout() {
  return (
    <>
        <Tabs/>
        <Outlet/>
    </>
  )
}
