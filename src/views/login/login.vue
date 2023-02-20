<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-form-item label="UserName" prop="userName">
      <el-input v-model="ruleForm.userName" type="text" autocomplete="off" />
    </el-form-item>
    <el-form-item label="Password" prop="pwd">
      <el-input
        v-model="ruleForm.pwd"
        type="password"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="loginFn()">
        {{ $t('login.login')}}
      </el-button>
    </el-form-item>
  </el-form>
  <el-button type="primary" @click="changeLang('en')">英文</el-button>
  <el-button type="primary" @click="changeLang('zh')">中文</el-button>
</template>

<script setup lang='ts'>
import { ref, toRefs, reactive, onMounted } from 'vue'
import api from '../../api/api'
import Cookie from 'js-cookie'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const { t } = useI18n()
console.log(t('login.userName'))
onMounted(() => {
  console.log(t('login.userName'))
})
// 切换中英文
const changeLang = (val: string) => {
  locale.value = val
  localStorage.setItem('lang', val)
}
let ruleForm = reactive({
    userName: '',
    pwd: ''
})
// let { ruleForm } = toRefs(data)

// 获取el-from组件对象
let ruleFormRef = ref()

// 获取项目路由对象
let router = useRouter()

// 获取项目vuex对象
let store = useStore()

// 密码验证规则
const validatePass = (rule: unknown, value: string | undefined, callback: (msg?: string) => void) => {
  if (!value) {
    callback('密码不能为空')
  } else {
    callback()
  }
}

// 校验规则
const rules = reactive({
  userName: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
  ],
  pwd: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { validator: validatePass, trigger: 'blur' }
  ]
})

// 登陆方法
const loginFn = () => {
  ruleFormRef.value.validate().then(() => {
    console.log('校验通过')
    let data = {
      username: ruleForm.userName,
      password: ruleForm.pwd
    }
    console.log(api)
    api.loginApi(data).then((res: { code: number; data: { token: string } }) => {
      if(res.code === 200) {
        // 先存储token
        // js-cookie
        Cookie.set('token', res.data.token,{expires: 7}) // expires: 7 过期时间7天
        store.dispatch('getUserInfo').then(res => {
          // 跳转到首页
          router.push('/index')
        })
        store.commit('')
      }
    })
  }).catch(() => {
    console.log('校验不通过')
  })
}

</script>
<style scoped lang='less'>

</style>