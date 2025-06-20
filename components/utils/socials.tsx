import {
	InstagramIcon,
	TelegramIcon,
	XIcon,
	YouTubeIcon,
} from '@/components/utils/icons'
import Link from 'next/link'

const Socials = () => {
	return (
		<ul className='flex items-center gap-3'>
			<li>
				<Link
					className='hover:text-primary hover:underline'
					href='https://www.instagram.com/lexigo.uz?igsh=MWhhcXhtYTY5bHVkbg=='
					target='blank'
					rel='noreferrer'
				>
					<InstagramIcon width={30} height={30} />
					<span className='sr-only'>Instagram icon</span>
				</Link>
			</li>
			<li>
				<Link
					className='hover:text-primary hover:underline'
					href='https://t.me/LexiGo_uz'
					target='blank'
					rel='noreferrer'
				>
					<TelegramIcon width={30} height={30} />
					<span className='sr-only'>Telegram icon</span>
				</Link>
			</li>
			<li>
				<Link
					className='hover:text-primary hover:underline'
					href='https://youtube.com/@lexigo_uz?si=qySMHwZvYEU2foSx'
					target='blank'
					rel='noreferrer'
				>
					<YouTubeIcon width={30} height={30} />
					<span className='sr-only'>YouTube icon</span>
				</Link>
			</li>
		</ul>
	)
}

export default Socials
