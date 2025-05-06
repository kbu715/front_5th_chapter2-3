import { User } from "@entities/user/model/types"
import { Card } from "@shared/ui/Card"

interface UserInfoProps {
  user: User
}

export const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <Card className="max-w-md mx-auto overflow-hidden">
      <Card.Header className="flex items-center justify-center pb-0">
        <div className="relative">
          <img
            src={user.image}
            alt={user.username}
            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
          />
        </div>
        <Card.Title className="mt-4 text-2xl font-bold">{user.username}</Card.Title>
      </Card.Header>
      <Card.Content className="mt-4">
        <div className="grid grid-cols-1 gap-3 text-sm">
          <div className="flex items-center p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <span className="font-medium w-24 text-gray-600">이름:</span>
            <span>
              {user.firstName} {user.lastName}
            </span>
          </div>
          <div className="flex items-center p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <span className="font-medium w-24 text-gray-600">나이:</span>
            <span>{user.age}</span>
          </div>
          <div className="flex items-center p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <span className="font-medium w-24 text-gray-600">이메일:</span>
            <span>{user.email}</span>
          </div>
          <div className="flex items-center p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <span className="font-medium w-24 text-gray-600">전화번호:</span>
            <span>{user.phone}</span>
          </div>
          <div className="flex items-center p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <span className="font-medium w-24 text-gray-600">주소:</span>
            <span>
              {user.address?.address}, {user.address?.city}, {user.address?.state}
            </span>
          </div>
          <div className="flex items-center p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <span className="font-medium w-24 text-gray-600">직장:</span>
            <span>
              {user.company?.name} - {user.company?.title}
            </span>
          </div>
        </div>
      </Card.Content>
    </Card>
  )
}
