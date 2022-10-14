<template>
  <div class="app-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-back" @click="handlegoback">
          退回主页
      </el-button>
      <h1>宠物详情页</h1>
    <!--框 -height-主图500 附图400*3 描述200 --共1900-->
    <div style="width:100%">
        <!--主图 和 基本参数 -->
        <div style="display: block; clear: both;height:500px;">
          &nbsp;
          <div id="imgSearch"  style="width:500px;height:500px;float:left;background-image:url('/img/back.png');background-size:100% 100%;">
            
          </div>
          <div style="width:50%;height:500px;float:left;margin:0 auto">
            <div style="position:relative;top:10%;left:20%;margin:0 auto">
            <span>宠物详细类型:</span><span id='petStyle'></span><br><br>
            <span>宠物种类:</span>    <span id='petType'></span><br><br>
            <span>宠物简称:</span>    <span id='name'></span><br><br>
            <span>宠物库存数量:</span><span id='petNumber'></span><br><br>
            <span>宠物简介:</span>    <span id='remark'></span><br><br>
            <br><br><br><br><br><br>
            <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-goods" @click="handleAdopt">
              收养此宠物
            </el-button>
            </div>
            
          </div>
        </div>
        <!--附图 和 描述信息 -->
        <div style="width:100%;">
          <h3>宠物介绍</h3>
          <el-input id='petDetails'  type="textarea" style="width:80%;height: 200px;"  :rows="7" placeholder="无相关信息" disabled/>
          <div  id="imgone" style="background-image: url('/img/back.png');background-size: 100% 100%;width: 800px;height: 700px;" >
            附图 1
          </div>
          <div id="imgtwo" style="background-image: url('/img/back.png');background-size: 100% 100%;width: 800px;height: 700px;" >
            附图 2
          </div>
          <div id="imgthree" style="background-image: url('/img/back.png');background-size: 100% 100%;width:800px;height: 700px;" >
            附图 3
          </div>
        </div>
    </div>
    <el-dialog title="收养信息确认" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm"  :model="temp" :rules="rules"  label-position="left" label-width="160px" style="width: 400px; margin-left:50px;">
        <el-form-item label="收养人联系电话号" prop="telephone">
          <el-input v-model="temp.telephone" />
        </el-form-item>
        <el-form-item label="收养备注" prop="adoptRemark">
          <el-input v-model="temp.adoptRemark" type="textarea" rows=7 style="width: 100%;height: 400px;"  placeholder="请输入收养过程中的备注信息" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="createAdoptHandle()">
          确认收养
        </el-button>
      </div>
    </el-dialog>


  </div>

    
</template>

<script>
import { createAdopt, downLoad } from '@/api/pet'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
 
  data() {
    return {
      query:{},

      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      header:[
        {}
      ],
      listQuery: {
        page: 1,
        limit: 20,
        username: '',
        password: '',
        telephone: '',
        old: '',
        role: '',
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        telephone: undefined,
        adoptRemark: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        telephone: [{ required: true, message: '此项是必填项', trigger: 'change' }],
        adoptRemark: [{ required: true, message: '此项是必填项', trigger: 'change' }]
      },
      downloadLoading: false
    }
  },
  created() {
    
    
  },
  mounted(){
    
    if(this.$route.params==null||this.$route.params==undefined||this.$route.params=={}){

    }else if(JSON.stringify(this.$route.params)=="{}"){
      }else{
      var params=this.$route.params;
      console.log(JSON.stringify(params))
      this.query=params;
      this.getList();
    }
    
  },
  methods: {
    getList() {
      //设置属性
      document.getElementById("petStyle").innerHTML=this.query.petStyle;
      document.getElementById("petType").innerHTML=this.query.petType;
      document.getElementById("name").innerHTML=this.query.name;
      document.getElementById("petNumber").innerHTML=this.query.petNumber;
      document.getElementById("remark").innerHTML=this.query.remark;
      //设置介绍
      document.getElementById("petDetails").value=this.query.petDetails;
      //设置图片
      var imgSearch=this.query.imgSearch;
      var imgone=this.query.imgone;
      var imgtwo=this.query.imgtwo;
      var imgthree=this.query.imgthree;
      downLoad(imgSearch).then(response => {
          var fileSrc="";
           fileSrc =   response.data.fileSrc;
           document.getElementById("imgSearch").style.backgroundImage="url('"+fileSrc+"')";
          //document.getElementById("imgSearch").style.backgroundImage=fileSrc;
          //document.getElementById("imgSearch").innerHTML="0";
      })
      downLoad(imgone).then(response => {
          var fileSrc="";
           fileSrc =   response.data.fileSrc;
          document.getElementById("imgone").style.backgroundImage="url('"+fileSrc+"')";
      })
      downLoad(imgtwo).then(response => {
          var fileSrc="";
           fileSrc =   response.data.fileSrc;
          document.getElementById("imgtwo").style.backgroundImage="url('"+fileSrc+"')";
      })
      downLoad(imgthree).then(response => {
          var fileSrc="";
           fileSrc =   response.data.fileSrc;
          document.getElementById("imgthree").style.backgroundImage="url('"+fileSrc+"')";
      })
    },
    handleAdopt(){
      this.dialogFormVisible=true;
    },
    createAdoptHandle(){
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
            var param={};
            param.petCode=this.query.petCode;
            param.telephone=this.temp.telephone;
            param.adoptRemark=this.temp.adoptRemark;
            param.adoptUsername="xxxxx";
            createAdopt(param).then(response => {
                    response.data;
                    debugger
                    if(response.code==200){
                      this.dialogFormVisible=false;
                      alert("收养成功请联系管理人员，获得您的宠物 .工作人员电话：0000-0000-0001");
                      this.temp={
                        telephone: undefined,
                        adoptRemark: undefined
                      };
                      this.handlegoback();
                    }else{
                      alert("收养失败，库存不足哦");
                      this.temp={
                        telephone: undefined,
                        adoptRemark: undefined
                      };
                      this.handlegoback();
                    }
            })
            
        }
      })
      
    },
    handlegoback(){
      this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.findIndex(item => item.path === this.$route.path), 1) 
      this.$router.push(this.$store.state.tagsView.visitedViews[this.$store.state.tagsView.visitedViews.length-1].path)
    }
  }
}
</script>
