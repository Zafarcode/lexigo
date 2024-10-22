import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'

const HeroCarousel = () => {
	return (
		<Carousel
			opts={{
				align: 'start',
				loop: true,
			}}
			plugins={[
				Autoplay({
					delay: 2000,
					stopOnInteraction: false,
					stopOnMouseEnter: true,
				}),
			]}
		>
			<CarouselContent className='items-center'>
				<CarouselItem className='md:basis-1/2 lg:basis-1/6'>
					<Image
						className='mx-auto'
						src='/assets/images/collaboration/shahnur-software.svg'
						width={80}
						height={80}
						alt='ShahNur Software logo'
						priority
					/>
				</CarouselItem>
				<CarouselItem className='md:basis-1/2 lg:basis-1/6'>
					<Image
						className='mx-auto'
						src='/assets/images/collaboration/udemere.svg'
						width={80}
						height={80}
						alt='Udemere logo'
						priority
					/>
				</CarouselItem>
				<CarouselItem className='md:basis-1/2 lg:basis-1/6'>
					<Image
						className='mx-auto'
						src='/assets/images/collaboration/udemere-com.svg'
						width={60}
						height={60}
						alt='Udemere logo'
						priority
					/>
				</CarouselItem>
				<CarouselItem className='md:basis-1/2 lg:basis-1/6'>
					<Image
						className='mx-auto'
						src='/assets/images/collaboration/teztyping.svg'
						width={150}
						height={60}
						alt='Tez typing logo'
						priority
					/>
				</CarouselItem>
				<CarouselItem className='md:basis-1/2 lg:basis-1/6'>
					<Image
						className='mx-auto'
						src='/assets/images/collaboration/ns-logo.png'
						width={150}
						height={50}
						alt='Newcastle School logo'
						priority
					/>
				</CarouselItem>
				<CarouselItem className='md:basis-1/2 lg:basis-1/6'>
					<Image
						className='mx-auto'
						src='/assets/images/collaboration/diplomat-logo.svg'
						width={80}
						height={50}
						alt='Diplomat University logo'
						priority
					/>
				</CarouselItem>
				<CarouselItem className='md:basis-1/2 lg:basis-1/6'>
					<Image
						className='mx-auto'
						src='/assets/images/collaboration/miracle-books.svg'
						width={80}
						height={50}
						alt='Miracle Books logo'
						priority
					/>
				</CarouselItem>
			</CarouselContent>
		</Carousel>
	)
}

export default HeroCarousel
