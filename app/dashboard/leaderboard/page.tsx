'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useProgressStore } from '@/store/use-progress'

const dataUsers = [
  { id: 1, user: 'Xannazarov Jahongir', score: 15 },
  { id: 2, user: 'Xannazarov Jahongir', score: 25 },
  { id: 3, user: 'Xannazarov Jahongir', score: 35 },
  { id: 4, user: 'Xannazarov Jahongir', score: 85 },
  { id: 5, user: 'Xannazarov Jahongir', score: 45 },
  { id: 6, user: 'Xannazarov Jahongir', score: 95 },
  { id: 7, user: 'Xannazarov Jahongir', score: 525 },
  { id: 8, user: 'Xannazarov Jahongir', score: 115 },
  { id: 9, user: 'Xannazarov Jahongir', score: 152 },
  { id: 10, user: 'Xannazarov Jahongir', score: 154 },
  { id: 11, user: 'Xannazarov Jahongir', score: 153 },
  { id: 12, user: 'Xannazarov Jahongir', score: 157 },
  { id: 13, user: 'Xannazarov Jahongir', score: 155 },
  { id: 14, user: 'Xannazarov Jahongir', score: 60 },
  { id: 15, user: 'Xannazarov Jahongir', score: 25 },
  { id: 16, user: 'Xannazarov Jahongir', score: 35 },
  { id: 17, user: 'Xannazarov Jahongir', score: 40 },
  { id: 18, user: 'Xannazarov Jahongir', score: 15 },
  { id: 19, user: 'Xannazarov Jahongir', score: 85 },
  { id: 20, user: 'Xannazarov Jahongir', score: 95 },
  { id: 21, user: 'Xannazarov Jahongir', score: 1050, condition: 'user' },
  { id: 22, user: 'Xannazarov Jahongir', score: 110 },
  { id: 23, user: 'Xannazarov Jahongir', score: 125 },
  { id: 24, user: 'Xannazarov Jahongir', score: 155 },
  { id: 25, user: 'Xannazarov Jahongir', score: 195 },
  { id: 26, user: 'Xannazarov Jahongir', score: 215 },
  { id: 27, user: 'Xannazarov Jahongir', score: 315 },
  { id: 28, user: 'Xannazarov Jahongir', score: 415 },
  { id: 29, user: 'Xannazarov Jahongir', score: 155 },
  { id: 30, user: 'Xannazarov Jahongir', score: 165 },
]

const dataStatuses = [
  { id: 0, url: 'https://d35aaqx5ub95lt.cloudfront.net/images/leagues/a35f1db4398fd29e66f1abc33a0d11a2.svg' },
  { id: 1, url: 'https://d35aaqx5ub95lt.cloudfront.net/images/leagues/2439bac00452e99ba7bf6a7ed0b04196.svg' },
  { id: 2, url: 'https://d35aaqx5ub95lt.cloudfront.net/images/leagues/2ceb401cae52712705b66a77df83ce40.svg' },
  { id: 3, url: 'https://d35aaqx5ub95lt.cloudfront.net/images/leagues/6b8a8db5ac7f847e7e87efe97c8b451a.svg' },
  { id: 4, url: 'https://d35aaqx5ub95lt.cloudfront.net/images/leagues/a8e5c18e80054228b2c61168846ff643.svg' },
  { id: 5, url: 'https://d35aaqx5ub95lt.cloudfront.net/images/leagues/573de2bc90b2499eeb2b3738cff90133.svg' },
  { id: 6, url: '/assets/icons/flag.png' },
  { id: 7, url: 'https://d35aaqx5ub95lt.cloudfront.net/images/leagues/f12703218fc80de76a63e650726f742e.svg' },
  { id: 8, url: 'https://d35aaqx5ub95lt.cloudfront.net/images/leagues/5642e1e72813a88e8973b551a2004c7f.svg' },
  { id: 9, url: 'https://d35aaqx5ub95lt.cloudfront.net/images/leagues/beb0df263d0f696bc7095d56b448ca78.svg' },
  { id: 10, url: 'https://d35aaqx5ub95lt.cloudfront.net/images/leagues/22df4cb957e6cf2d7198b6e5449a342e.svg' },
  { id: 11, url: 'https://d35aaqx5ub95lt.cloudfront.net/images/leagues/9fadb349c2ece257386a0e576359c867.svg' },
  { id: 12, url: 'https://d35aaqx5ub95lt.cloudfront.net/images/leagues/535fc27de224cc7d311dbb5de4f33be6.svg' },
]

const Page = () => {

  const { sections } = useProgressStore()

  const [selectedIcon, setSelectedIcon] = useState(dataStatuses[0].url);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Mobil holatni tekshirish
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // Tailwind `md` breakpoint: 768px
    };

    // Boshlang'ich holatni tekshirish
    handleResize();

    // Resize event listener
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleStatus = () => {
    if (isMobile) {
      setIsVisible(!isVisible);
    }
  };

  const handleIconClick = (url: string) => {
    setSelectedIcon(url); // Bosilgan iconni holatga saqlash
  };

  const handleIconClearClick = () => {
    setSelectedIcon(dataStatuses[0].url)
  }

  const sortedUsers = dataUsers
    .sort((a, b) => b.score - a.score)
    .map((user, index) => ({
      id: index + 1, // Yangi id, 1 dan boshlab
      user: user.user,
      score: user.score,
      condition: user.condition
    }));

  return (
    <>
      {sections.map((section, key) => {
        const completedUnits = section.units.filter(
          (u: { isCompleted: boolean }) => u.isCompleted
        ).length
        const totalUnits = section.units.length
        const progress = (completedUnits / totalUnits) * 100

        return (
          <div key={section.id}>
            {
              progress === 0 ?
                <>
                  <main className=' w-full'>
                    <div className='  flex justify-center items-start flex-col sm:flex-row mx-auto gap-0 sm:gap-10'>
                      <div className=' flex justify-start flex-col items-center gap-5'>
                        <div className=' imageBox w-[250px]'>
                          <Image src={'https://d35aaqx5ub95lt.cloudfront.net/images/leagues/660a07cd535396f03982f24bd0c3844a.svg'} width={50} height={50} alt='league icon' className=' object-contain w-full' />
                        </div>
                        <div className=' title '>
                          <h1 className=' text-center text-3xl'>Open the ratings!</h1>
                          <h4 className=' text-center text-xl'>Complete 9 more lessons to enter the competition</h4>
                        </div>
                        <Link href={'/dashboard/vocabulary'} >

                          <Button className=' text-blue-500 py-5 px-10'>START LESSON</Button>
                        </Link>
                        <div className=' relative overflow-hidden w-full h-[300px] '>
                          <div className="grid grid-cols-[auto_1fr_auto] max-w-full w-full py-0 pr-6 pl-7 gap-4">
                            <Image src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/66cc61ca4afdfeb838aafa9828c4be07.svg"
                              width={16} height={464} alt="" className="object-contain mr-6 pt-4" />
                            <Image src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/57708658a81384750325296995face91.svg"
                              width={208} height={480} alt="" className="object-contain" />
                            <Image src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/25acac0956f9ff91bc9fd184000da9aa.svg"
                              width={48} height={462} alt="" className="object-contain pt-[18px]" />
                          </div>
                          <div className='bg-gradient-to-b from-snow/0 to-snow/100 absolute left-0 bottom-0 w-full h-full'></div>
                        </div>
                      </div>
                      <div className='w-[450px] h-[284px] hidden sm:block'>
                        <div className=' flex justify-between items-center w-full pl-6 border-2 rounded-lg border-gray-200'>
                          <div className=' flex flex-col gap-1 w-[70%]'>
                            <p className=' text-xl font-medium text-gray-400'>WHAT IS RATING?</p>
                            <p className=' text-xl font-medium'>Learn.<br />Gain experience.<br />Compete.</p>
                            <p className=' text-lg'>Try to take a new position in the weekly ranking by gaining as many experience points as possible for lessons.</p>
                          </div>
                          <div className=' w-[120px] flex justify-center items-end'>
                            <Image src={'https://d35aaqx5ub95lt.cloudfront.net/images/leagues/071159d03311fcb556c4dfe730941de1.svg'} alt='icons' width={50} height={50} className=' w-full object-contain' />
                          </div>
                        </div>
                      </div>
                    </div>
                  </main>
                </> :
                <>
                  <main className=' flex justify-center items-start mx-auto gap-0 flex-col sm:flex-row sm:gap-10'>
                    <div className='flex flex-col justify-center items-start mx-auto gap-10 z-10'>
                      <div className=' w-full mx-auto  flex flex-col justify-center items-center gap-3 bg-white z-30'>
                        <div className=' imageBox w-[60px] h-[60px] relative'>
                          <Image src={'https://d35aaqx5ub95lt.cloudfront.net/images/leagues/80fecb328c5aefd400db229794fd7a08.svg'} fill alt='league icon' className=' object-contain w-full' />
                        </div>
                        <div className=' title '>
                          <p className=' text-center text-3xl'>Emerald League</p>
                          <p className=' text-center text-xl'>7 winners move on to the next league</p>
                          <p className=' endTime text-center text-lg text-orange-400'>4 day</p>
                        </div>
                      </div>
                      <div className=' w-full flex flex-col items-center'>

                        <div className=' w-full border-t-2 border-gray-300 pt-3 px-1 relative z-20'>
                          {
                            sortedUsers.map((item) => (
                              <>
                                <div className={` w-full sm:w-[90%] mx-auto p-3 rounded-lg hover:bg-gray-200 flex items-center gap-3
                        ${item.condition === 'user' && item.id > 22 ? 'bg-red-200 text-red-600 hover:bg-red-200' : item.condition === 'user' && item.id < 8 ? 'bg-green-200 text-green-600 hover:bg-green-200' : item.condition === 'user' && item.id > 7 && item.id < 23 ? ' bg-gray-300' : 'bg-white'}
                      `} key={item.id}>
                                  <div className=' w-[25px]'>
                                    <span
                                      className={`font-semibold text-center ${item.id < 8
                                        ? 'text-green-600'
                                        : item.id > 22 ? 'text-red-600' : 'text-black'}`}>
                                      {item.id}
                                    </span>
                                  </div>
                                  <div className=' relative mr-2'>
                                    <div className=' w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-full bg-orange-500 text-xl sm:text-2xl text-white font-semibold flex justify-center items-center'>
                                      {item.user[0]}
                                    </div>
                                    {
                                      item.condition === 'user' ?
                                        <div className="absolute -top-3 -right-5 flex items-center justify-center w-[30px] h-[30px] bg-gray-100 rounded-full border-2 border-dashed border-gray-300 p-1">
                                          <button onClick={toggleStatus}>
                                            <Image src={selectedIcon} width={50} height={50} alt='' />
                                          </button>
                                        </div>
                                        : <></>
                                    }

                                  </div>
                                  <div className=' sm:w-[370px] pl-3'>
                                    <span className=' line-clamp-1'>{item.user}</span>
                                  </div>
                                  <div className=' w-[100px]'>
                                    <span className={`${item.condition === 'user' && item.id > 22 ? ' text-red-600' : item.condition === 'user' && item.id < 8 ? ' text-green-600' : 'text-gray-500'}`}>{item.score} points</span>
                                  </div>
                                </div>
                                {
                                  item.id === 7
                                    ?
                                    <div className=' flex justify-center items-center gap-5'>
                                      <Image src={'https://d35aaqx5ub95lt.cloudfront.net/images/leagues/577cf633b59ce72791f725d0cb973061.svg'} alt='' width={24} height={24} />
                                      <p className=' text-xl font-semibold text-green-600'>Increase zone</p>
                                      <Image src={'https://d35aaqx5ub95lt.cloudfront.net/images/leagues/577cf633b59ce72791f725d0cb973061.svg'} alt='' width={24} height={24} />
                                    </div>
                                    : item.id === 22
                                      ?
                                      <div className=' flex justify-center items-center gap-5'>
                                        <Image src={'https://d35aaqx5ub95lt.cloudfront.net/images/leagues/248453c5e2d9de19fba7a2f4fef7f016.svg'} alt='' width={24} height={24} />
                                        <p className=' text-xl font-semibold text-red-600'>Depression zone</p>
                                        <Image src={'https://d35aaqx5ub95lt.cloudfront.net/images/leagues/248453c5e2d9de19fba7a2f4fef7f016.svg'} alt='' width={24} height={24} />
                                      </div>
                                      : <div></div>
                                }
                              </>
                            ))
                          }
                        </div>
                      </div>
                    </div>

                    <div className=' w-full sm:w-[450px] z-50'>
                      <div className=' fixed '>
                        <div className={` ${isMobile ? isVisible ? 'hidden translate-y-full ' : 'block fixed translate-y-0 z-50 border-t-2 border-gray-200' : 'translate-y-0'
                          } bottom-0 sm:block w-full flex flex-col gap-5 justify-between items-center  px-3 py-4 border-2 rounded-none sm:rounded-lg border-gray-200 bg-white `}>
                          <div className=' w-full text-3xl font-semibold sm:font-normal sm:text-lg flex justify-center sm:justify-between items-center mb-3 sm:m-0'>
                            <p>Set status</p>
                            <Button className=' hidden sm:block text-lg border-none text-blue-500 font-medium hover:bg-white' onClick={handleIconClearClick}>
                              Clear
                            </Button>
                          </div>
                          <div className=' flex flex-col justify-center items-center gap-5'>

                            <div className="relative">
                              <div className=' w-[75px] h-[75px] rounded-full overflow-hidden'>
                                <Image src={'/assets/icons/profileIcon1.png'} alt='' width={50} height={50} className='w-full object-contain' />
                              </div>
                              <div className="absolute -bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                              <div className="absolute -top-5 -right-7 flex items-center justify-center w-[50px] h-[50px] bg-gray-100 rounded-full border-2 border-dashed border-gray-300 p-1">
                                <Image src={selectedIcon} width={50} height={50} alt='' />
                              </div>
                            </div>

                            <div className=' grid grid-cols-6 gap-3 sm:gap-5'>
                              {
                                dataStatuses.map((item, key) => (
                                  <>
                                    {
                                      item.id === 0 ?
                                        <></> :
                                        <>
                                          <div className=' w-[50px] h-[50px] border-2 border-gray-300 rounded-lg overflow-hidden flex justify-center items-center hover:bg-gray-200' key={key}>
                                            <button onClick={() => handleIconClick(item.url)}>
                                              <Image src={item.url} alt='status icon' width={48} height={48} className=' object-contain w-full' />
                                            </button>
                                          </div>
                                        </>
                                    }
                                  </>
                                ))
                              }
                            </div>

                            <div className=' block sm:hidden w-full'>
                              <Button className=' w-full bg-blue-400 text-white' onClick={toggleStatus}>READY</Button>
                            </div>
                            <div className=' block sm:hidden w-full'>
                              <Button className=' w-full text-lg border-none text-blue-500 font-medium hover:bg-white' onClick={handleIconClearClick}>
                                CLEAR STATUS
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </main>
                </>
            }
          </div>
        )
      })}
    </>
  )
}

export default Page