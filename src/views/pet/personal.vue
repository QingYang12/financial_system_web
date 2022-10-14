<template>
  <div class="app-container">
    <h1>个人中心</h1>
    <div class="filter-container">
      <div style="width:100%height:200px">
            <div id="imgSearch"  style="width:200px;height:200px;float:left;background-image:url('/img/pan2.png');background-size:100% 100%;">
              
            </div>
            <div style="width:500px;height:200px;float:left;">
              <span>账号:</span><span id="username"></span><br>
              <span>电话号:</span><span id="telephone"></span><br>
              <span>年龄:</span><span id="old"></span><br>
              <span>荣誉称号:</span><span id="honorTitle"></span><br>
              <span>荣誉等级:</span><span id="honorLevel"></span><br>
            </div>
      </div>
      <div style="width:100%height:200px;">
        <h3>个人收养记录</h3>
      </div>
    </div>
    
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="this.list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="ID" prop="id" sortable="custom" align="center" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="收养单号" prop="adoptOrderId" sortable="custom" align="center"  :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.adoptOrderId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="宠物code" prop="petCode" sortable="custom" align="center"  :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.petCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="收养时间" prop="adoptTime" sortable="custom" align="center"  :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.adoptTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="收养人账号" prop="adoptUsername" sortable="custom" align="center"  :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.adoptUsername }}</span>
        </template>
      </el-table-column>
      <el-table-column label="救助备注" prop="adoptRemark" sortable="custom" align="center"  :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.adoptRemark }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="this.total>0" :total="this.total" :page.sync="this.listQuery.page" :limit.sync="this.listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import { fetchUserList,fetchcustomerList, fetchadoptRecordHistoryList,tokenfetchUser } from '@/api/pet'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { getToken } from '@/utils/auth'

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
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      header:[
        {}
      ],
      honorTitle: ["爱宠小白","爱宠小白","爱宠平民","爱心公众人物","爱心大使","爱宠王子","宠物王国国王","救世主","救世主+","救世主++","救世主+++","救世主+++"],
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
        id: undefined,
        username: undefined,
        password: undefined,
        telephone: undefined,
        old: undefined,
        role: undefined
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
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  mounted(){
  },
  methods: {
    getList() {
      var self=this;
      const hasToken = getToken()
      tokenfetchUser(hasToken).then(response => {
        debugger
         var usernames= response.data.username;
          self.listLoading = true
          var params1={param:{}};
          params1.pageNum=self.listQuery.page;
          params1.pageSize=self.listQuery.limit;
          //设置账号
          params1.param.username=usernames;
          fetchUserList(params1).then(response => {
            var o=response.pageDate.data;
            if(response.pageDate.data.length>0){
              var personal= response.pageDate.data[0];
              document.getElementById("username").innerHTML=personal.username;
              document.getElementById("telephone").innerHTML=personal.telephone;
              document.getElementById("old").innerHTML=personal.old;
            }
          })
          fetchcustomerList(params1).then(response => {
            var o=response.pageDate.data;
            if(response.pageDate.data.length>0){
              var personal= response.pageDate.data[0];
              document.getElementById("username").innerHTML=personal.username;
              document.getElementById("telephone").innerHTML=personal.telephone;
              document.getElementById("old").innerHTML=personal.old;
            }
          })
          var params={param:{}};
          params.pageNum=self.listQuery.page;
          params.pageSize=20000;
          //设置账号
          params.param.adoptUsername=usernames;
          fetchadoptRecordHistoryList(params).then(response => {
            self.list = response.pageDate.data;
            self.total = response.total;
            self.honorset(self.total);
            setTimeout(() => {
              self.listLoading = false
            }, 1.5 * 1000)
          })
      })




      
      
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        username: undefined,
        password: undefined,
        telephone: undefined,
        old: undefined,
        role: undefined
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createUser(this.temp).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updateUser(this.temp).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
        }
      })
    },
    handleDelete(row, index) {
      deleteUser(row.id).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Delete Successfully',
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    },
    honorset(total){
      var level=1;
      var honor="";
      if(total<=1){//1
        level=1;
      }else if (total<=3){//2
        level=2;
      }else if (total<=5){//3
        level=3;
      }else if (total<=10){//4
        level=4;
      }else if (total<=10){//5
        level=5;
      }else if (total<=20){//6
        level=6;
      }else if (total<=30){//7
        level=7;
      }else if (total<=50){//8
        level=8;
      }else if (total<=100){//9
        level=9;
      }else if (total<=200){//10
        level=10;
      }else{
        level=10;
      }
      honor=this.honorTitle[level];
      document.getElementById("honorTitle").innerHTML=honor;
      document.getElementById("honorLevel").innerHTML=level;
    }
  }
}
</script>
