import { SocialNetwork } from "../types"
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type Devtree = {
    link: SocialNetwork
}

export default function DevTreeLinks({ link }: Devtree) {
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({
        id: link.id
    })
    const style={
        transform: CSS.Transform.toString(transform),
        transition

    }
    return (
        <li 
        ref={setNodeRef}
        style={style} 
        className="bg-white px-5 py-2 flex items-center gap-5 rounded-lg"
        {...attributes}
        {...listeners}>
            <div className="w-12 h-12 bg-cover" style={{ backgroundImage: `url(/social/icon_${link.name}.svg)` }}>
            </div>
                <p className="capitalize text-black">Visita Mi: <span className="font-bold text-black">{link.name}</span></p>
        </li>
    )
}
