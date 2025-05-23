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
import ProjectTeamView from "./views/proyects/ProjectTeamView"
import ProfileView from "./views/profile/ProfileView"
import ProfileLayout from "./layouts/ProfileLayout"
import ChangePasswordView from "./views/profile/ChangePasswordView"

export default function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<AppLoyout/>}>
                    <Route path="/" element={<DashboardView/>} index />
                    <Route path="/projects/create" element={<CreateProjectView/>}  />
                    <Route path="/projects/:projectID/" element={<ProjectView/>}  />
                    <Route path="/projects/:projectID/edit" element={<EditProjectView/>}  />
                    <Route path="/projects/:projectID/team" element={<ProjectTeamView/>}  />
                    <Route element={<ProfileLayout/>}>
                        <Route path="/profile" element={<ProfileView/>}  />
                        <Route path="/profile/password" element={<ChangePasswordView/>}  />
                    </Route>
                </Route>

                <Route element={<AuthLayout/>}>
                    <Route path="/auth/login" element={<LoginView/>} />
                    <Route path="/auth/register" element={<RegisterView/>} />
                    <Route path="/auth/comfirm-account" element={<ConfirmAccountView/>} />
                    <Route path="/auth/request-code" element={<RequestNewCode/>} />
                    <Route path="/auth/forgot-password" element={<ForgotPasswordView/>} />
                    <Route path="/auth/new-password" element={<NewPassword/>} />
                </Route>

                <Route element={<AuthLayout/>}>
                    <Route path="/404" element={<Error404View/>}  />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}