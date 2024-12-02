"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Params {
    modul_id: number;
    unitId: number;
}

interface Essential1Props {
    params: Params;
}

export default function Essential1({ params }: Essential1Props) {
    const { modul_id, unitId } = params;

    return (
        <>
            <main className=" text-lg xl:text-xl flex justify-center items-center flex-col xl:flex-row  mx-auto p-5 xl:p-14 gap-10">
                <Button className="h-full w-[200px] border-2 p-3 rounded-lg shadow-lg hover:w-[203px]">
                    <Link href={`/finish-quiz/modul/${modul_id}/unit/${unitId}/quiz`}>
                        {/* <img src="/gif/brain.gif" className=" w-full" alt="sx" /> */}
                        <span>QUIZ</span>
                    </Link>
                </Button>
            </main>

        </>
    );
}
