export const deleteComment = async (id: number): Promise<void> => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("댓글 삭제 실패")
  }
}
