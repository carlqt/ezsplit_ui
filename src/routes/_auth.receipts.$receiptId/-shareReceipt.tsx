import { Button, CopyButton, Group, Paper, Text, TextInput } from '@mantine/core'
import { IconCheck, IconLink, IconWorld } from '@tabler/icons-react'
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
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const publicUrl = slug ? `${origin}/receipts/public/${slug}` : ''

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
    <Paper withBorder radius="md" p="md">
      <Group justify="space-between" align="center" mb="xs">
        <Group gap="xs">
          <IconWorld size={18} />
          <Text fw={600}>Share receipt</Text>
        </Group>

        {
          slug === ''
            ? (
                <Button size="xs" leftSection={<IconLink size={14} />} onClick={onClick}>
                  Generate link
                </Button>
              )
            : (
                <CopyButton value={publicUrl} timeout={1200}>
                  {({ copied, copy }) => (
                    <Button
                      size="xs"
                      variant="light"
                      color={copied ? 'teal' : 'gray'}
                      leftSection={copied ? <IconCheck size={14} /> : <IconLink size={14} />}
                      onClick={copy}
                    >
                      {copied ? 'Copied' : 'Copy link'}
                    </Button>
                  )}
                </CopyButton>
              )
        }
      </Group>

      <TextInput
        readOnly
        value={publicUrl}
        placeholder="Generate a public link to share this receipt"
        leftSection={<IconLink size={16} />}
      />
    </Paper>
  )
}
