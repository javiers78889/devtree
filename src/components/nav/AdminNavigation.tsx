type MiComponenteProps = {
    logout: () => void;
  };

export default function AdminNavigatio ({logout}:MiComponenteProps) {
    return (
        <button
            className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
            onClick={logout}
        >
            Cerrar Sesión
        </button>
    )
}
