
const controlVue = new Vue({
    el:'#app',
    data:{
        name:'',
        gender:'male',
        mailbox:'',
        password:'',
        confirm:'',
        phone1:'',
        phone2:'',
        address:'',
        rule_1:'none',
        mailbox_rule:'none',
        rule_2:'none',
        rule_3:'none',
        msg:'',
        rule_4:'none',
        rule_5:'none',
        city_map: districtList,
        area_map:districtList[0].areaname,
        city:'臺北市',
        area:'中正區',
        index_city:0,
        rule_6:'none',
        sendornot:false
    },
    watch:{
        name(){
           this.regularRule_name();
        },
        mailbox(){
            this.regularRule_mailbox();
            if(this.rule_2 == 'none'){
                this.used();
            }
        },
        password(){
            this.regularRule_password();
        },
        confirm(){
            this.regularRule_confirm();
        },
        phone1(){
            this.phone1_check();
        },
        phone2(){
            this.phone2_check();
        },
        city(){
            this.city_check();
        },
        address(){
            this.add_check();
        }
    },
    methods:{
        regularRule_name(){
            let patt = /[\u4e00-\u9fa5]{2,10}/;
            let rule = patt.test(this.name);
            if(rule == false){
                this.rule_1 = 'block';
            }
            else if(rule == true){
                this.rule_1 = 'none';
            }
        },
        regularRule_mailbox(){
            let patt=/[a-zA-Z0-9]+@[a-zA-Z0-9.]+/;
            let rule = patt.test(this.mailbox);
            if(rule == false){
                this.mailbox_rule ='block';
            }
            else if(rule == true){
                this.mailbox_rule = 'none';
            }
        },
        regularRule_password(){
            let patt =/^(?=.*[^a-zA-Z0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,20}$/;
            let rule = patt.test(this.password)
            if(rule == false){
                this.rule_2 = 'block';
            }
            else if(rule == true){
                this.rule_2 = 'none';
            }
        },
        regularRule_confirm(){
            if (this.password == this.confirm){
                this.rule_3 = 'none';
            }
            else{
                this.rule_3 = 'block';
            }

        },
        used(){
            axios.post('../member/post_signAJAX', { acc: this.mailbox })
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
        },
        phone1_check(){
            let patt = /^\d{8,10}$/;
            this.phone1 = this.phone1.replace(/-/g,'');
            this.phone1 = this.phone1.replace(/\s/g,'');
            let rule = patt.test(this.phone1);
            if(rule == true){
                this.rule_4 = 'none';
            }
            else if(rule == false){
                this.rule_4 = 'block';
            }
        },
        phone2_check(){
            let patt = /^09\d{8}$/;
            this.phone2 = this.phone2.replace(/-/gi,'');
            this.phone2 = this.phone2.replace(/\s/gi,'');
            let rule = patt.test(this.phone2);
            if(rule == true){
                this.rule_5 = 'none';
                this.sendornot = true;
            }
            else if(rule == false){
                this.rule_5 = 'block';
                this.sendornot = false;
            }
        },
        city_check(self){
            this.index_city = self;
            this.area_map = districtList[this.index_city].areaname;
        },
        add_check(){
            let patt = /[^`~%@#$^*!&+'"?<>/\\]+/;
            let rule = patt.test(this.address);
            if(rule == true){
                this.rule_6 = 'none';
            }
            else if(rule == false){
                this.rule_6 = 'block'
            }

        },
    }
})

const checkM = function(){
    var errMSG = '';
    if(controlVue.rule_1 !== 'none'){
        event.preventDefault(); 
        errMSG += "R1";
    }
    if(controlVue.rule_2 !== 'none'){
        event.preventDefault(); 
        errMSG += "R2";
    }
    if(controlVue.rule_3 !== 'none'){
        event.preventDefault(); 
        errMSG += "R3";
    }
    if(controlVue.rule_4 !== 'none'){
        event.preventDefault(); 
        errMSG += "R4";
    }
    if(controlVue.rule_5 !== 'none'){
        event.preventDefault(); 
        errMSG += "R5";
    }
    if(controlVue.rule_6 !== 'none'){
        event.preventDefault(); 
        errMSG += "R6";
    }
    if(controlVue.sendornot == false){
        event.preventDefault(); 
    }
    if(errMSG !== ''){
        alert("請正確填寫!");
    }else{
    }

}