import { BrowserRouter, Route, Routes } from "react-router-dom"
import AppLoyout from "./layouts/AppLoyout"
import DashboardView from "./views/proyects/DashboardView"
import CreateProjectView from "./views/proyects/CreateProjectView"
import EditProjectView from "./views/proyects/EditProjectView"
import Error404View from "./views/404View"
import ProjectView from "./views/proyects/ProjectView"
import LoginView from "./views/auth/LoginView"
import AuthLayout from "./layouts/AuthLayout"
import RegisterView from "./views/auth/RegisterView"
import ConfirmAccountView from "./views/auth/ConfirmAccountView"
import RequestNewCode from "./views/auth/RequestNewCode"
import ForgotPasswordView from "./views/auth/ForgotPasswordView"
import NewPassword from "./views/auth/NewPassword"

export default function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<AppLoyout/>}>
                    <Route path="/" element={<DashboardView/>} index />
                    <Route path="/projects/create" element={<CreateProjectView/>}  />
                    <Route path="/projects/:projectID/" element={<ProjectView/>}  />
                    <Route path="/projects/:projectID/edit" element={<EditProjectView/>}  />
                    <Route path="/404" element={<Error404View/>}  />
                </Route>
                <Route element={<AuthLayout/>}>
                    <Route path="/auth/login" element={<LoginView/>} />
                    <Route path="/auth/register" element={<RegisterView/>} />
                    <Route path="/auth/comfirm-account" element={<ConfirmAccountView/>} />
                    <Route path="/auth/request-code" element={<RequestNewCode/>} />
                    <Route path="/auth/forgot-password" element={<ForgotPasswordView/>} />
                    <Route path="/auth/new-password" element={<NewPassword/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}