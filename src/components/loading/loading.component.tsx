import SyncLoader from 'react-spinners/SyncLoader'
import { LoadingContainer } from './loading.styles'

interface LoadingProps {
  message?: string
}

const Loading = ({ message }: LoadingProps) => {
  return (
    <LoadingContainer>
      {message && <p>{message}</p>}
      <SyncLoader size={30} />
    </LoadingContainer>
  )
}

export default Loading
