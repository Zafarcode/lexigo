import React from 'react'
import { AwesomeButton } from 'react-awesome-button'
import 'react-awesome-button/dist/styles.css'

const AwsButton = ({ children }: { children: React.ReactNode }) => {
	return (
		<AwesomeButton type='primary' size='large'>
			{children}
		</AwesomeButton>
	)
}

export default AwsButton
