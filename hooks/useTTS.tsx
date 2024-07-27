import { MouseEvent, useCallback, useEffect, useMemo } from 'react'

const useTTS = (text: string, lang: 'en-US' | 'en-GB' = 'en-US') => {
	const normalSpeech = useMemo(() => {
		if (typeof window !== 'undefined' && window.speechSynthesis) {
			const utterance = new SpeechSynthesisUtterance()
			utterance.volume = 1
			utterance.rate = 1 // Normal rate
			utterance.pitch = 1
			utterance.text = text
			utterance.lang = lang
			return utterance
		}
		return null
	}, [text, lang])

	const slowSpeech = useMemo(() => {
		if (typeof window !== 'undefined' && window.speechSynthesis) {
			const utterance = new SpeechSynthesisUtterance()
			utterance.volume = 1
			utterance.rate = 0.1 // Slow rate
			utterance.pitch = 1
			utterance.text = text
			utterance.lang = lang
			return utterance
		}
		return null
	}, [text, lang])

	const handleNormalSpeech = useCallback(
		(evt: MouseEvent<HTMLButtonElement>) => {
			if (
				typeof window !== 'undefined' &&
				window.speechSynthesis &&
				normalSpeech
			) {
				window.speechSynthesis.cancel() // Ensure no previous speeches are queued
				window.speechSynthesis.speak(normalSpeech)
				evt.stopPropagation()
			}
		},
		[normalSpeech]
	)

	const handleSlowSpeech = useCallback(
		(evt: MouseEvent<HTMLButtonElement>) => {
			if (
				typeof window !== 'undefined' &&
				window.speechSynthesis &&
				slowSpeech
			) {
				window.speechSynthesis.cancel() // Ensure no previous speeches are queued
				window.speechSynthesis.speak(slowSpeech)
				evt.stopPropagation()
			}
		},
		[slowSpeech]
	)

	useEffect(() => {
		return () => {
			if (typeof window !== 'undefined' && window.speechSynthesis) {
				window.speechSynthesis.cancel() // Clean up any ongoing speech synthesis on unmount
			}
		}
	}, [])

	return { handleNormalSpeech, handleSlowSpeech }
}

export default useTTS
