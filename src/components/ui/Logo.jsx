import { Flex } from "@mantine/core"
import { IconBook } from "@tabler/icons-react"

const Logo = () => {
    return (
        <Flex align='center' gap="4px">
            <IconBook size={30}/>
            <h2 className='font-serif font-bold text-3xl text-foreground'>xona</h2>
        </Flex>
    )
}

export default Logo
