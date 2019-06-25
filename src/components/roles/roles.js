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
    },
    //删除权限
    delRights(rid, rightid, aaa) {


      this.$http({
        method: 'delete',
        url: `roles/${rid}/rights/${rightid}`
      }).then(res => {
        let {
          meta,
          data
        } = res.data
        if (meta.status == 200) {
          this.$message({
            message: meta.msg,
            type: 'success'
          })
          aaa.row.children = data
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
