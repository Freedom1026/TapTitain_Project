
const controlVue = new Vue({
    el:'#app',
    data:{
        account:'',
        password:'',
        confirm:'',
        rule_1:'none',
        rule_2:'none',
        rule_3:'none',
        msg:''
    },
    watch:{
        account:function(newd,oldd){
           this.regularRule_account();
           if(this.rule_1 == 'none'){
               this.used();
           }
        },
        password:function(){
            this.regularRule_password();
        },
        confirm:function(){
            this.regularRule_confirm();
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
        regularRule_confirm:function(){
            if (this.password == this.confirm){
                this.rule_3 = 'none';
            }
            else{
                this.rule_3 = 'block';
            }

        },
        used:function(){
            axios.post('../member/post_signAJAX', { acc: this.account })
            .then((res) => {
            let accAdd = res.data[0].n;
            if(accAdd >= 1){
                this.msg = '此帳號已有人使用'
            }
            else{
                this.msg = '此帳號可以使用'
            }
            })
        .catch((error) => { console.error(error) })
        }
    }
})

const checkM = function(){
    console.log("'我應該出現'");
    return false;
}