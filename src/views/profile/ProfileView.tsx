import { useAuth } from '../../hooks/useAuth'
import ProfileForm from '../../components/Profile/ProfileForm'

export default function ProfileView() {
  const { data, isLoading} = useAuth()
  if (isLoading) "Cargando..."
  if (data) return <ProfileForm data={data}/>
}
