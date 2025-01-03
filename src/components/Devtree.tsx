import { Link, Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import NavigationTabs from "./NavigationTabs";
import { SocialNetwork, User } from "../types";
import { useEffect, useState } from "react";
import DevTreeLinks from "./DevTreeLinks";
import { useQueryClient } from "@tanstack/react-query";
import Header from "./Header";

type devtree = {
    data: User
}

export default function Devtree({ data }: devtree) {
    const [enabledLink, setEnabledLink] = useState<SocialNetwork[]>(JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled))

    useEffect(() => {
        setEnabledLink(JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled))
    }, [data])

    const queryclient = useQueryClient()
    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e
        if (over && over.id) {
            const prevIndex = enabledLink.findIndex(link => link.id === active.id)
            const newIndex = enabledLink.findIndex(link => link.id === over.id)
            const order = arrayMove(enabledLink, prevIndex, newIndex)
            setEnabledLink(order)
            const disabledLinks: SocialNetwork[] = JSON.parse(data.links).filter((link: SocialNetwork) => !link.enabled)
            const links = order.concat(disabledLinks)
            queryclient.setQueryData(['user'], (prevData: User) => {

                return {
                    ...prevData, links: JSON.stringify(links)
                }
            })
        }

    }
    return (
        <>
            <Header />
            <div className="bg-gray-100  min-h-screen py-10">
                <main className="mx-auto max-w-5xl p-10 md:p-0">
                    <NavigationTabs />

                    <div className="flex justify-end">
                        <Link
                            className="font-bold text-right text-slate-800 text-2xl"
                            to={`/${data.handle}`}
                            target="_blank"
                            rel="noreferrer noopener"
                        >Visitar Mi Perfil /{data.handle}</Link>
                    </div>

                    <div className="flex flex-col md:flex-row gap-10 mt-10">
                        <div className="flex-1 ">
                            <Outlet />
                        </div>
                        <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6">
                            <p className="text-4xl text-center text-white">{data.handle}</p>
                            <img src={data.image} alt="imagen de perfil" className="mx-auto max-w[250px]" />
                            <p className="text-center text-lg font-black text-white">{data.description}</p>

                            <p className="text-white"></p>
                            <DndContext
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}>
                                <div className="mt-20 flex flex-col gap-5">
                                    <SortableContext
                                        items={enabledLink}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {enabledLink.map(link => (
                                            <DevTreeLinks key={link.name} link={link} />
                                        ))}
                                    </SortableContext>
                                </div>
                            </DndContext>

                        </div>
                    </div>
                </main>
            </div>
            <Toaster richColors position="top-right" />
        </>
    )
}
