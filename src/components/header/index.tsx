import Image from 'next/image'
import Link from 'next/link'
import logoImg from '../../../public/logo.svg'
import { LiaGamepadSolid } from 'react-icons/lia'


export default function Header(){
    return (
        <header className="w-full h-28 bg-slate-100 text-black px-4">
            <div className="max-w-screen-xl mx-auto flex justify-center items-center h-28 sm:justify-between">
                <nav className='flex items-center justify-center gap-4'>
                    <Link href="/">
                        <Image
                            src={logoImg}
                            alt='DalyGames'
                            quality={100}
                            priority
                            className='w-full'
                        ></Image>
                    </Link>
                    <Link href="/">
                        Games
                    </Link>
                    <Link href="/profile">
                        Perfil
                    </Link>
                </nav>
                <div className='hidden sm:flex justify-center items-center'>
                    <Link href="/">
                        <LiaGamepadSolid size={34} color='#475569' />
                    </Link>
                </div>
            </div>
        </header>
    )
}