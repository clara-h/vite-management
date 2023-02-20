/**
 * 校验规则
 */

// 密码6-15位，包括数字，大写字母，小写字母
export const validPassword = (val: any, propName: any = 'Password') => {
  if (val.length < 6) {
    return `${propName} must be greater than or equal to 6 characters`
  } else if (val.length > 15) {
    return `${propName} must be less than or equal to 15 characters`
  } else {
    const pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9]{6,15}$/
    if (!pattern.test(val)) {
      return `${propName} must include numbers, uppercase and lowercase letters`
    } else {
      return true
    }
  }
}
