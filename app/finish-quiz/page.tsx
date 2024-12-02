import Link from "next/link";
import { Card } from "@/components/ui/card"
const dataEssen = [
    {
        id: 1, title: 'Modul 1'
    },
    {
        id: 2, title: 'Modul 2'
    },
    {
        id: 3, title: 'Modul 3'
    },
    {
        id: 4, title: 'Modul 4'
    },
    {
        id: 5, title: 'Modul 5'
    },
    {
        id: 6, title: 'Modul 6'
    },
]

export default function FinishQuiz() {
    return (
        <main className=" w-[90%] text-white text-2xl flex justify-center items-center mx-auto p-24 gap-5">
            {
                dataEssen.map((i) => (
                    <Card className=" overflow-hidden mx-auto shadow-2xl p-4" key={i.id}>
                        <Link href={`/finish-quiz/modul/${i.id}`}>
                            {i.title}
                        </Link>
                    </Card>
                ))
            }
        </main>
    );
}
