import { useMutation } from '@apollo/client'
import { Center, Paper, Stack, Table, Text } from '@mantine/core'
import { FragmentType, getFragmentData, graphql } from '@src/__generated__/'
import { MeDocument, MeQuery, PublicReceiptDocument } from '@src/__generated__/graphql'
import { PublicReceiptTableItem } from './-publicReceiptTableItem'

// assignMeToItem mutation
const ASSIGN_OR_REMOVE_ME = graphql(`
  mutation AssignOrRemoveMeFromItem($itemId: ID!) {
    assignOrRemoveMeFromItem(itemId: $itemId) {
      itemId
    }
  }
`)

const PublicReceiptItems = graphql(`
  fragment PublicReceiptItems on Receipt {
    items {
      id
      ...PublicReceiptItemFields
    }
  }
`)

interface ReceiptTableProps {
  data: FragmentType<typeof PublicReceiptItems>
  user: NonNullable<MeQuery['me']>
}

export const ReceiptTable = ({ data, user }: ReceiptTableProps) => {
  const itemsData = getFragmentData(PublicReceiptItems, data)

  const isSelected = (itemId: string): boolean => {
    return user.orders.some(o => o.id === itemId)
  }

  const [assignOrRemove] = useMutation(ASSIGN_OR_REMOVE_ME, {
    // Tried optimizing using update but it's too complicated
    // MeDocument's complexity comes from needing to recalculate the totalPayables
    // PublicReceiptDocument's complexity is when you're adding the user to `SharedBy` and the extraRootIds being created in cache.
    // Also had some problem with types.
    refetchQueries: [PublicReceiptDocument, MeDocument],
  })

  const onSelect = (itemId: string) => {
    void assignOrRemove({ variables: { itemId } })
  }

  if (itemsData.items.length === 0) {
    return (
      <Paper withBorder radius="md" p="md">
        <Center py="xl">
          <Stack gap={2} align="center">
            <Text fw={600}>No items yet</Text>
            <Text size="sm" c="dimmed">This public receipt does not have any items.</Text>
          </Stack>
        </Center>
      </Paper>
    )
  }

  return (
    <Paper withBorder radius="md" p="md">
      <Table.ScrollContainer minWidth={760}>
        <Table highlightOnHover striped verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>#</Table.Th>
              <Table.Th>Item</Table.Th>
              <Table.Th style={{ textAlign: 'right' }}>Price</Table.Th>
              <Table.Th>Shared by</Table.Th>
              <Table.Th style={{ width: 80 }}>Select</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {itemsData.items.map((item, index) => (
              <PublicReceiptTableItem
                index={index}
                key={item.id}
                data={item}
                isSelected={isSelected(item.id)}
                onSelect={() => { onSelect(item.id) }}
              />
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Paper>
  )
}
