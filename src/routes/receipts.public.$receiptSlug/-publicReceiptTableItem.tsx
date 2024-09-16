import { ActionIcon, NumberFormatter, Table } from '@mantine/core'
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

  return (
    <Table.Tr>
      <Table.Td>{ index + 1 }</Table.Td>
      <Table.Td>
        {name}
      </Table.Td>
      <Table.Td>
        <NumberFormatter
          prefix="$"
          value={price || 0}
          thousandSeparator={true}
        />
      </Table.Td>
      <Table.Td>{joinedUsernames(sharedBy)}</Table.Td>
      <Table.Td>
        <ActionIcon
          variant="transparent"
          onClick={onSelect}
        >
          { isSelected ? <IconStarFilled /> : <IconStar /> }
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  )
}
