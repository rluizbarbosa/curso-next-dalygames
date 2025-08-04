import { GameProps } from "@/utils/types/game";
import Image from "next/image";
import Link from "next/link";
import { BiRightArrowCircle } from 'react-icons/bi'

interface GameCardProps{
    data: GameProps
}

export default function GameCard({data} : GameCardProps){
    return (
        
        <Link href={`/game/${data.id}`}>
            <section className="w-full bg-slate-200 rounded-lg p-4 mb-5">
                <div className="relative w-full h-56 hover:scale-105 transition-all duration-300">
                    <Image
                        src={data.image_url}
                        alt={data.title}
                        priority
                        quality={100}
                        className="rounded-lg object-cover"
                        fill={true}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
                    ></Image>
                </div>
                
                <div className="flex justify-between items-center gap-2 mt-4" >
                    <p className="text-black text-sm font-bold px-2 text-ellipsis truncate whitespace-nowrap overflow-hidden">{data.title}</p>
                    <BiRightArrowCircle size={24} color="#000"></BiRightArrowCircle>
                </div>
            </section>
        </Link>
    )
}