import dayjs from 'dayjs'

export function formatPrice(price: number) {
  return `NT$${price.toLocaleString('zh-TW')}`
}

export function formatDate(date: string | Date) {
  return dayjs(date).format('YYYY/MM/DD HH:mm')
} 