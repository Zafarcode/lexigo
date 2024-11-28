'use client'

import { useState } from 'react'
import { Section } from '@/components/vocabulary/section'
import { initialSections } from '@/components/vocabulary/section/mock'

import type { Section as SectionType } from '@/types'
import { lessons } from '@/constants/lessons'
import { useRouter } from 'next/navigation'


const UnitDetail = ({ params: { slug } }: { params: { slug: string } }) => {
	const [sections, setSections] = useState<SectionType[]>(initialSections)
	const lesson = lessons.find(lesson => lesson.slug === slug)

	const router = useRouter();

const handleUnitClick = (sectionId: number, unitId: number) => {
  setSections(prev =>
    prev.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          units: section.units.map(unit => {
            if (unit.id === unitId) {
              router.push(`/dashboard/vocabulary/${lesson?.slug}/${unit.slug}`);
              return { ...unit, isCompleted: true };
            }
            if (unit.id === unitId + 1) {
              return { ...unit, isLocked: false };
            }
            return unit;
          }),
        };
      }
      return section;
    })
  );
};


	return (
		<div className='flex min-h-screen flex-col items-center gap-8'>
			{sections.map(section => (
				<Section
					key={section.id}
					section={section}
					onUnitClick={unitId => handleUnitClick(section.id, unitId)}
				/>
			))}
		</div>
	)
}

export default UnitDetail