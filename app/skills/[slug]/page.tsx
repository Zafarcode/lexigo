'use client'
import { useParams } from 'next/navigation'

const SkillsDetailPage = () => {
	const params = useParams()
	return <main className='pt-24 md:pt-28'>SkillsDetailPage {params.slug}</main>
}

export default SkillsDetailPage
