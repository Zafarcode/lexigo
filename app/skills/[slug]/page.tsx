'use client'
import { useParams } from 'next/navigation'

const SkillsDetailPage = () => {
	const params = useParams()
	return <main>SkillsDetailPage {params.slug}</main>
}

export default SkillsDetailPage
