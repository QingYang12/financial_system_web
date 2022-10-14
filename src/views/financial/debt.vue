<template>
  <div class="app-container">
    <h1>债务管理页</h1>
    <div class="filter-container">
      <el-row>
      <span style=""><b>债务类别:</b></span>
      <el-select v-model="listQuery.type" placeholder="请选择" style="width: 140px;margin-right:50px;" >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span><b>公司名称:</b></span><el-input v-model="listQuery.name" placeholder="公司名称" style="width: 140px;margin-right:50px;" class="filter-item"  clearable />
      <span><b>债务金额:</b></span><el-input v-model="listQuery.money" placeholder="债务金额" style="width: 140px;margin-right:50px;" class="filter-item"  clearable />
      <span><b>本期应还款金额:</b></span><el-input v-model="listQuery.currentPayMoney" placeholder="本期应还款金额" style="width: 140px;margin-right:50px;" class="filter-item"  clearable />
      </el-row>
      <el-row>
      <span><b>发生时间:</b></span>
      <el-date-picker
        v-model="listQuery.happenTimes"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd HH:mm:ss">
      </el-date-picker>
      <span><b>还款时间:</b></span>
      <el-date-picker
        v-model="listQuery.repaymentTimes"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd HH:mm:ss">
      </el-date-picker>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="handleCreate">
        新增
      </el-button>
      </el-row>
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
      <el-table-column label="公司名称" prop="name" sortable="custom" align="center"  :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="债务类别" prop="type" sortable="custom" align="center"  :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.type }}</span>
        </template>
      </el-table-column>
      
      <el-table-column label="债务金额" prop="money" sortable="custom" align="center"  :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.money }}</span>
        </template>
      </el-table-column>
      <el-table-column label="还款日期" prop="money" sortable="custom" align="center"  :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.repaymentTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="还款类别" prop="repaymentType" sortable="custom" align="center"  :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.repaymentType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="还款时长" prop="repaymentDayNum" sortable="custom" align="center"  :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.repaymentDayNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="本期应还款金额" prop="currentPayMoney" sortable="custom" align="center"  :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.currentPayMoney }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发生时间" prop="happenTime" sortable="custom" align="center"  :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.happenTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="this.total>0" :total="this.total" :page.sync="this.listQuery.page" :limit.sync="this.listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="80px" style="width: 400px; margin-left:50px;">
        <el-form-item label="ID" prop="id">
          <el-input v-model="temp.id"  disabled placeholder="自动生成"/>
        </el-form-item>
        <el-form-item label="债务类别" prop="type" >
          <el-select v-model="temp.type" placeholder="请选择" style="width: 200px;margin-right:50px;" >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公司名称" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="债务金额" prop="money">
          <el-input v-model="temp.money" />
        </el-form-item>
        <el-form-item label="本期应还款金额" prop="currentPayMoney">
          <el-input v-model="temp.currentPayMoney" />
        </el-form-item>
        <el-form-item label="还款时长" prop="repaymentDayNum">
          <el-input v-model="temp.repaymentDayNum" />
        </el-form-item>
        <el-form-item label="还款类别" prop="repaymentType" >
          <el-select v-model="temp.repaymentType" placeholder="请选择" style="width: 200px;margin-right:50px;" >
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="最后还款日期" prop="repaymentTime">
          <el-date-picker
            v-model="temp.repaymentTime"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="发生时间" prop="happenTime">
          <el-date-picker
            v-model="temp.happenTime"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
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
import { fetchdebtList, fetchUser,deletedebt, createdebt, updatedebt } from '@/api/financial'
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
      options: [
        {
          value: '',
          label: ''
        },{
          value: '房贷',
          label: '房贷'
        }, {
          value: '车贷',
          label: '车贷'
        }, {
          value: '消费贷',
          label: '消费贷'
        }],
      options2: [
        {
          value: '',
          label: ''
        },{
          value: '每月等息',
          label: '每月等息'
        }, {
          value: '定息一次',
          label: '定息一次'
        }],
      usernameDisable:0,
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      header:[
        {}
      ],
      listQuery: {
        page: 1,
        limit: 5000,
        type: '',
        money: '',
        name: '',
        currentPayMoney: '',
        happenTime: '',
        happenTimes: [],
        happenTimesStart: '',
        happenTimesEnd: '',
        repaymentTimes: [],
        repaymentTimesStart: '',
        repaymentTimesEnd: '',
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        type: undefined,
        money: undefined,
        happenTime: undefined,
        repaymentTime: undefined,
        name: undefined,
        repaymentDayNum: undefined,
        currentPayMoney: undefined,
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
      this.listLoading = true
      var params={};
      params.pageNum=this.listQuery.page;
      params.pageSize=this.listQuery.limit;
      if(this.listQuery.happenTimes.length>1){
        this.listQuery.happenTimesStart=this.listQuery.happenTimes[0];
        this.listQuery.happenTimesEnd=this.listQuery.happenTimes[1];
      }
      if(this.listQuery.repaymentTimes.length>1){
        this.listQuery.repaymentTimesStart=this.listQuery.repaymentTimes[0];
        this.listQuery.repaymentTimesEnd=this.listQuery.repaymentTimes[1];
      }
      params.param=this.listQuery;
      fetchdebtList(params).then(response => {
        
        this.list = response.pageDate.data;
        this.total = response.total;
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
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
      this.usernameDisable=0;
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createdebt(this.temp).then(() => {
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
      this.usernameDisable=1;
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updatedebt(this.temp).then(() => {
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
      deletedebt(row.id).then(() => {
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
    }
  }
}
</script>
