import { useEffect, useState } from "react"
import { social } from "../data/social"
import DevTreeInput from "../components/DevTreeInput"
import { isValidUrl } from "../utils/utils"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateUser } from "../Api/DevTreeApi"
import { SocialNetwork, User } from "../types"




export default function LinkTreeViews() {
  
  const [devTreeLinks, setDevTreeLinks] = useState(social) // Datos base
  const querclient = useQueryClient()
  const usuario: User = querclient.getQueryData(['user'])! // Datos base de datos
  

  useEffect(()=>{
    const datos = devTreeLinks.map( item => {
      const baseDatos = JSON.parse(usuario.links).find((link:SocialNetwork) => link.name === item.name)
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
    onSuccess: () => {
      toast.success('Enlace Actualizado')
      querclient.invalidateQueries({ queryKey: ['user'] })
     

    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
  const enlaces:SocialNetwork[] = JSON.parse(usuario.links)
  
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
    const selected = filtro.find(item => item.name === props)
    let updatedItems : SocialNetwork[]=[]
    if(selected?.enabled){
      const id = enlaces.filter(li => li.id).length+1
      if(enlaces.some(link => link.name === props)){
        updatedItems= enlaces.map(item =>{

          if(item.name === props){
            return {...item,enabled: true, id}
          }else{
            return item
          }

        })
      }else{
        const newItem = {...selected, id}
        updatedItems=[...enlaces, newItem]
      }

    }else{
     const indexToUpdate= enlaces.findIndex((n)=> n.name === props)
     updatedItems = enlaces.map(item =>{
      if(item.name === props){
        return {...item, enabled: false, id:0}
      }else if(item.id > indexToUpdate && (indexToUpdate !== 0 && item.id === 1)){  
        return {
          ...item, id: item.id-1
        }

      }else{

        return item

      }
     })
    }
    
    
      querclient.setQueryData(['user'], (prevData: User) => {

        return {
          ...prevData,
          links: JSON.stringify(updatedItems)
        }
      })
      


  }

  return (
    <div className="space-y-5">
      {devTreeLinks.map(item => (
        <DevTreeInput key={item.name} item={item} cambio={cambio} handleEnableLink={handleEnableLink} />
      ))}
      <button className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded font-bold" onClick={() => mutate(querclient.getQueryData(['user'])! )}>Guardar Cambios</button>
    </div>
  )
}
