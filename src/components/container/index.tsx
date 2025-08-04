import { ReactNode } from "react";

export default function Container({children} : {children: ReactNode}){
    return (
        <div className="w-full max-w-screen-xl px-4 mx-auto">
            {children}
        </div>
    )
}