<template>
    <el-form 
        :model="registerform" 
        ref="form" 
        :rules="rules" 
        class="form">
            <el-form-item class="form-item" prop='username'>
                <el-input 
                v-model="registerform.username"
                placeholder="手机号">
                </el-input>
            </el-form-item>

            <el-form-item class="form-item"  prop='captcha'>
                <el-input 
                v-model="registerform.captcha"
                placeholder="验证码" >
                    <template slot="append">
                        <el-button @click="handleSendCaptcha">
                            发送验证码
                        </el-button>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop='nickname'>
                <el-input 
                v-model="registerform.nickname"
                placeholder="你的名字">
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop='password'>
                <el-input 
                v-model="registerform.password"
                placeholder="密码" 
                type="password"
                ></el-input>
            </el-form-item>

            <el-form-item class="form-item" prop='checkpassword'>
                <el-input 
                v-model="registerform.checkpassword"
                placeholder="确认密码" 
                type="password">
                </el-input>
            </el-form-item>

            <el-button 
            class="submit" 
            type="primary" 
            @click="handleRegSubmit">
                注册
            </el-button>
        </el-form>
</template>

<script>
export default {
    data(){
       var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerform.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
        return {
            // 表单数据
            registerform: {
                username:'',
                nickname:'',
                captcha:'',
                password:'',
                checkpassword:''
            },
            // 表单规则
            rules: {
                username:[
                    { required: true, message: "请输入手机号", trigger: "blur"},
                    { pattern: /^1[3456789]\d{9}$/, message: "手机格式错误请确认", trigger: "blur" }
                ],
                captcha:[
                    { required: true, message: "请输入验证码", trigger: "blur" }
                ],
                nickname:[
                    { required: true, message: "名字不能为空", trigger: "blur" }
                ],
                password:[
                    { required: true, message: "密码不能为空", trigger: "blur" }
                ],
                checkpassword:[
                    { validator:validatePass , trigger: 'blur' }
                ]
            },
        }
    },
    methods: {
        // 发送验证码
        handleSendCaptcha(){
            this.$axios({
                url:'/captchas',
                method:'POST',
                data:{tel:this.registerform.username}
            }).then(res=>{
                console.log(res);
            })
        },


        // 注册
        handleRegSubmit(){
           const {checkpassword,...abc} =this.registerform
            this.$axios({
                url:'/accounts/register',
                method:'POST',
                data:abc
            }).then(res=>{
                console.log(res);
                this.$store.commit('user/setUserInfo',res.data)
                this.$router.push('/')
            }).catch(err=>{
                console.log(err);
                })
           console.log(this.registerform)
        }
    }
}
</script>

<style scoped lang="less">
    .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
</style>