import { ActionIcon, Grid, TextInput, Title, rem } from '@mantine/core'
import { IconArrowRight, IconLink } from '@tabler/icons-react'
import { ReceiptDocument } from '@src/__generated__/graphql'
import { graphql } from '@src/__generated__/gql'
import { useMutation } from '@apollo/client'

const GENERATE_PUBLIC_URL = graphql(`
  mutation generatePublicUrl($receiptId: ID!) {
    generatePublicUrl(id: $receiptId) {
      id
      slug
    }
  }
`)

interface ShareReceiptProps {
  slug: string
  receiptId: string
}

export const ShareReceipt = ({ slug, receiptId }: ShareReceiptProps) => {
  const publicUrl = slug ? `${window.location.origin}/receipts/public/${slug}` : ''

  const [generatePublicUrl] = useMutation(GENERATE_PUBLIC_URL, {
    update: (cache, { data }) => {
      const receiptDocument = cache.readQuery({ query: ReceiptDocument, variables: { receiptId } })

      if (!receiptDocument) return
      if (!data?.generatePublicUrl) return

      cache.writeQuery({
        data: {
          receipt: receiptDocument.receipt,
        },
        query: ReceiptDocument,
        variables: { receiptId },
      })
    },
    variables: { receiptId },
  })

  const onClick = () => {
    if (slug === '') {
      void generatePublicUrl()
    }
  }

  return (
    <Grid>
      <Grid.Col span="content">
        <Title order={2}>Share:</Title>
      </Grid.Col>

      <Grid.Col span={4}>
        <TextInput
          disabled
          size="md"
          value={publicUrl}
          rightSectionWidth={42}
          leftSection={<IconLink />}
          rightSection={(
            <ActionIcon onClick={onClick} size={32} radius="xl" variant="filled">
              <IconArrowRight style={{ height: rem(18), width: rem(18) }} stroke={1.5} />
            </ActionIcon>
          )}
        />
      </Grid.Col>
    </Grid>
  )
}
