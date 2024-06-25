import { Container, Title } from "@mantine/core"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth/receipts/new")({
  component: ReceiptsNewPage,
})

function ReceiptsNewPage() {
  return (
    <Container>
      <Title order={1}>New Receipt</Title>
    </Container>
  )
}
