import Container from "@/components/container";
import GameCard from "@/components/gameCard";
import Input from "@/components/input";
import { GameProps } from "@/utils/types/game";

async function getData(title: string){
    try {
        const decodeTitle = decodeURI(title)
        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&title=${decodeTitle}`, {next:{ revalidate: 320}})
        return res.json()
    } catch (error) {
        throw new Error("Falha ao pegar Jogo Search")
    }
}


export default async function Search ({ params} : {params: Promise<{ title: string }>}){

    const { title } = await params;

    const dataGames : GameProps[] = await getData(title)

    return (
        <main className="w-full text-black">
            <Container>
                <Input />
                <h1 className="font-bold text-xl mt-8 mb-5">
                    Veja o que encontramos na nossa base
                </h1>

                {!dataGames && (
                    <p>Não encontramos nenhum jogo com esse titulo!</p>
                )}

                <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {dataGames && dataGames.map((item) => (
                    <GameCard key={item.id} data={item}></GameCard>
                    ))}
                </section>
            </Container>
        </main>
    )
}