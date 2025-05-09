import { Link } from "react-router-dom";

export default function Error404View() {
  return (
    <>
      <h1 className="font-bold text-center text-4xl text-white">Pagina No Encontrada</h1>
      <p className="mt-10 text-center text-white text-xl font-semibold">
        <Link className=" text-fuchsia-500" to={"/"}>Volver a Proyectos</Link>
      </p>
    </>
  )
}
