/**
 * 格式转换工具集
 */
import NP from 'number-precision'
import dayjs from 'dayjs'
import { isEmpty } from './common'

// 数值转百分比
export function numToPercent(value: number) {
  if (isNaN(value)) {
    return '-'
  }
  
  return NP.times(value, 100) + ' %'
}

// 金额格式化
export function numToAmount(value: number) {
  if (isNaN(value)) {
    return '-'
  }

  const intMatch = String(value).match(/^-?\d+/)
  const int = intMatch ? intMatch[0] : 0
  const tail = String(value).match(/\.\d+/)
  const moneyInt = String(int)
    .split('')
    .reverse()
    .join('')
    .replace(/(\d{3})/g, '$1,')
    .replace(/,$/, '')
    .replace(/,-$/, '-')
    .split('')
    .reverse()
    .join('')

  return moneyInt + (tail ? tail[0] : '')
}

// 日期格式化
export function formatTime(value: string) {
  if (isEmpty(value)) {
    return '-'
  }

  return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
}
