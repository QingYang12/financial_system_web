<template>
  <div class="app-container">
    <h1>宠物字典管理</h1>
    <div class="filter-container">
      <span><b>业务类型:</b></span><el-input  v-model="listQuery.businessType"  style="width: 200px;margin-right:50px;" class="filter-item"  disabled />
      <span><b>宠物代称:</b></span><el-input  v-model="listQuery.name" placeholder="宠物代称" style="width: 200px;margin-right:50px;" class="filter-item"  clearable />
      <span><b>宠物代号:</b></span><el-input v-model="listQuery.code" placeholder="宠物代号" style="width: 200px;margin-right:50px;" class="filter-item"  clearable />
      <span><b>宠物详细类型:</b></span><el-input v-model="listQuery.petStyle" placeholder="宠物详细类型" style="width: 200px;margin-right:50px;" class="filter-item"  clearable/>
      <span><b>宠物种类:</b></span><el-input v-model="listQuery.petType" placeholder="宠物种类" style="width: 200px;margin-right:50px;" class="filter-item"  clearable/>
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
      <el-table-column label="业务类型" prop="businessType" sortable="custom" align="center"  :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.businessType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="宠物代称" prop="name" sortable="custom" align="center"  :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="宠物代号" prop="code" sortable="custom" align="center"  :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.code }}</span>
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
      <el-table-column label="描述" prop="petDetails" sortable="custom" align="center"  :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.petDetails }}</span>
        </template>
      </el-table-column>
      <el-table-column label="简要描述" prop="remark" sortable="custom" align="center"  :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="搜索页主图片jpg" prop="imgSearch" sortable="custom" align="center"  :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.imgSearch }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片1jpg" prop="imgone" sortable="custom" align="center"  :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.imgone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片2jpg" prop="imgtwo" sortable="custom" align="center"  :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.imgtwo }}</span>
        </template>
      </el-table-column>
           <el-table-column label="图片3jpg" prop="imgthree" sortable="custom" align="center"  :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.imgthree }}</span>
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
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item label="ID" prop="id">
          <el-input v-model="temp.id"  disabled placeholder="自动生成"/>
        </el-form-item>
        <el-form-item label="业务类型" prop="businessType">
          <el-input v-model="temp.businessType" disabled/>
        </el-form-item>
        <el-form-item label="宠物代称" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="宠物代号" prop="code">
          <el-input v-model="temp.code" />
        </el-form-item>
        <el-form-item label="宠物详细类型" prop="petStyle">
          <el-input v-model="temp.petStyle" />
        </el-form-item>
        <el-form-item label="宠物种类" prop="petType">
          <el-input v-model="temp.petType" />
        </el-form-item>
        <el-form-item label="简要描述" prop="remark" >
          <el-input v-model="temp.remark" type="textarea" placeholder="请输入简要描述 小于100字" maxlength="100"/>
        </el-form-item>
        <el-form-item label="描述" prop="petDetails">
          <el-input v-model="temp.petDetails"  type="textarea"   placeholder="请输入描述" maxlength="1000"/>
        </el-form-item>
        <el-form-item label="搜索页主图片jpg" prop="imgSearch" >
                <el-input v-model="temp.imgSearch" disabled />
        </el-form-item>
        <el-upload  action="/upLoadFile/upLoad" list-type="picture-card" :auto-upload="true" :on-success="successFun0" >
            <i slot="default" class="el-icon-plus"></i> <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" >
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)" > <i class="el-icon-zoom-in"></i> </span>
                <span  v-if="!disabled" class="el-upload-list__item-delete"  @click="handleFileDownload(file)" > <i class="el-icon-download"></i> </span>
                <span  v-if="!disabled"  class="el-upload-list__item-delete"  @click="handleFileRemove(file)" > <i class="el-icon-delete"></i> </span>
              </span>
            </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" >
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <el-form-item label="图片1jpg" prop="imgone" >
          <el-input v-model="temp.imgone" disabled />
        </el-form-item>
        <el-upload  action="/upLoadFile/upLoad" list-type="picture-card" :auto-upload="true" :on-success="successFun1" >
            <i slot="default" class="el-icon-plus"></i> <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" >
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)" > <i class="el-icon-zoom-in"></i> </span>
                <span  v-if="!disabled" class="el-upload-list__item-delete"  @click="handleFileDownload(file)" > <i class="el-icon-download"></i> </span>
                <span  v-if="!disabled"  class="el-upload-list__item-delete"  @click="handleFileRemove(file)" > <i class="el-icon-delete"></i> </span>
              </span>
            </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <el-form-item label="图片2jpg" prop="imgtwo">
          <el-input v-model="temp.imgtwo" disabled />
        </el-form-item>
        <el-upload  action="/upLoadFile/upLoad" list-type="picture-card" :auto-upload="true" :on-success="successFun2" >
            <i slot="default" class="el-icon-plus"></i> <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" >
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)" > <i class="el-icon-zoom-in"></i> </span>
                <span  v-if="!disabled" class="el-upload-list__item-delete"  @click="handleFileDownload(file)" > <i class="el-icon-download"></i> </span>
                <span  v-if="!disabled"  class="el-upload-list__item-delete"  @click="handleFileRemove(file)" > <i class="el-icon-delete"></i> </span>
              </span>
            </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <el-form-item label="图片3jpg" prop="imgthree">
          <el-input v-model="temp.imgthree" disabled />
        </el-form-item>
        <el-upload  action="/upLoadFile/upLoad" list-type="picture-card" :auto-upload="true" :on-success="successFun3" >
            <i slot="default" class="el-icon-plus"></i> <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" >
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)" > <i class="el-icon-zoom-in"></i> </span>
                <span  v-if="!disabled" class="el-upload-list__item-delete"  @click="handleFileDownload(file)" > <i class="el-icon-download"></i> </span>
                <span  v-if="!disabled"  class="el-upload-list__item-delete"  @click="handleFileRemove(file)" > <i class="el-icon-delete"></i> </span>
              </span>
            </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
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
import { fetchDicList, deleteDic, createDic, updateDic } from '@/api/pet'
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
      listQuery: {
        page: 1,
        limit: 20,
        businessType: 'pet',
        code: '',
        name: '',
        petStyle: '',
        petType: '',
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        businessType: 'pet',
        code: undefined,
        name: undefined,
        petStyle: undefined,
        petType: undefined,
        petDetails: undefined,
        remark: undefined,
        imgSearch: undefined,
        imgone: undefined,
        imgtwo: undefined,
        imgthree: undefined,
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
      //文件用
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false
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
      params.param=this.listQuery;
      fetchDicList(params).then(response => {
        
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
        businessType: 'pet',
        code: undefined,
        name: undefined,
        petStyle: undefined,
        petType: undefined,
        petDetails: undefined,
        remark: undefined,
        imgSearch: undefined,
        imgone: undefined,
        imgtwo: undefined,
        imgthree: undefined,
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
          createDic(this.temp).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
            this.getList()
            this.$router.go(0);
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
          updateDic(this.temp).then(() => {
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
      deleteDic(row.id).then(() => {
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

    //文件用
    handleFileRemove(file) {
        console.log(file);
      },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleFileDownload(file) {
      console.log(file);
    },
    successFun0(response, file, fileList){
     this.temp.imgSearch=response.data.id;
    }
    ,
    successFun1(response, file, fileList){
     this.temp.imgone=response.data.id;
    }
    ,
    successFun2(response, file, fileList){
     this.temp.imgtwo=response.data.id;
    }
    ,
    successFun3(response, file, fileList){
     this.temp.imgthree=response.data.id;
    }

  }
}
</script>
