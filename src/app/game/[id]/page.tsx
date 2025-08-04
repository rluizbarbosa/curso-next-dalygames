import Container from "@/components/container";
import Link from "next/link";
import { BsArrowRightSquare } from 'react-icons/bs'
import { GameProps } from "@/utils/types/game";
import Image from "next/image";
import { redirect } from "next/navigation";
import Label from "./components/label";
import GameCard from "@/components/gameCard";
import { Metadata } from "next";

interface ParamsProps{
    params: {
        id: string
    }
}
export async function generateMetadata({ params } : ParamsProps) : Promise<Metadata>{

    const { id } = await params;

    const game: GameProps = await getData(id)

    if(!game){
        return {
            title: "Daly Games - Descubra os melhores jogos da atualidade para se divertir"
        }
    }

    return {
        title: `${game.title} | Daly Games`,
        description: `${game.description.slice(0, 160)}...`,
        keywords: ["games", "jogos", "steam"],
        openGraph: {
            images: [`${game.image_url}`],
            title: `${game.title}`,
        },
        robots: {
            index: true,
            follow: true,
            nocache: true,
            googleBot: {
            index: true,
            follow: true,
            noimageindex: true
            }
        }
    }
}
async function getData(id: string){
    try {
        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`, { next : {revalidate: 60}})
        return res.json()
    } catch (error) {
        throw new Error("Falha ao pegar Jogo")
    }
}

async function getDalyGame(){
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`, { cache: 'no-store' })
    return res.json()
  } catch (error) {
    throw new Error("Falha ao pegar Jogo Exclusivo")
  }
}

export default async function Game ({ params} : {params: Promise<{ id: string }>}){

    const { id } = await params;

    const dataGame : GameProps = await getData(id)
    const dalyGame : GameProps = await getDalyGame()

    if(!dataGame){
        redirect("/")
    }

    return (
        <main className="w-full text-black">
           <div className="bg-black h-80 w-full relative sm:h-96">
            <Image 
                src={dataGame.image_url}
                alt={dataGame.title}
                priority
                fill
                quality={100}
                className="h-80 sm:h-96 w-full object-cover opacity-80"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
            />
           </div>
           <Container>
                <h1 className="font-bold text-xl my-4">
                    {dataGame.title}
                </h1>
                <p>{dataGame.description}</p>
                <h2 className="font-bold text-lg mt-7 mb-2">
                    Plataforma
                </h2>
                <div className="flex gap-2 flex-wrap">
                    {dataGame.platforms.map((item) => (
                        <Label name={item} key={item} />
                    ))}
                </div>
                <h2 className="font-bold text-lg mt-7 mb-2">
                    Categorias
                </h2>
                <div className="flex gap-2 flex-wrap">
                    {dataGame.categories.map((item) => (
                        <Label name={item} key={item} />
                    ))}
                </div>
                <p className="mt-7 mb-2">
                    <strong>Data de Lançamento:</strong> {dataGame.release}
                </p>
                <h1 className="mt-8 mb-5 font-bold text-xl">
                    Jogo recomendado
                </h1>
                <div className="flex">
                    <div className="flex-grow">
                        <GameCard data={dalyGame}></GameCard>
                    </div>
                </div>
           </Container>
            
        </main>
    )
}