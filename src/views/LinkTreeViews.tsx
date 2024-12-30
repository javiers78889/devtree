import { useState } from "react"
import { social } from "../data/social"
import DevTreeInput from "../components/DevTreeInput"
import { isValidUrl } from "../utils/utils"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"
import { updateUser } from "../Api/DevTreeApi"
import { isAxiosError } from "axios"


export default function LinkTreeViews() {
  const [devTreeLinks, setDevTreeLinks] = useState(social)
  const cambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filtro = devTreeLinks.map(items => items.name === e.target.name ? { ...items, url: e.target.value } : items)
    setDevTreeLinks(filtro)
  }

  const handleEnableLink = (props: string) => {
    const filtro = devTreeLinks.map(items => {
      if (items.name === props) {
        if (isValidUrl(items.url)) {
            if(!items.enabled){
              toast.success(`La URL de ${items.name} está activa`)
              return { ...items, enabled: !items.enabled }
            }else{
              toast(`La URL de ${items.name} está desactivada`)
            }
     
        } else {
          toast.error(`URL de ${items.name} no es valida`)
        }
      }
      return items
    }


    )

    setDevTreeLinks(filtro)

  }
  const {mutate} = useMutation({
    mutationFn: updateUser,
    onSuccess:()=>{
      toast.success('Enlace Actualizado')

    },
    onError:(error)=>{
        toast.error(error.message)
    }
  })
  return (
    <div className="space-y-5">
      {devTreeLinks.map(item => (
        <DevTreeInput key={item.name} item={item} cambio={cambio} handleEnableLink={handleEnableLink} />
      ))}
      <button className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded font-bold">Guardar Cambios</button>
    </div>
  )
}
