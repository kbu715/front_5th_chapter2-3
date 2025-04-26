export const deletePost = async (id: number): Promise<void> => {
  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("게시물 삭제 실패")
  }
}
