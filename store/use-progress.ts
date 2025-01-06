import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Section, Unit } from '@/types'
import { lessons } from '../constants/lessons'

interface ProgressState {
	sections: Section[]
	updateItemStatus: (
		sectionSlug: string,
		unitSlug: string,
		itemId: number
	) => void
	calculateUnitProgress: (unit: Unit) => number
	calculateSectionProgress: (section: Section) => number
	resetProgress: () => void
}

export const useProgressStore = create<ProgressState>()(
	persist(
		(set, get) => ({
			sections: lessons,
			updateItemStatus: (
				sectionSlug: string,
				unitSlug: string,
				itemId: number
			) =>
				set(state => {
					const newSections = [...state.sections]
					const sectionIndex = newSections.findIndex(
						s => s.slug === sectionSlug
					)

					if (sectionIndex !== -1) {
						const section = newSections[sectionIndex]
						const unitIndex = section.units.findIndex((u: { slug: string }) => u.slug === unitSlug)

						if (unitIndex !== -1) {
							const unit = section.units[unitIndex]
							const itemIndex = unit.item.findIndex((i: { id: number }) => i.id === itemId)

							if (itemIndex !== -1) {
								unit.item[itemIndex].viewed = true

								// Check if all items in the unit have been viewed
								const allItemsViewed = unit.item.every((i: { viewed: boolean }) => i.viewed)
								if (allItemsViewed) {
									unit.isCompleted = true

									// Unlock next unit if exists
									if (unitIndex < section.units.length - 1) {
										section.units[unitIndex + 1].isLocked = false
									}
								}
							}
						}
					}

					return { sections: newSections }
				}),
			calculateUnitProgress: (unit: Unit) => {
				const viewedItems = unit.item.filter(item => item.viewed).length
				return (viewedItems / unit.item.length) * 100
			},
			calculateSectionProgress: (section: Section) => {
				const totalUnits = section.units.length
				const completedUnits = section.units.filter((unit: { item: any[] }) =>
					unit.item.every((item: { viewed: boolean }) => item.viewed)
				).length
				return (completedUnits / totalUnits) * 100
			},
			resetProgress: () => set({ sections: lessons }),
		}),
		{
			name: 'vocabulary-progress',
			storage: createJSONStorage(() => sessionStorage), // Use sessionStorage instead of localStorage
		}
	)
)
