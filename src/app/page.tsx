import Container from "@/components/container";
import { GameProps } from "@/utils/types/game";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRightSquare } from 'react-icons/bs'
import Input from "@/components/input";
import GameCard from "@/components/gameCard";

async function getDalyGame(){
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`, {next:{ revalidate: 320}})
    return res.json()
  } catch (error) {
    throw new Error("Falha ao pegar Jogo Exclusivo")
  }
}


async function getGamesData() {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=games`, {next:{ revalidate: 320}})
    return res.json()
  } catch (error) {
    throw new Error("Falha ao pegar Jogos")
  }
}

export default async function Home() {

  const dalyGame : GameProps = await getDalyGame()
  const dataGames : GameProps[] = await getGamesData()


  return (
    <main className="w-full">
      <Container >
        <h1 className="text-center mt-8 mb-5 font-bold text-xl">
          Separamos um jogo exclusivo para você
        </h1>
        <Link href={`/game/${dalyGame.id}`}>
          <section className="w-full bg-black rounded-lg">
            <div className="w-full max-h-96 h-96 relative rounded-xl">
              <div className="absolute z-20 bottom-0 p-3 flex justify-center items-center gap-2" >
                <p className="font-bold text-xl text-white">{dalyGame.title}</p>
                <BsArrowRightSquare size={24} color="#fff"></BsArrowRightSquare>
              </div>
              <Image
                src={dalyGame.image_url}
                alt={dalyGame.title}
                priority
                quality={100}
                fill={true}
                className="max-h-96 object-cover rounded-xl opacity-50 hover:opacity-100 transition-all duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
              />
            </div>
          </section>
        </Link>
        <Input />
        <h2
          className="text-lg font-bold mt-8 mb-5"
        >Jogos para conhecer</h2>

        <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {dataGames.map((item) => (
            <GameCard key={item.id} data={item}></GameCard>
          ))}
        </section>

      </Container>
    </main> 
  )
}
