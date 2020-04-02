
const controlVue = new Vue({
    el:'#app',
    data:{
        account:'',
        password:'',
        rule_1:'none',
        rule_2:'none',
        msg:''
    },
    watch:{
        account:function(newd,oldd){
        this.regularRule_account();
        },
        password:function(){
        this.regularRule_password();
        }
        },
    methods:{
        regularRule_account:function(){
            let patt = /^[a-zA-Z]\w{8,20}/;
            let rule = patt.test(this.account);
            if(rule == false){
                this.rule_1 = 'block';
            }
            else if(rule == true){
                this.rule_1 = 'none';
            }
        },
        regularRule_password:function(){
            let patt =/^(?=.*[^a-zA-Z0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;
            let rule = patt.test(this.password)
            if(rule == false){
                this.rule_2 = 'block';
            }
            else if(rule == true){
                this.rule_2 = 'none';
            }
        },
        used:function(){
            axios.post('../member/post_signAJAX', { acc: this.account })
            .then((res) => {
            let accAdd = res.data[0].n;
            if(accAdd >= 1){
                this.msg += '<br>此帳號已有人使用'
            }
            else{
                this.msg += '<br>此帳號可以使用'
            }
            })
        .catch((error) => { console.error(error) })
        }
    }
})
