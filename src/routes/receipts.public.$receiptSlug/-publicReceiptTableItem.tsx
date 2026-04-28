import { ActionIcon, Avatar, Badge, Group, NumberFormatter, Table, Text, Tooltip } from '@mantine/core'
import { IconStar, IconStarFilled } from '@tabler/icons-react'
import { graphql } from '@src/__generated__/gql'
import { FragmentType, getFragmentData } from '@src/__generated__'

const PublicReceiptItemFields = graphql(`
  fragment PublicReceiptItemFields on Item {
    name
    price
    sharedBy {
      id
      username
    }
  }
`)

interface ItemProps {
  data: FragmentType<typeof PublicReceiptItemFields>
  isSelected: boolean
  onSelect: () => void
  index: number
}

export const PublicReceiptTableItem = ({ data, isSelected, onSelect, index }: ItemProps) => {
  const item = getFragmentData(PublicReceiptItemFields, data)
  const { price, sharedBy, name } = item

  const joinedUsernames = (users: typeof sharedBy): string => {
    return users.map(u => u.username).join(', ')
  }

  const sharedByText = joinedUsernames(sharedBy) || 'No one yet'

  return (
    <Table.Tr>
      <Table.Td>
        <Badge variant="light" color="gray">{index + 1}</Badge>
      </Table.Td>
      <Table.Td>
        <Text fw={600}>{name}</Text>
      </Table.Td>
      <Table.Td>
        <Text fw={700} ta="right">
          <NumberFormatter
            prefix="$"
            value={price ?? 0}
            thousandSeparator
          />
        </Text>
      </Table.Td>
      <Table.Td>
        <Group gap="xs" wrap="nowrap">
          <Avatar size="sm" radius="xl" color="teal" variant="light">
            {sharedBy.length}
          </Avatar>
          <Text size="sm" c="dimmed" truncate>
            {sharedByText}
          </Text>
        </Group>
      </Table.Td>
      <Table.Td>
        <Tooltip label={isSelected ? 'Selected' : 'Select item'}>
          <ActionIcon
            variant="subtle"
            color={isSelected ? 'yellow' : 'gray'}
            onClick={onSelect}
            aria-label="Toggle item selection"
          >
            {isSelected ? <IconStarFilled size={16} /> : <IconStar size={16} />}
          </ActionIcon>
        </Tooltip>
      </Table.Td>
    </Table.Tr>
  )
}
