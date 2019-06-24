//引入面包屑导航
import Bread from '../layout/bread.vue'

export default {
  data() {
    return {
      tableData: []
    }
  },
  components: {
    Bread
  },
  methods: {
    getdata() {
      this.$http({
        method: 'get',
        url: 'roles'
      }).then(res => {
        let {
          meta,
          data
        } = res.data
        if (meta.status == 200) {
          this.tableData = data
        } else {
          this.$message.error(meta.msg)
        }
      })
    }
  },
  mounted() {
    this.getdata()
  },
}
