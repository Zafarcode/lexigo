import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { SparklesIcon } from '@/components/utils/icons'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
function Module() {
  return (
    <ol className='flex flex-col gap-5 w-full xl:max-w-3xl mx-auto'>
        <li>
            <Card className='min-h-[250px]'>
                <CardHeader>
                    <CardTitle className='text-xl md:text-4xl text-primary mb-2'>
                        Module 1
                    </CardTitle>
                    <div className='relative w-[300px] flex items-center'>
                        <Progress value={0} />
                        <span className='absolute -right-2 text-primary'>
                            <SparklesIcon />
                        </span>
                    </div>
                </CardHeader>
                <CardContent className='min-h-[100px] relative flex justify-between items-end'>
                    <Link
                        className={cn(
                            buttonVariants({ variant: 'default', size: 'lg' })
                        )}
                        href='/vocabulary/module/1'
                    >
                        Get started
                    </Link>

                    <Image
                        className='absolute right-5 -top-16 min-[486px]:block hidden'
                        src='/assets/images/navigator.svg'
                        width={270}
                        height={270}
                        alt='navigator'
                    />
                </CardContent>
            </Card>
        </li>
        <li>
            <Card className='min-h-[250px]'>
                <CardHeader>
                    <CardTitle className='text-xl md:text-4xl text-primary mb-2'>
                        Module 1
                    </CardTitle>
                    <div className='relative w-[300px] flex items-center'>
                        <Progress value={0} />
                        <span className='absolute -right-2 text-primary'>
                            <SparklesIcon />
                        </span>
                    </div>
                </CardHeader>
                <CardContent className='min-h-[100px] relative flex justify-between items-end'>
                    <Link
                        className={cn(
                            buttonVariants({ variant: 'default', size: 'lg' })
                        )}
                        href='/vocabulary/module/1'
                    >
                        Get started
                    </Link>

                    <Image
                        className='absolute right-5 -top-16  min-[486px]:block hidden'
                        src='/assets/images/navigator.svg'
                        width={270}
                        height={270}
                        alt='navigator'
                    />
                </CardContent>
            </Card>
        </li>
        <li>
            <Card className='min-h-[250px]'>
                <CardHeader>
                    <CardTitle className='text-xl md:text-4xl text-primary mb-2'>
                        Module 1
                    </CardTitle>
                    <div className='relative w-[300px] flex items-center'>
                        <Progress value={0} />
                        <span className='absolute -right-2 text-primary'>
                            <SparklesIcon />
                        </span>
                    </div>
                </CardHeader>
                <CardContent className='min-h-[100px] relative flex justify-between items-end'>
                    <Link
                        className={cn(
                            buttonVariants({ variant: 'default', size: 'lg' })
                        )}
                        href='/vocabulary/module/1'
                    >
                        Get started
                    </Link>

                    <Image
                        className='absolute right-5 -top-16  min-[486px]:block hidden'
                        src='/assets/images/navigator.svg'
                        width={270}
                        height={270}
                        alt='navigator'
                    />
                </CardContent>
            </Card>
        </li>
    </ol>
  )
}

export default Module
