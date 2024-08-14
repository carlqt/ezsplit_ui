import { ActionIcon, Grid, rem, TextInput, Title } from "@mantine/core"
import { graphql } from "@src/__generated__/gql"
import { IconArrowRight } from "@tabler/icons-react"

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
  return (
    <Grid>
      <Grid.Col span="content">
        <Title order={2}>Share:</Title>
      </Grid.Col>

      <Grid.Col span={4}>
        <TextInput
          disabled
          size="md"
          placeholder={slug}
          rightSectionWidth={42}
          rightSection={
            <ActionIcon size={32} radius="xl" variant="filled">
              <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
          }
        />
      </Grid.Col>
    </Grid>
  )
}
