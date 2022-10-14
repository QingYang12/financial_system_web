<template>
  <div class="app-container">
    <h1>财务分析图</h1>
    <div class="filter-container">
      <el-row>
          <span style=""><b>账户总资产:</b></span>
          <el-input v-model="allmoney" placeholder="账户余额" style="width: 140px;margin-right:50px;" class="filter-item"   disabled/>
      </el-row>
      <el-row>
          <span style=""><b>年:<font color="red">(默认值本年起至今天)</font></b></span>
          <el-date-picker
            v-model="listQuery.happenTimey"
            type="year"
            placeholder="选择年"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleYFilter">
            年分析
          </el-button>
      </el-row>
      <div id="mychart_year" class="echart"  :style="myChartStyle"></div>
      <el-row>
          <span style=""><b>月:<font color="red">(默认值本月起至今天)</font></b></span>
           <el-date-picker
            v-model="listQuery.happenTimem"
            type="month"
            placeholder="选择月"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleMFilter">
            月分析
          </el-button>
      </el-row>
      <div id="mychart_months" class="echart"  :style="myChartStyle"></div>
      <el-row>
          <span style=""><b>日:<font color="red">(默认值今天0点起至今天24点)</font></b></span>
          <el-date-picker
            v-model="listQuery.happenTimet"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleTFilter">
            日分析
          </el-button>
      </el-row>
      <div id="mychart_day" class="echart"  :style="myChartStyle"></div>
      <el-row>
          <span style=""><b>自定义:<font color="red">(默认值今天0点起至今天24点)</font></b></span>
          <el-date-picker
            v-model="listQuery.happenTimes"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleAFilter">
            自定义分析
          </el-button>
      </el-row>
      <div id="mychart" class="echart"  :style="myChartStyle"></div>
    </div>

  </div>
</template>

<script>
import { fetchUserList, fetchUser,deleteUser, createUser, updateUser,fetchAList ,fetchYList,fetchMList,fetchTList} from '@/api/financial'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import * as echarts from "echarts";
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
      usernameDisable:0,
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      header:[
        {}
      ],
      listQuery: {
        happenTimey: undefined ,
        happenTimem: undefined ,
        happenTimet: undefined ,
        happenTimes: [],
        happenTimesStart: '',
        happenTimesEnd: ''
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



      downloadLoading: false,
      allmoney:0,
      yearvalue:'',
      monthvalue:'',
      datevalue:'',
      happenTimes:[],
      myChart: {},
      mychart_year: {},
      mychart_months: {},
      mychart_day: {},
      yearpieData: [
        {
          value: 0,
          name: "债务"
        },
        {
          value: 0,
          name: "理财"
        },
        {
          value: 0,
          name: "收入"
        },
        {
          value: 0,
          name: "支出"
        }
      ],
      monthpieData: [
        {
          value: 0,
          name: "债务"
        },
        {
          value: 0,
          name: "理财"
        },
        {
          value: 0,
          name: "收入"
        },
        {
          value: 0,
          name: "支出"
        }
      ],
      daypieData: [
        {
          value: 0,
          name: "债务"
        },
        {
          value: 0,
          name: "理财"
        },
        {
          value: 0,
          name: "收入"
        },
        {
          value: 0,
          name: "支出"
        }
      ],
      mypieData: [
        {
          value: 0,
          name: "债务"
        },
        {
          value: 0,
          name: "理财"
        },
        {
          value: 0,
          name: "收入"
        },
        {
          value: 0,
          name: "支出"
        }
      ],
      // 饼图
       yearoption :{
        legend: {
          // 图例
          data: this.yearpieName,
          right: "10%",
          top: "30%",
          orient: "vertical"
        },
        title: {
          // 设置饼图标题，位置设为顶部居中
          text: "年    收支/理财/债务   占比图示",
          top: "0%",
          left: "center"
        },
        series: [
          {
            type: "pie",
            label: {
              show: true,
              formatter: "{b} : {c} ({d}%)" // b代表名称，c代表对应值，d代表百分比
            },
            radius: "70%", //饼图半径
            data: this.yearpieData
          }
        ]
      },
       monthoption :{
        legend: {
          // 图例
          data: this.monthpieName,
          right: "10%",
          top: "30%",
          orient: "vertical"
        },
        title: {
          // 设置饼图标题，位置设为顶部居中
          text: "月    收支/理财/债务   占比图示",
          top: "0%",
          left: "center"
        },
        series: [
          {
            type: "pie",
            label: {
              show: true,
              formatter: "{b} : {c} ({d}%)" // b代表名称，c代表对应值，d代表百分比
            },
            radius: "70%", //饼图半径
            data: this.monthpieData
          }
        ]
      },
       dayoption :{
        legend: {
          // 图例
          data: this.daypieName,
          right: "10%",
          top: "30%",
          orient: "vertical"
        },
        title: {
          // 设置饼图标题，位置设为顶部居中
          text: "日    收支/理财/债务   占比图示",
          top: "0%",
          left: "center"
        },
        series: [
          {
            type: "pie",
            label: {
              show: true,
              formatter: "{b} : {c} ({d}%)" // b代表名称，c代表对应值，d代表百分比
            },
            radius: "70%", //饼图半径
            data: this.daypieData
          }
        ]
      },
       myoption : {
        legend: {
          // 图例
          data: this.mypieName,
          right: "10%",
          top: "30%",
          orient: "vertical"
        },
        title: {
          // 设置饼图标题，位置设为顶部居中
          text: "自定义    收支/理财/债务   占比图示",
          top: "0%",
          left: "center"
        },
        series: [
          {
            type: "pie",
            label: {
              show: true,
              formatter: "{b} : {c} ({d}%)" // b代表名称，c代表对应值，d代表百分比
            },
            radius: "70%", //饼图半径
            data: this.mypieData
          }
        ]
      },
      yearpieName: [],
      monthpieName: [],
      daypieName: [],
      mypieName: [],
      myChartStyle: { float: "left", width: "100%", height: "400px" } //图表样式
    }
  },
  created() {
    this.getAList()
    this.getYList()
    this.getMList()
    this.getTList()
  },
  mounted(){
    this.initDate(); //数据初始化
    this.initEcharts();
  },
  methods: {
    initDate() {
      for (let i = 0; i < this.yearpieData.length; i++) {
        // this.xData[i] = i;
        // this.yData =this.xData[i]*this.xData[i];
        this.yearpieName[i] = this.yearpieData[i].name;
      }
      for (let i = 0; i < this.monthpieData.length; i++) {
        // this.xData[i] = i;
        // this.yData =this.xData[i]*this.xData[i];
        this.monthpieName[i] = this.monthpieData[i].name;
      }
      for (let i = 0; i < this.daypieData.length; i++) {
        // this.xData[i] = i;
        // this.yData =this.xData[i]*this.xData[i];
        this.daypieName[i] = this.daypieData[i].name;
      }
      for (let i = 0; i < this.mypieData.length; i++) {
        // this.xData[i] = i;
        // this.yData =this.xData[i]*this.xData[i];
        this.mypieName[i] = this.mypieData[i].name;
      }
    },
    initEcharts() {
      
      this.yearoption.series[0].data=this.yearpieData;
      this.mychart_year = echarts.init(document.getElementById("mychart_year"));
      this.mychart_year.setOption(this.yearoption);

      this.monthoption.series[0].data=this.monthpieData;
      this.mychart_months = echarts.init(document.getElementById("mychart_months"));
      this.mychart_months.setOption(this.monthoption);

      this.dayoption.series[0].data=this.daypieData;
      this.mychart_day = echarts.init(document.getElementById("mychart_day"));
      this.mychart_day.setOption(this.dayoption);

      this.myoption.series[0].data=this.mypieData;
      this.mychart = echarts.init(document.getElementById("mychart"));
      this.mychart.setOption(this.myoption);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        this.mychart_year.resize();
        this.mychart_months.resize();
        this.mychart_day.resize();
        this.mychart.resize();
      });
    },
    getAList() {
      this.listLoading = true
      var params={};
      if(this.listQuery.happenTimes.length>1){
        this.listQuery.happenTimesStart=this.listQuery.happenTimes[0];
        this.listQuery.happenTimesEnd=this.listQuery.happenTimes[1];
      }
      var self=this;
      params.param=this.listQuery;
      fetchAList(params).then(response => {
        var data=JSON.stringify(response.pageDate.data);
        self.mypieData =JSON.parse(data );
        self.myoption.series[0].data=self.mypieData;
        self.myChart = echarts.init(document.getElementById("mychart"));
        self.myChart.setOption(self.myoption);
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleAFilter() {
      this.listQuery.page = 1
      this.getAList()
    },

    getYList() {
      this.listLoading = true
      var params={};
      var self=this;
      params.param=this.listQuery;
      fetchYList(params).then(response => {
        var data=JSON.stringify(response.pageDate.data);
        self.yearpieData =JSON.parse(data );
        self.yearoption.series[0].data=self.yearpieData;
        self.mychart_year = echarts.init(document.getElementById("mychart_year"));
        self.mychart_year.setOption(self.yearoption);
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleYFilter() {
      this.listQuery.page = 1
      this.getYList()
    },

    getMList() {
      this.listLoading = true
      var params={};
      var self=this;
      params.param=this.listQuery;
      fetchMList(params).then(response => {
        var data=JSON.stringify(response.pageDate.data);
        self.monthpieData =JSON.parse(data );
        self.monthoption.series[0].data=self.mypieData;
        self.mychart_months = echarts.init(document.getElementById("mychart_months"));
        self.mychart_months.setOption(self.monthoption);
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleMFilter() {
      this.listQuery.page = 1
      this.getMList()
    },

    getTList() {
      this.listLoading = true
      var params={};
      var self=this;
      params.param=this.listQuery;
      fetchTList(params).then(response => {
        var data=JSON.stringify(response.pageDate.data);
        self.daypieData =JSON.parse(data );
        self.dayoption.series[0].data=self.daypieData;
        self.mychart_day = echarts.init(document.getElementById("mychart_day"));
        self.mychart_day.setOption(self.dayoption);
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleTFilter() {
      this.listQuery.page = 1
      this.getTList()
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
      this.handleAFilter()
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
          createUser(this.temp).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
            this.getAList()
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
          updateUser(this.temp).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
            this.getAList()
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
            this.getAList()
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
