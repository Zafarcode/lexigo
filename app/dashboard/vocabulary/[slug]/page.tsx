'use client'

import { useEffect } from 'react'
import { Section } from '@/components/vocabulary/section'
import { useProgressStore } from '@/store/use-progress'
import { useRouter } from 'next/navigation'

export default function VocabularySection({
	params,
}: {
	params: { slug: string }
}) {
	const router = useRouter()
	const { sections, calculateUnitProgress, resetProgress } = useProgressStore()
	const section = sections.find(s => s.slug === params.slug)

	useEffect(() => {
		resetProgress()
	}, [resetProgress])

	if (!section) {
		return <div>Section not found</div>
	}

	const handleUnitClick = (unitId: number) => {
		const unit = section.units.find(u => u.id === unitId)
		if (unit && !unit.isLocked) {
			router.push(`/dashboard/vocabulary/${section.slug}/${unit.slug}`)
		}
	}

	const unitProgress = section.units.reduce((acc, unit) => {
		acc[unit.id] = calculateUnitProgress(unit)
		return acc
	}, {} as Record<number, number>)

	return (
		<div className='h-full flex justify-center items-center px-4'>
			<Section
				section={section}
				onUnitClick={handleUnitClick}
				unitProgress={unitProgress}
			/>
		</div>
	)
}
