export function getImageUrl(imageKey: string | null | undefined): string | null {
  if (!imageKey) return null

  console.log(process.env.REACT_APP_PUBLIC_R2_PUBLIC_URL)

  return `${process.env.REACT_APP_PUBLIC_R2_PUBLIC_URL}/${imageKey}`
}

// For displaying images on the frontend
export function getDisplayImageUrl(imageKey: string | null | undefined): string {
  return getImageUrl(imageKey) || "/placeholder-image.png"
}
