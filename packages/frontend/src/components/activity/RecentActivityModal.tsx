import { Button, Card, CardBody, CardHeader, Heading, Icon } from '@chakra-ui/react'
import { useState } from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { CurrentActivity } from './CurrentActivity'

export type RecentActivityModalProps = Record<string, never>

export const RecentActivityModal = () => {
	const [show, setShow] = useState(true)

	const handleToggle = () => setShow(!show)

	return (
		<>
			<Card
				sx={{
					position: 'absolute',
					minWidth: '30rem',
					bottom: '1.5rem',
					left: '1.5rem',
				}}
			>
				<CardHeader pb={0}>
					<Heading size="md" p={0}>Recent Activity</Heading>
				</CardHeader>

				<CardBody display={show ? 'block' : 'none'}>
					<CurrentActivity />
				</CardBody>
				<Button onClick={handleToggle} mt={show ? 0 : 4}>
					<Icon as={!show ? MdKeyboardArrowUp : MdKeyboardArrowDown} boxSize={8} />
				</Button>
			</Card>
		</>
	)
}
