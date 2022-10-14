<template>
  <div class="app-container" >
    <h1>主页</h1>
    <div class="filter-container">
      <span style=""><b>宠物code:</b></span>
      <el-select v-model="listQuery.petCode" clearable placeholder="请选择" style="width: 200px;margin-right:50px;">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span><b>宠物详细类型:</b></span><el-input v-model="listQuery.petStyle" placehpetTypeer="宠物详细类型" style="width: 200px;margin-right:50px;" class="filter-item"  clearable />
      <span><b>宠物种类:</b></span><el-input v-model="listQuery.petType" placehpetTypeer="宠物种类" style="width: 200px;margin-right:50px;" class="filter-item"  clearable/>
      <span><b>宠物简称:</b></span><el-input v-model="listQuery.name" placehpetTypeer="宠物简称" style="width: 200px;margin-right:50px;" class="filter-item"  clearable/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
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
      <el-table-column label="宠物代号" prop="petCode" sortable="custom" align="center"  :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.petCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="宠物图片" prop="imgSearch" sortable="custom" align="center"  :class-name="getSortClass('id')" >
        <template slot-scope="{row}">
          <div style="width:80px;height:80px;margin:auto;" align="center">
            <img :id=row.id :src='imgformatter(row)' style="width:100%;height:100%margin:auto;" align="center"/>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="宠物详细类型" prop="petStyle" sortable="custom" align="center"  :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.petStyle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="宠物种类" prop="petType" sortable="custom" align="center"  :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.petType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="宠物简称" prop="name" sortable="custom" align="center"  :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="宠物数量" prop="petNumber" sortable="custom" align="center"  :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.petNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handlegointo(row,$index)">
            查看宠物详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="this.total>0" :total="this.total" :page.sync="this.listQuery.page" :limit.sync="this.listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import { fetchpetStorageList, downLoad,fetchDicList } from '@/api/pet'
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
        petCode: '',
        password: '',
        petStyle: '',
        petType: '',
        name: '',
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
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
      fetchpetStorageList(params).then(response => {
        
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
    
     imgformatter(row){
          downLoad(row.imgSearch).then(response => {
          var fileSrc="";
           fileSrc =   response.data.fileSrc;
           //debugger
          //var htmls='<img src="'+fileSrc+'" style="float:right;">';
          document.getElementById(row.id).src=fileSrc;
          
          return fileSrc;
      })
      
    },
    
    handlegointo(row,index) {
      this.$router.push({name:'detail',params:row});
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
