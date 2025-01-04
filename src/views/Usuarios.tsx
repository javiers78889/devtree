import { DevTreeUser, SocialNetwork } from '../types'
import DevTreeLinks from '../components/DevTreeLinks'

type usuario = {
    data: DevTreeUser
}

export default function Usuarios({ data }: usuario) {
    const links: SocialNetwork[] = JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled)
    return (
        <div className='space-y-6 text-white'>
            <p className='text-5xl text-center font-black'>{data.name}</p>
            {data.image && <img src={data.image} className='max-w-[250px] mx-auto' />}
            <p className='text-lg text-center font-bold'>{data.description}</p>
            {
                  <div className="mt-20 flex flex-col gap-5">
                
                 
                  { links.length > 0?(
                  links.map(link => (
                    <a key={link.name} href={link.url} target='_blank' rel="noreferrer noopener">
                      <DevTreeLinks  link={link} />
                      </a>
                  ))
                ):(
                    <p className='text-center text-bold text-5xl'>No hay enlaces</p>
                )}
              </div>
            }
        </div>
    )
}
