'use client'

import { ExitModal } from '@/components/modals/exit-modal'
import { HeartsModal } from '@/components/modals/hearts-modal'
import { PracticeModal } from '@/components/modals/practice-modal'
import { Button } from '@/components/ui/button'
import { useHeartsModal } from '@/store/use-hearts-modal'

export default function Page() {
	const { open } = useHeartsModal()
	return (
		<div>
			Home
			<Button onClick={open} />
			<PracticeModal />
			<ExitModal />
			<HeartsModal />
		</div>
	)
}
