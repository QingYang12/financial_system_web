<template>
  <div class="app-container">
    <h1>站点救助宠物记录页</h1>
    <div class="filter-container">
      <span style=""><b>救助单号:</b></span><el-input  v-model="listQuery.succourOrderId" placeholder="救助单号" style="width: 200px;margin-right:50px;" class="filter-item"  clearable />
      <span style=""><b>宠物code:</b></span>
      <el-select v-model="listQuery.petCode" clearable placeholder="请选择" style="width: 200px;margin-right:50px;">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span><b>救助时间:</b></span><el-date-picker v-model="listQuery.succourTime" placeholder="选择日期时间" style="width: 200px;margin-right:50px;"  type="datetime"  :picker-options="pickerOptions" clearable/>
      <span><b>救助人账号:</b></span><el-input v-model="listQuery.succourUsername" placeholder="救助人账号" style="width: 200px;margin-right:50px;" class="filter-item"  clearable/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="handleCreate">
        新增
      </el-button>
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
      <el-table-column label="救助单号" prop="succourOrderId" sortable="custom" align="center"  :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.succourOrderId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="宠物code" prop="petCode" sortable="custom" align="center"  :formatter="statusFormatter"  :class-name="getSortClass('id')">
      </el-table-column>
      <el-table-column label="救助时间" prop="succourTime" sortable="custom" align="center"  :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.succourTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="救助人账号" prop="succourUsername" sortable="custom" align="center"  :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.succourUsername }}</span>
        </template>
      </el-table-column>
      <el-table-column label="救助备注" prop="succourRemark" sortable="custom" align="center"  :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.succourRemark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handlelook(row)">
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="this.total>0" :total="this.total" :page.sync="this.listQuery.page" :limit.sync="this.listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="90px" style="width: 400px; margin-left:50px;">
        <el-form-item label="ID" prop="id">
          <el-input v-model="temp.id"  disabled placeholder="自动生成"/>
        </el-form-item>
        <el-form-item label="救助单号" prop="succourOrderId">
          <el-input v-model="temp.succourOrderId"  disabled placeholder="自动生成" />
        </el-form-item>
        <el-form-item label="宠物code" prop="petCode">
          <el-select v-model="temp.petCode" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="救助时间" prop="succourTime">
          <el-date-picker v-model="temp.succourTime"  type="datetime" placeholder="选择日期时间"  :picker-options="pickerOptions"/>
        </el-form-item>
        <el-form-item label="救助人账号" prop="succourUsername">
          <el-input v-model="temp.succourUsername" />
        </el-form-item>
        <el-form-item label="救助备注" prop="succourRemark">
          <el-input v-model="temp.succourRemark"  type="textarea" rows='10'  placeholder="请输入描述"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          提交
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchsuccourRecordHistoryList, deleteUser, createSuccour, updateUser,fetchDicList } from '@/api/pet'
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
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      header:[
        {}
      ],
      options: [{
          value: '选项1',
          label: '选项1'
        }, {
          value: '选项2',
          label: '选项2'
        }],
      listQuery: {
        page: 1,
        limit: 20,
        succourOrderId: '',
        petCode: '',
        succourTime: '',
        succourUsername: '',
        succourRemark: '',
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        succourOrderId: undefined,
        petCode: undefined,
        succourTime: undefined,
        succourUsername: undefined,
        succourRemark: undefined,
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
      downloadLoading: false,
      //时间日期快捷
       pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
    }
  },
  created() {
    this.getList()
    this.getdicList()
  },
  mounted(){
    this.getList()
    this.getdicList()
  },
  methods: {
    getList() {
      this.listLoading = true
      var params={};
      params.pageNum=this.listQuery.page;
      params.pageSize=this.listQuery.limit;
      params.param=this.listQuery;
      fetchsuccourRecordHistoryList(params).then(response => {
        
        this.list = response.pageDate.data;
        this.total = response.total;
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    getdicList() {
      this.listLoading = true
      var params={};
      params.pageNum=1;
      params.pageSize=20000;
      fetchDicList(params).then(response => {
        var diclist=[];
        var data = response.pageDate.data;
        for(var i=0;i<=data.length-1;i++){
          var item={};
          item.value=data[i].code;
          item.label=data[i].code +":  "+data[i].name;
          diclist.push(item);
        }
        this.options=diclist;
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
        succourOrderId: undefined,
        petCode: undefined,
        succourTime: undefined,
        succourUsername: undefined,
        succourRemark: undefined,
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
          createSuccour(this.temp).then(() => {
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
    handlelook(row){
      this.dialogFormVisible = true;
      this.temp=row;
    },
    statusFormatter(row, column) {
        var a=row.petCode;
        var b="";
        for(var i=0;i<=this.options.length-1;i++){
          if(row.petCode==this.options[i].value){
            b=this.options[i].label;
          }
        }
        var s=b
        return s;
    }
  }
}
</script>
