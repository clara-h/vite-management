import { ComponentInternalInstance, getCurrentInstance } from 'vue'
export default function useCurrentInstance() {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance
  const globalProp = appContext.config.globalProperties
  return {
    globalProp
  }

}