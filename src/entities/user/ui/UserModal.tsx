import { Dialog } from "@shared/ui"
import { UserInfo, UserInfoSkeleton } from "@entities/user/ui"
import { useUserQuery } from "@entities/user/model/hooks/queries"
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
          <Dialog.Title className="flex items-center justify-center">사용자 정보</Dialog.Title>
        </Dialog.Header>
        {!user ? <UserInfoSkeleton /> : <UserInfo user={user} />}
      </Dialog.Content>
    </Dialog>
  )
}
