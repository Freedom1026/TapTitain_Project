
const districtList = [{cityname:"臺北市",areaname:["中正區","大同區","中山區","松山區","大安區","萬華區","信義區","士林區","北投區","內湖區","南港區","文山區"]},{cityname:"基隆市",areaname:["仁愛區","信義區","中正區","中山區","安樂區","暖暖區","七堵區"]},{cityname:"新北市",areaname:["萬里區","金山區","板橋區","汐止區","深坑區","石碇區","瑞芳區","平溪區","雙溪區","貢寮區","新店區","坪林區","烏來區","永和區","中和區","土城區","三峽區","樹林區","鶯歌區","三重區","新莊區","泰山區","林口區","蘆洲區","五股區","八里區","淡水區","三芝區","石門區"]},{cityname:"連江縣",areaname:["南竿鄉","北竿鄉","莒光鄉","東引鄉"]},{cityname:"宜蘭縣",areaname:["宜蘭市","壯圍鄉","頭城鎮","礁溪鄉","員山鄉","羅東鎮","三星鄉","大同鄉","五結鄉","冬山鄉","蘇澳鎮","南澳鄉","釣魚臺"]},{cityname:"釣魚臺",areaname:["釣魚臺"]},{cityname:"新竹市",areaname:["東區","北區","香山區"]},{cityname:"新竹縣",areaname:["寶山鄉","竹北市","湖口鄉","新豐鄉","新埔鎮","關西鎮","芎林鄉","竹東鎮","五峰鄉","橫山鄉","尖石鄉","北埔鄉","峨眉鄉"]},{cityname:"桃園市",areaname:["中壢區","平鎮區","龍潭區","楊梅區","新屋區","觀音區","桃園區","龜山區","八德區","大溪區","復興區","大園區","蘆竹區"]},{cityname:"苗栗縣",areaname:["竹南鎮","頭份市","三灣鄉","南庄鄉","獅潭鄉","後龍鎮","通霄鎮","苑裡鎮","苗栗市","造橋鄉","頭屋鄉","公館鄉","大湖鄉","泰安鄉","銅鑼鄉","三義鄉","西湖鄉","卓蘭鎮"]},{cityname:"臺中市",areaname:["中區","東區","南區","西區","北區","北屯區","西屯區","南屯區","太平區","大里區","霧峰區","烏日區","豐原區","后里區","石岡區","東勢區","和平區","新社區","潭子區","大雅區","神岡區","大肚區","沙鹿區","龍井區","梧棲區","清水區","大甲區","外埔區","大安區"]},{cityname:"彰化縣",areaname:["彰化市","芬園鄉","花壇鄉","秀水鄉","鹿港鎮","福興鄉","線西鄉","和美鎮","伸港鄉","員林市","社頭鄉","永靖鄉","埔心鄉","溪湖鎮","大村鄉","埔鹽鄉","田中鎮","北斗鎮","田尾鄉","埤頭鄉","溪州鄉","竹塘鄉","二林鎮","大城鄉","芳苑鄉","二水鄉"]},{cityname:"南投縣",areaname:["南投市","中寮鄉","草屯鎮","國姓鄉","埔里鎮","仁愛鄉","名間鄉","集集鎮","水里鄉","魚池鄉","信義鄉","竹山鎮","鹿谷鄉"]},{cityname:"嘉義市",areaname:["西區","東區"]},{cityname:"嘉義縣",areaname:["番路鄉","梅山鄉","竹崎鄉","阿里山鄉","中埔鄉","大埔鄉","水上鄉","鹿草鄉","太保市","朴子市","東石鄉","六腳鄉","新港鄉","民雄鄉","大林鎮","溪口鄉","義竹鄉","布袋鎮"]},{cityname:"雲林縣",areaname:["斗南鎮","大埤鄉","虎尾鎮","土庫鎮","褒忠鄉","東勢鄉","臺西鄉","崙背鄉","麥寮鄉","斗六市","林內鄉","古坑鄉","莿桐鄉","西螺鎮","二崙鄉","北港鎮","水林鄉","口湖鄉","四湖鄉","元長鄉"]},{cityname:"臺南市",areaname:["中西區","東區","南區","北區","安平區","安南區","永康區","歸仁區","新化區","左鎮區","玉井區","楠西區","南化區","仁德區","關廟區","龍崎區","官田區","麻豆區","佳里區","西港區","七股區","將軍區","學甲區","北門區","新營區","後壁區","白河區","東山區","六甲區","下營區","柳營區","鹽水區","善化區","新市區","大內區","山上區","安定區"]},{cityname:"高雄市",areaname:["新興區","前金區","苓雅區","鹽埕區","鼓山區","旗津區","前鎮區","三民區","楠梓區","小港區","左營區","仁武區","大社區","東沙群島","南沙群島","岡山區","路竹區","阿蓮區","田寮區","燕巢區","橋頭區","梓官區","彌陀區","永安區","湖內區","鳳山區","大寮區","林園區","鳥松區","大樹區","旗山區","美濃區","六龜區","內門區","杉林區","甲仙區","桃源區","那瑪夏區","茂林區","茄萣區"]},{cityname:"南海島",areaname:["東沙群島","南沙群島"]},{cityname:"澎湖縣",areaname:["馬公市","西嶼鄉","望安鄉","七美鄉","白沙鄉","湖西鄉"]},{cityname:"金門縣",areaname:["金沙鎮","金湖鎮","金寧鄉","金城鎮","烈嶼鄉","烏坵鄉"]},{cityname:"屏東縣",areaname:["屏東市","三地門鄉","霧臺鄉","瑪家鄉","九如鄉","里港鄉","高樹鄉","鹽埔鄉","長治鄉","麟洛鄉","竹田鄉","內埔鄉","萬丹鄉","潮州鎮","泰武鄉","來義鄉","萬巒鄉","崁頂鄉","新埤鄉","南州鄉","林邊鄉","東港鎮","琉球鄉","佳冬鄉","新園鄉","枋寮鄉","枋山鄉","春日鄉","獅子鄉","車城鄉","牡丹鄉","恆春鎮","滿州鄉"]},{cityname:"臺東縣",areaname:["臺東市","綠島鄉","蘭嶼鄉","延平鄉","卑南鄉","鹿野鄉","關山鎮","海端鄉","池上鄉","東河鄉","成功鎮","長濱鄉","太麻里鄉","金峰鄉","大武鄉","達仁鄉"]},{cityname:"花蓮縣",areaname:["花蓮市","新城鄉","秀林鄉","吉安鄉","壽豐鄉","鳳林鎮","光復鄉","豐濱鄉","瑞穗鄉","萬榮鄉","玉里鎮","卓溪鄉","富里鄉"]},]
const controlVue = new Vue({
    el:'#app',
    data:{
        name:'',
        gender:'male',
        mailbox:'',
        password:'',
        confirm:'',
        birthday:'',
        phone1:'',
        phone2:'',
        address:'',
        rule_1:'none',
        mailbox_rule:'none',
        rule_2:'none',
        rule_3:'none',
        msg:'',
        hideBirth:0,
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
        birthday(){
            this.birthday_format();
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
        birthday_format(){
            let date = new Date(this.birthday);
            this.hideBirth = date.getTime()/1000;
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
            }
            else if(rule == false){
                this.rule_5 = 'block';
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

        }
    }
})

const checkM = function(){
    var errMSG = '';
    if(controlVue.rule_1 !== 'none'){
        errMSG += "R1";
    }
    if(controlVue.rule_2 !== 'none'){
        errMSG += "R2";
    }
    if(controlVue.rule_3 !== 'none'){
        errMSG += "R3";
    }
    if(controlVue.rule_4 !== 'none'){
        errMSG += "R4";
    }
    if(controlVue.rule_5 !== 'none'){
        errMSG += "R5";
    }
    if(controlVue.rule_6 !== 'none'){
        errMSG += "R6";
    }
    if(errMSG !== ''){
        alert("請正確填寫!");
        return false;
    }else{
        return true;
    }

}