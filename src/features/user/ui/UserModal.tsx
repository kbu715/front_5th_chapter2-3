import { Dialog } from "../../../shared/ui"
import { UserInfo } from "../../../entities/user/ui"
import { useUserQuery } from "../../../entities/user/model/hooks/queries/useUserQuery"
import { UserInfoSkeleton } from "./UserInfoSkeleton"
interface UserModalProps {
  userId: number
  isOpen: boolean
  close: () => void
}

export const UserModal = ({ userId, isOpen, close }: UserModalProps) => {
  const { data: user } = useUserQuery(userId)

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          close()
        }
      }}
    >
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>사용자 정보</Dialog.Title>
        </Dialog.Header>
        {!user ? <UserInfoSkeleton /> : <UserInfo user={user} />}
      </Dialog.Content>
    </Dialog>
  )
}
