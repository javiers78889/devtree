import { useEffect, useState } from "react"
import { social } from "../data/social"
import DevTreeInput from "../components/DevTreeInput"
import { isValidUrl } from "../utils/utils"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateUser } from "../Api/DevTreeApi"
import { User } from "../types"



export default function LinkTreeViews() {
  
  const [devTreeLinks, setDevTreeLinks] = useState(social) // Datos base
  const querclient = useQueryClient()
  const usuario: User = querclient.getQueryData(['user'])! // Datos base de datos
  

  useEffect(()=>{
    const datos = devTreeLinks.map( item => {
      const baseDatos = JSON.parse(usuario.links).find(link => link.name === item.name)
      if(baseDatos){
        return {...item, url: baseDatos.url, enabled: baseDatos.enabled}
      }

      return item
      
    })
  
    setDevTreeLinks(datos)
  },[])

  const cambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filtro = devTreeLinks.map(items => items.name === e.target.name ? { ...items, url: e.target.value } : items)
    setDevTreeLinks(filtro)
  
  }

  const { mutate } = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      toast.success('Enlace Actualizado')
      querclient.invalidateQueries({ queryKey: ['user'] })
     

    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const handleEnableLink = (props: string) => {

    const filtro = devTreeLinks.map(items => {
      if (items.name === props) {
        if (isValidUrl(items.url)) {
          if (!items.enabled) {
            toast.success(`La URL de ${items.name} está activa`)
            return { ...items, enabled: !items.enabled }
          } else {
            toast(`La URL de ${items.name} está desactivada`)
            return { ...items, enabled: !items.enabled }
          }

        } else {
          toast.error(`URL de ${items.name} no es valida`)
        }
      }
      return items
    }
    )
    setDevTreeLinks(filtro)
    

      querclient.setQueryData(['user'], (prevData: User) => {

        return {
          ...prevData,
          links: JSON.stringify(filtro)
        }
      })
  


  }

  return (
    <div className="space-y-5">
      {devTreeLinks.map(item => (
        <DevTreeInput key={item.name} item={item} cambio={cambio} handleEnableLink={handleEnableLink} />
      ))}
      <button className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded font-bold" onClick={() => mutate(usuario)}>Guardar Cambios</button>
    </div>
  )
}
